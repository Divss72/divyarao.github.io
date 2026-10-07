import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { db } from './db.js';
import { authService } from './auth.js';
import { requireAdminAuth, rateLimitLogin, sanitizeString, AuthenticatedRequest } from './middleware.js';
import { mongoService } from './mongodb.js';

export const apiApp = express();

// Initialize MongoDB connection asynchronously
mongoService.connect().catch((err) => {
  console.warn('[MongoDB] Init connection note:', err.message);
});

// Middleware setup
apiApp.use(express.json({ limit: '10mb' }));
apiApp.use(cookieParser());
apiApp.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Prevent caching for API routes
apiApp.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// ==========================================
// 1. AUTHENTICATION ENDPOINTS
// ==========================================

// Login
apiApp.post('/auth/login', rateLimitLogin, (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Username/Email and password are required.' });
  }

  const result = authService.login(identifier, password, ip);
  if (!result.success || !result.token) {
    return res.status(401).json({ error: result.error || 'Invalid credentials.' });
  }

  // Set secure HttpOnly cookie
  res.cookie('dr_admin_session', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.json({
    success: true,
    message: 'Welcome to Private Studio.',
    token: result.token, // Return token as backup for clients without cookies
  });
});

// Logout
apiApp.post('/auth/logout', (req: Request, res: Response) => {
  const token = req.cookies?.dr_admin_session ||
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined);

  authService.logout(token);
  res.clearCookie('dr_admin_session', { path: '/' });
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// Get current session status
apiApp.get('/auth/me', (req: Request, res: Response) => {
  const token = req.cookies?.dr_admin_session ||
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined);

  if (!token) {
    return res.json({ authenticated: false });
  }

  const validation = authService.validateSession(token);
  if (!validation.valid) {
    res.clearCookie('dr_admin_session', { path: '/' });
    return res.json({ authenticated: false });
  }

  const sessionInfo = authService.getSessionInfo(token);
  return res.json({
    authenticated: true,
    email: validation.email,
    session: sessionInfo,
  });
});

// Change Admin Password
apiApp.post('/auth/change-password', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  const result = authService.changePassword(currentPassword, newPassword);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  // Clear cookie since sessions were wiped
  res.clearCookie('dr_admin_session', { path: '/' });
  return res.json({
    success: true,
    message: 'Password changed successfully. Please log in again with your new credentials.',
  });
});

// ==========================================
// 2. PUBLIC ENDPOINTS (PORTFOLIO PAGES)
// ==========================================

// Get all published portfolio data
apiApp.get('/public/data', (_req: Request, res: Response) => {
  const data = db.get();

  const publicData = {
    skills: data.skills.filter((s) => s.published).sort((a, b) => a.displayOrder - b.displayOrder),
    projects: data.projects.filter((p) => p.published).sort((a, b) => a.displayOrder - b.displayOrder),
    experience: data.experience.filter((e) => e.published).sort((a, b) => a.displayOrder - b.displayOrder),
    research: data.research.filter((r) => r.published).sort((a, b) => a.displayOrder - b.displayOrder),
    books: data.books.filter((b) => b.published).sort((a, b) => a.displayOrder - b.displayOrder),
    hobbies: data.hobbies.filter((h) => h.published).sort((a, b) => a.displayOrder - b.displayOrder),
    blogs: data.blogs
      .filter((b: any) => b.published !== false && b.draft !== true)
      .map((b: any) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        readTime: b.readTime,
        publishDate: b.publishDate || b.publishedAt,
        publishedAt: b.publishedAt || b.publishDate,
        tags: b.tags,
        featured: b.featured ?? false,
        isDraft: false,
        commentsCount: data.comments.filter((c: any) => c.blogSlug === b.slug && c.status === 'approved').length,
      })),
    approvedComments: data.comments
      .filter((c: any) => c.status === 'approved')
      .map((c: any) => ({
        id: c.id,
        blogSlug: c.blogSlug,
        author: c.authorName || c.author,
        authorName: c.authorName || c.author,
        content: c.content,
        timestamp: c.timestamp,
      })),
    settings: data.settings,
  };

  return res.json(publicData);
});

// Submit a public comment on a blog post
apiApp.post('/public/comments', (req: Request, res: Response) => {
  const { blogSlug, author, email, content } = req.body;

  if (!blogSlug || !author || !content) {
    return res.status(400).json({ error: 'Blog slug, author name, and comment text are required.' });
  }

  const cleanAuthor = sanitizeString(author).slice(0, 80);
  const cleanEmail = email ? sanitizeString(email).slice(0, 100) : undefined;
  const cleanContent = sanitizeString(content).slice(0, 2000);

  if (!cleanAuthor || !cleanContent) {
    return res.status(400).json({ error: 'Invalid comment content.' });
  }

  const newComment = {
    id: `cm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    blogSlug,
    author: cleanAuthor,
    email: cleanEmail,
    content: cleanContent,
    timestamp: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    status: 'pending' as const, // Automatically pending moderation
  };

  db.update((draft) => {
    draft.comments.unshift(newComment);
  });
  mongoService.saveComment(newComment);

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your comment has been submitted and is awaiting moderation.',
    commentId: newComment.id,
  });
});

// ==========================================
// 3. ADMIN ENDPOINTS (PROTECTED CRUD)
// ==========================================

// --- MONGODB STATUS & SYNC ---
apiApp.get('/admin/mongodb/status', requireAdminAuth, (_req, res) => {
  res.json({
    connected: mongoService.getConnected(),
    collections: [
      'projects',
      'skills',
      'experience',
      'research',
      'books',
      'hobbies',
      'blogs',
      'comments',
      'media',
      'settings',
      'admins',
    ],
  });
});

apiApp.post('/admin/mongodb/sync', requireAdminAuth, async (_req, res) => {
  await mongoService.syncFromMongoToLocal();
  res.json({ success: true, message: 'Synchronized with MongoDB database.' });
});

// --- SKILLS ---
apiApp.get('/admin/skills', requireAdminAuth, (_req, res) => {
  res.json(db.get().skills);
});

apiApp.post('/admin/skills', requireAdminAuth, (req, res) => {
  const skill = req.body;
  if (!skill.name || !skill.category) {
    return res.status(400).json({ error: 'Name and Category are required.' });
  }
  const id = skill.id || `sk-${Date.now()}`;
  const newSkill = { ...skill, id, displayOrder: skill.displayOrder ?? 0, published: skill.published ?? true };

  db.update((draft) => {
    draft.skills.push(newSkill);
  });
  mongoService.saveSkill(newSkill);
  res.status(201).json(newSkill);
});

apiApp.put('/admin/skills/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  let updated = false;
  let updatedItem: any = null;

  db.update((draft) => {
    const idx = draft.skills.findIndex((s) => s.id === id);
    if (idx !== -1) {
      draft.skills[idx] = { ...draft.skills[idx], ...req.body, id };
      updatedItem = draft.skills[idx];
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Skill not found.' });
  mongoService.saveSkill(updatedItem);
  res.json({ success: true });
});

apiApp.delete('/admin/skills/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.skills = draft.skills.filter((s) => s.id !== id);
  });
  mongoService.deleteSkill(id);
  res.json({ success: true });
});

// --- PROJECTS ---
apiApp.get('/admin/projects', requireAdminAuth, (_req, res) => {
  res.json(db.get().projects);
});

apiApp.post('/admin/projects', requireAdminAuth, (req, res) => {
  const proj = req.body;
  if (!proj.title || !proj.slug) {
    return res.status(400).json({ error: 'Title and Slug are required.' });
  }
  const id = proj.id || `proj-${Date.now()}`;
  const newProj = {
    ...proj,
    id,
    displayOrder: proj.displayOrder ?? 0,
    published: proj.published ?? true,
    galleryImages: proj.galleryImages || [],
    techStack: proj.techStack || [],
  };

  db.update((draft) => {
    draft.projects.push(newProj);
  });
  mongoService.saveProject(newProj);
  res.status(201).json(newProj);
});

apiApp.put('/admin/projects/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  let updated = false;
  let updatedItem: any = null;

  db.update((draft) => {
    const idx = draft.projects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      draft.projects[idx] = { ...draft.projects[idx], ...req.body, id };
      updatedItem = draft.projects[idx];
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Project not found.' });
  mongoService.saveProject(updatedItem);
  res.json({ success: true });
});

apiApp.delete('/admin/projects/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.projects = draft.projects.filter((p) => p.id !== id);
  });
  mongoService.deleteProject(id);
  res.json({ success: true });
});

// --- EXPERIENCE ---
apiApp.get('/admin/experience', requireAdminAuth, (_req, res) => {
  res.json(db.get().experience);
});

apiApp.post('/admin/experience', requireAdminAuth, (req, res) => {
  const item = req.body;
  if (!item.role || !item.organization) {
    return res.status(400).json({ error: 'Role and Organization are required.' });
  }
  const id = item.id || `exp-${Date.now()}`;
  const newItem = {
    ...item,
    id,
    displayOrder: item.displayOrder ?? 0,
    published: item.published ?? true,
    highlights: item.highlights || [],
  };

  db.update((draft) => {
    draft.experience.push(newItem);
  });
  mongoService.saveExperience(newItem);
  res.status(201).json(newItem);
});

apiApp.put('/admin/experience/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  let updated = false;
  let updatedItem: any = null;

  db.update((draft) => {
    const idx = draft.experience.findIndex((e) => e.id === id);
    if (idx !== -1) {
      draft.experience[idx] = { ...draft.experience[idx], ...req.body, id };
      updatedItem = draft.experience[idx];
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Experience record not found.' });
  mongoService.saveExperience(updatedItem);
  res.json({ success: true });
});

apiApp.delete('/admin/experience/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.experience = draft.experience.filter((e) => e.id !== id);
  });
  mongoService.deleteExperience(id);
  res.json({ success: true });
});

// --- RESEARCH ---
apiApp.get('/admin/research', requireAdminAuth, (_req, res) => {
  res.json(db.get().research);
});

apiApp.post('/admin/research', requireAdminAuth, (req, res) => {
  const item = req.body;
  if (!item.title) {
    return res.status(400).json({ error: 'Research topic title is required.' });
  }
  const id = item.id || `res-${Date.now()}`;
  const newItem = { ...item, id, displayOrder: item.displayOrder ?? 0, published: item.published ?? true };

  db.update((draft) => {
    draft.research.push(newItem);
  });
  mongoService.saveResearch(newItem);
  res.status(201).json(newItem);
});

apiApp.put('/admin/research/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  let updated = false;
  let updatedItem: any = null;

  db.update((draft) => {
    const idx = draft.research.findIndex((r) => r.id === id);
    if (idx !== -1) {
      draft.research[idx] = { ...draft.research[idx], ...req.body, id };
      updatedItem = draft.research[idx];
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Research note not found.' });
  mongoService.saveResearch(updatedItem);
  res.json({ success: true });
});

apiApp.delete('/admin/research/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.research = draft.research.filter((r) => r.id !== id);
  });
  mongoService.deleteResearch(id);
  res.json({ success: true });
});

// --- BOOKS ---
apiApp.get('/admin/books', requireAdminAuth, (_req, res) => {
  res.json(db.get().books);
});

apiApp.post('/admin/books', requireAdminAuth, (req, res) => {
  const item = req.body;
  if (!item.title || !item.author) {
    return res.status(400).json({ error: 'Book Title and Author are required.' });
  }
  const id = item.id || `book-${Date.now()}`;
  const newItem = { ...item, id, displayOrder: item.displayOrder ?? 0, published: item.published ?? true };

  db.update((draft) => {
    draft.books.push(newItem);
  });
  mongoService.saveBook(newItem);
  res.status(201).json(newItem);
});

apiApp.put('/admin/books/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  let updated = false;
  let updatedItem: any = null;

  db.update((draft) => {
    const idx = draft.books.findIndex((b) => b.id === id);
    if (idx !== -1) {
      draft.books[idx] = { ...draft.books[idx], ...req.body, id };
      updatedItem = draft.books[idx];
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Book record not found.' });
  mongoService.saveBook(updatedItem);
  res.json({ success: true });
});

apiApp.delete('/admin/books/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.books = draft.books.filter((b) => b.id !== id);
  });
  mongoService.deleteBook(id);
  res.json({ success: true });
});

// --- HOBBIES ---
apiApp.get('/admin/hobbies', requireAdminAuth, (_req, res) => {
  res.json(db.get().hobbies);
});

apiApp.post('/admin/hobbies', requireAdminAuth, (req, res) => {
  const item = req.body;
  if (!item.title) {
    return res.status(400).json({ error: 'Hobby Title is required.' });
  }
  const id = item.id || `hobby-${Date.now()}`;
  const newItem = { ...item, id, displayOrder: item.displayOrder ?? 0, published: item.published ?? true };

  db.update((draft) => {
    draft.hobbies.push(newItem);
  });
  mongoService.saveHobby(newItem);
  res.status(201).json(newItem);
});

apiApp.put('/admin/hobbies/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  let updated = false;
  let updatedItem: any = null;

  db.update((draft) => {
    const idx = draft.hobbies.findIndex((h) => h.id === id);
    if (idx !== -1) {
      draft.hobbies[idx] = { ...draft.hobbies[idx], ...req.body, id };
      updatedItem = draft.hobbies[idx];
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Hobby not found.' });
  mongoService.saveHobby(updatedItem);
  res.json({ success: true });
});

apiApp.delete('/admin/hobbies/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.hobbies = draft.hobbies.filter((h) => h.id !== id);
  });
  mongoService.deleteHobby(id);
  res.json({ success: true });
});

// --- BLOGS ---
apiApp.get('/admin/blogs', requireAdminAuth, (_req, res) => {
  res.json(db.get().blogs);
});

apiApp.post('/admin/blogs', requireAdminAuth, (req, res) => {
  const blog = req.body;
  if (!blog.title || !blog.slug) {
    return res.status(400).json({ error: 'Blog Title and Slug are required.' });
  }
  const id = blog.id || `blog-${Date.now()}`;
  const newBlog = {
    ...blog,
    id,
    published: blog.published ?? false,
    featured: blog.featured ?? false,
    tags: blog.tags || [],
    publishedAt: blog.publishedAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };

  db.update((draft) => {
    draft.blogs.unshift(newBlog);
  });
  mongoService.saveBlog(newBlog);
  res.status(201).json(newBlog);
});

apiApp.put('/admin/blogs/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  let updated = false;
  let updatedItem: any = null;

  db.update((draft) => {
    const idx = draft.blogs.findIndex((b) => b.id === id);
    if (idx !== -1) {
      draft.blogs[idx] = { ...draft.blogs[idx], ...req.body, id };
      updatedItem = draft.blogs[idx];
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Blog post not found.' });
  mongoService.saveBlog(updatedItem);
  res.json({ success: true });
});

apiApp.delete('/admin/blogs/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.blogs = draft.blogs.filter((b) => b.id !== id);
  });
  mongoService.deleteBlog(id);
  res.json({ success: true });
});

// --- COMMENTS MODERATION ---
apiApp.get('/admin/comments', requireAdminAuth, (_req, res) => {
  res.json(db.get().comments);
});

apiApp.put('/admin/comments/:id/status', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'spam', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  let updated = false;
  db.update((draft) => {
    const comment = draft.comments.find((c) => c.id === id);
    if (comment) {
      comment.status = status;
      updated = true;
    }
  });

  if (!updated) return res.status(404).json({ error: 'Comment not found.' });
  mongoService.updateCommentStatus(id, status);
  res.json({ success: true });
});

apiApp.delete('/admin/comments/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.comments = draft.comments.filter((c) => c.id !== id);
  });
  mongoService.deleteComment(id);
  res.json({ success: true });
});

// --- MEDIA LIBRARY ---
apiApp.get('/admin/media', requireAdminAuth, (_req, res) => {
  res.json(db.get().media);
});

apiApp.post('/admin/media', requireAdminAuth, (req, res) => {
  const item = req.body;
  if (!item.title || !item.url) {
    return res.status(400).json({ error: 'Media Title and URL/Filename are required.' });
  }
  const id = item.id || `media-${Date.now()}`;
  const newItem = {
    ...item,
    id,
    uploadedAt: item.uploadedAt || new Date().toISOString().slice(0, 10),
  };

  db.update((draft) => {
    draft.media.push(newItem);
  });
  mongoService.saveMedia(newItem);
  res.status(201).json(newItem);
});

apiApp.delete('/admin/media/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  db.update((draft) => {
    draft.media = draft.media.filter((m) => m.id !== id);
  });
  mongoService.deleteMedia(id);
  res.json({ success: true });
});

// --- SETTINGS ---
apiApp.get('/admin/settings', requireAdminAuth, (_req, res) => {
  res.json(db.get().settings);
});

apiApp.put('/admin/settings', requireAdminAuth, (req, res) => {
  const { currently, siteMetadata, socialLinks } = req.body;
  db.update((draft) => {
    if (currently) draft.settings.currently = { ...draft.settings.currently, ...currently };
    if (siteMetadata) draft.settings.siteMetadata = { ...draft.settings.siteMetadata, ...siteMetadata };
    if (socialLinks) draft.settings.socialLinks = { ...draft.settings.socialLinks, ...socialLinks };
  });
  mongoService.saveSettings(db.get().settings);
  res.json({ success: true, settings: db.get().settings });
});

// --- BACKUP & RESTORE ---
apiApp.get('/admin/backup/export', requireAdminAuth, (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=portfolio-backup-${Date.now()}.json`);
  res.send(JSON.stringify(db.get(), null, 2));
});

apiApp.post('/admin/backup/restore', requireAdminAuth, (req, res) => {
  const incoming = req.body;
  if (!incoming || !incoming.settings || !Array.isArray(incoming.projects)) {
    return res.status(400).json({ error: 'Invalid backup structure.' });
  }

  db.update((draft) => {
    Object.assign(draft, incoming);
  });

  res.json({ success: true, message: 'Database restored successfully.' });
});
