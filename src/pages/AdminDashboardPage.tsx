import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BlogEditor } from '../components/admin/BlogEditor';
import { portfolioStore } from '../data/store';
import {
  Layers,
  FolderGit2,
  Briefcase,
  FlaskConical,
  BookOpen,
  Coffee,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Shield,
  Download,
  Upload,
  RefreshCw,
  Key,
  AlertTriangle,
  Eye,
  Check,
  X,
  Star,
  Copy,
  Tag,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onLogout: () => void;
  adminEmail?: string;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout, adminEmail }) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'skills' | 'projects' | 'experience' | 'research' | 'books' | 'hobbies' | 'blogs' | 'comments' | 'media' | 'settings'
  >('overview');

  // Global loading & feedback states
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data collections from server DB
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [research, setResearch] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({ currently: {}, siteMetadata: {}, socialLinks: {} });

  // Blog editing state
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);

  // Change Password Modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Set noindex, nofollow meta tag
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      document.head.appendChild(metaTag);
      created = true;
    }
    metaTag.content = 'noindex, nofollow';

    return () => {
      if (created && metaTag && metaTag.parentNode) {
        metaTag.parentNode.removeChild(metaTag);
      }
    };
  }, []);

  // Show transient toast notification
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setActionMessage({ text, type });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Fetch all collections
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        skillsData,
        projectsData,
        experienceData,
        researchData,
        booksData,
        hobbiesData,
        blogsData,
        commentsData,
        mediaData,
        settingsData,
      ] = await Promise.all([
        api.admin.skills.getAll(),
        api.admin.projects.getAll(),
        api.admin.experience.getAll(),
        api.admin.research.getAll(),
        api.admin.books.getAll(),
        api.admin.hobbies.getAll(),
        api.admin.blogs.getAll(),
        api.admin.comments.getAll(),
        api.admin.media.getAll(),
        api.admin.settings.get(),
      ]);

      setSkills(skillsData);
      setProjects(projectsData);
      setExperience(experienceData);
      setResearch(researchData);
      setBooks(booksData);
      setHobbies(hobbiesData);
      setBlogs(blogsData);
      setComments(commentsData);
      setMedia(mediaData);
      setSettings(settingsData);
    } catch (err: any) {
      showToast(err.message || 'Failed to load studio data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (e) {
      console.warn('Logout request completed with error', e);
    }
    onLogout();
  };

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    try {
      const res = await api.auth.changePassword(currentPassword, newPassword);
      if (res.success) {
        showToast('Password changed successfully. Please sign in again.');
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => onLogout(), 1500);
      }
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password.');
    }
  };

  // --- BLOG HANDLERS ---
  const handleSaveBlog = async () => {
    setIsEditingBlog(false);
    setEditingBlog(null);
    await loadAllData();
    showToast('Essay saved successfully.');
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.admin.blogs.delete(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      showToast('Article deleted.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- COMMENT HANDLERS ---
  const handleCommentStatus = async (id: string, status: 'approved' | 'rejected' | 'spam' | 'pending') => {
    try {
      await api.admin.comments.setStatus(id, status);
      setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      showToast(`Comment marked as ${status}.`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!window.confirm('Delete this comment permanently?')) return;
    try {
      await api.admin.comments.delete(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      showToast('Comment deleted.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- SKILL HANDLERS ---
  const [newSkillModal, setNewSkillModal] = useState(false);
  const [skillForm, setSkillForm] = useState({ name: '', category: 'AI / ML', familiarity: 'Proficient', description: '', technologies: '' });

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.admin.skills.create({
        name: skillForm.name,
        category: skillForm.category,
        familiarity: skillForm.familiarity,
        description: skillForm.description,
        technologies: skillForm.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        displayOrder: skills.length + 1,
        published: true,
      });
      setSkills((prev) => [...prev, created]);
      setNewSkillModal(false);
      setSkillForm({ name: '', category: 'AI / ML', familiarity: 'Proficient', description: '', technologies: '' });
      showToast('Skill added.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.admin.skills.delete(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showToast('Skill removed.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- PROJECT HANDLERS ---
  const [newProjModal, setNewProjModal] = useState(false);
  const [projForm, setProjForm] = useState({
    title: '',
    slug: '',
    subtitle: '',
    category: 'Full-Stack Development',
    type: 'Web Application',
    status: 'ONLINE' as const,
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    image: '',
    description: '',
    problem: '',
    solution: '',
    myRole: '',
    featured: true,
  });

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.admin.projects.create({
        ...projForm,
        techStack: projForm.techStack.split(',').map((t) => t.trim()).filter(Boolean),
        galleryImages: [],
        displayOrder: projects.length + 1,
        published: true,
        date: new Date().getFullYear().toString(),
      });
      setProjects((prev) => [...prev, created]);
      setNewProjModal(false);
      showToast('Project added.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Delete project "${title}"?`)) return;
    try {
      await api.admin.projects.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Project deleted.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- SETTINGS HANDLERS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.admin.settings.update(settings);
      showToast('Studio settings updated successfully.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- MONGODB STATUS & HANDLERS ---
  const [mongoStatus, setMongoStatus] = useState<{ connected: boolean; collections: string[] } | null>(null);
  const [syncingMongo, setSyncingMongo] = useState(false);

  useEffect(() => {
    api.admin.mongodb
      .getStatus()
      .then(setMongoStatus)
      .catch(() => setMongoStatus({ connected: false, collections: [] }));
  }, []);

  const handleSyncMongo = async () => {
    setSyncingMongo(true);
    try {
      const res = await api.admin.mongodb.sync();
      showToast(res.message || 'Synchronized with MongoDB database.');
      const status = await api.admin.mongodb.getStatus();
      setMongoStatus(status);
      await loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to sync with MongoDB.', 'error');
    } finally {
      setSyncingMongo(false);
    }
  };

  // --- MEDIA HANDLERS ---
  const [newMediaModal, setNewMediaModal] = useState(false);
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState<string>('ALL');
  const [mediaForm, setMediaForm] = useState({ title: '', url: '', category: 'Profile' });
  const [selectedMediaForAssign, setSelectedMediaForAssign] = useState<any | null>(null);
  const [assignTargetType, setAssignTargetType] = useState<'project' | 'book' | 'blog'>('project');
  const [assignTargetId, setAssignTargetId] = useState<string>('');
  const [previewMediaModal, setPreviewMediaModal] = useState<any | null>(null);

  const activePhotoUrl = settings.siteMetadata?.activePhoto || 'me1.jpeg';

  const handleSetActivePortrait = async (photoUrl: string) => {
    try {
      const updatedMetadata = { ...settings.siteMetadata, activePhoto: photoUrl };
      const updatedSettings = { ...settings, siteMetadata: updatedMetadata };
      await api.admin.settings.update(updatedSettings);
      setSettings(updatedSettings);
      portfolioStore.setActivePhoto(photoUrl);
      showToast(`Active portrait updated to "${photoUrl}".`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update active portrait.', 'error');
    }
  };

  const handleCreateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.title || !mediaForm.url) {
      showToast('Title and URL/filename are required.', 'error');
      return;
    }
    try {
      const cleanUrl = mediaForm.url.trim().replace(/^\//, '');
      const created = await api.admin.media.create({
        title: mediaForm.title,
        url: cleanUrl,
        category: mediaForm.category,
      });
      setMedia((prev) => [...prev, created]);
      setNewMediaModal(false);
      setMediaForm({ title: '', url: '', category: 'Profile' });
      showToast('Media asset added to library.');
    } catch (err: any) {
      showToast(err.message || 'Failed to add media asset.', 'error');
    }
  };

  const handleDeleteMedia = async (id: string, title: string) => {
    if (!window.confirm(`Delete media asset "${title}"?`)) return;
    try {
      await api.admin.media.delete(id);
      setMedia((prev) => prev.filter((m) => m.id !== id));
      showToast('Media asset deleted.');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete media asset.', 'error');
    }
  };

  const handleAssignMedia = async () => {
    if (!selectedMediaForAssign || !assignTargetId) {
      showToast('Please select a target to assign this asset to.', 'error');
      return;
    }
    try {
      const mediaUrl = selectedMediaForAssign.url;
      if (assignTargetType === 'project') {
        const proj = projects.find((p) => p.id === assignTargetId);
        if (proj) {
          const updated = { ...proj, image: mediaUrl };
          await api.admin.projects.update(assignTargetId, updated);
          setProjects((prev) => prev.map((p) => (p.id === assignTargetId ? updated : p)));
          showToast(`Assigned image to project "${proj.title}".`);
        }
      } else if (assignTargetType === 'book') {
        const book = books.find((b) => b.id === assignTargetId);
        if (book) {
          const updated = { ...book, coverImage: mediaUrl };
          await api.admin.books.update(assignTargetId, updated);
          setBooks((prev) => prev.map((b) => (b.id === assignTargetId ? updated : b)));
          showToast(`Assigned cover to book "${book.title}".`);
        }
      } else if (assignTargetType === 'blog') {
        const blog = blogs.find((b) => b.id === assignTargetId);
        if (blog) {
          const updated = { ...blog, coverImage: mediaUrl };
          await api.admin.blogs.update(assignTargetId, updated);
          setBlogs((prev) => prev.map((b) => (b.id === assignTargetId ? updated : b)));
          showToast(`Assigned cover to essay "${blog.title}".`);
        }
      }
      setSelectedMediaForAssign(null);
      setAssignTargetId('');
    } catch (err: any) {
      showToast(err.message || 'Failed to assign media.', 'error');
    }
  };

  // Navigation Items
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: Shield, count: null },
    { id: 'blogs', label: 'Essays & CMS', icon: FileText, count: blogs.length },
    {
      id: 'comments',
      label: 'Comments',
      icon: MessageSquare,
      count: comments.filter((c) => c.status === 'pending').length || null,
      highlight: comments.some((c) => c.status === 'pending'),
    },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
    { id: 'skills', label: 'Skills', icon: Layers, count: skills.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: experience.length },
    { id: 'research', label: 'Research Notes', icon: FlaskConical, count: research.length },
    { id: 'books', label: 'Reading List', icon: BookOpen, count: books.length },
    { id: 'hobbies', label: 'Life & Hobbies', icon: Coffee, count: hobbies.length },
    { id: 'media', label: 'Media Library', icon: ImageIcon, count: media.length },
    { id: 'settings', label: 'Settings & DB', icon: Settings, count: null },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto font-mono text-xs text-coffee-espresso space-y-6">
      {/* Toast Banner */}
      {actionMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-warm-lg flex items-center gap-2 animate-fadeIn font-sans text-xs ${
            actionMessage.type === 'success'
              ? 'bg-cream-50 border-emerald-600/40 text-emerald-800'
              : 'bg-cream-50 border-accent-terracotta/40 text-accent-terracotta'
          }`}
        >
          {actionMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-beige/60 border border-beige-dark/60 flex items-center justify-center text-coffee shadow-warm-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-editorial text-xl font-bold text-coffee-espresso font-sans">
                Private Studio
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                LIVE CMS
              </span>
            </div>
            <p className="text-coffee-muted text-[11px] font-sans">
              Signed in as <span className="font-semibold text-coffee">{adminEmail || 'Administrator'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl border border-beige-dark/50 hover:border-coffee text-coffee-muted hover:text-coffee-espresso transition flex items-center gap-1.5 font-sans"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-3 py-1.5 rounded-xl border border-beige-dark/50 hover:border-coffee text-coffee-muted hover:text-coffee-espresso transition flex items-center gap-1.5 font-sans cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Passphrase</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-accent-terracotta/10 border border-accent-terracotta/30 text-accent-terracotta hover:bg-accent-terracotta/20 transition flex items-center gap-1.5 font-sans font-medium cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Studio</span>
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-sm p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-coffee-muted font-bold border-b border-beige/60 mb-2">
            Studio Sections
          </div>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsEditingBlog(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition flex items-center justify-between font-sans text-xs cursor-pointer ${
                  isActive
                    ? 'bg-coffee text-cream-50 font-bold shadow-warm-sm'
                    : 'text-coffee-muted hover:text-coffee-espresso hover:bg-beige/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive
                        ? 'bg-cream-100/20 text-cream-50'
                        : tab.highlight
                        ? 'bg-accent-terracotta text-cream-50 font-bold'
                        : 'bg-beige/60 text-coffee'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="lg:col-span-9 bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-sm p-6 sm:p-8 space-y-6">
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-coffee" />
              <p className="text-coffee-muted font-sans">Connecting to studio database...</p>
            </div>
          ) : (
            <>
              {/* --- TAB: OVERVIEW --- */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="border-b border-beige/60 pb-5">
                    <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                      // STUDIO CONSOLE
                    </span>
                    <h2 className="font-editorial text-3xl font-bold font-sans">Studio Pulse & Overview</h2>
                    <p className="text-coffee-muted font-sans text-xs mt-1">
                      Direct publishing pipeline to your personal portfolio world.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-1">
                      <div className="text-[11px] text-coffee-muted font-sans">Published Essays</div>
                      <div className="text-2xl font-bold font-editorial text-coffee-espresso">
                        {blogs.filter((b) => !b.draft && !b.isDraft).length}
                      </div>
                      <div className="text-[10px] text-coffee-muted">Total: {blogs.length} (with drafts)</div>
                    </div>

                    <div className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-1">
                      <div className="text-[11px] text-coffee-muted font-sans">Pending Comments</div>
                      <div className="text-2xl font-bold font-editorial text-accent-terracotta">
                        {comments.filter((c) => c.status === 'pending').length}
                      </div>
                      <div className="text-[10px] text-coffee-muted">Approved: {comments.filter((c) => c.status === 'approved').length}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-1">
                      <div className="text-[11px] text-coffee-muted font-sans">Live Projects</div>
                      <div className="text-2xl font-bold font-editorial text-coffee-espresso">
                        {projects.filter((p) => p.published).length}
                      </div>
                      <div className="text-[10px] text-coffee-muted">Featured: {projects.filter((p) => p.featured).length}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-1">
                      <div className="text-[11px] text-coffee-muted font-sans">Active Skills</div>
                      <div className="text-2xl font-bold font-editorial text-coffee-espresso">
                        {skills.filter((s) => s.published).length}
                      </div>
                      <div className="text-[10px] text-coffee-muted">Across 5 categories</div>
                    </div>
                  </div>

                  {/* Current Status Preview */}
                  <div className="p-5 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-3 font-sans">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-coffee-espresso">Currently Module (Live on Homepage)</h3>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className="text-[11px] text-coffee hover:underline font-mono"
                      >
                        Edit in Settings →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-cream-50 rounded-lg border border-beige/60">
                        <span className="text-[10px] uppercase text-coffee-muted font-mono block">Reading</span>
                        <div className="font-semibold text-coffee-espresso mt-0.5">{settings.currently?.reading || '—'}</div>
                        <div className="text-[11px] text-coffee-muted">{settings.currently?.readingAuthor}</div>
                      </div>
                      <div className="p-3 bg-cream-50 rounded-lg border border-beige/60">
                        <span className="text-[10px] uppercase text-coffee-muted font-mono block">Exploring</span>
                        <div className="text-coffee-espresso mt-0.5">{settings.currently?.exploring || '—'}</div>
                      </div>
                      <div className="p-3 bg-cream-50 rounded-lg border border-beige/60">
                        <span className="text-[10px] uppercase text-coffee-muted font-mono block">Building</span>
                        <div className="text-coffee-espresso mt-0.5">{settings.currently?.building || '—'}</div>
                      </div>
                      <div className="p-3 bg-cream-50 rounded-lg border border-beige/60">
                        <span className="text-[10px] uppercase text-coffee-muted font-mono block">Availability Badge</span>
                        <div className="text-emerald-800 font-medium mt-0.5">{settings.siteMetadata?.statusBadge || 'Available for SWE Roles'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Shortcuts */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setEditingBlog(null);
                        setIsEditingBlog(true);
                        setActiveTab('blogs');
                      }}
                      className="px-4 py-2 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition flex items-center gap-2 font-sans cursor-pointer shadow-warm-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Write New Essay</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('comments')}
                      className="px-4 py-2 rounded-xl border border-beige-dark/60 hover:border-coffee text-coffee-muted hover:text-coffee-espresso font-sans transition flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Moderate Comments ({comments.filter((c) => c.status === 'pending').length})</span>
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB: BLOGS / ESSAYS --- */}
              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  {isEditingBlog ? (
                    <BlogEditor
                      initialBlog={editingBlog}
                      onSave={handleSaveBlog}
                      onCancel={() => {
                        setIsEditingBlog(false);
                        setEditingBlog(null);
                      }}
                    />
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-beige/60 pb-5">
                        <div>
                          <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                            // ESSAYS & CHRONICLES
                          </span>
                          <h2 className="font-editorial text-3xl font-bold font-sans">Blog Posts ({blogs.length})</h2>
                        </div>
                        <button
                          onClick={() => {
                            setEditingBlog(null);
                            setIsEditingBlog(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition flex items-center gap-2 font-sans cursor-pointer shadow-warm-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>New Essay</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {blogs.length === 0 ? (
                          <div className="py-12 text-center text-coffee-muted font-sans">No essays yet.</div>
                        ) : (
                          blogs.map((b) => {
                            const isDraft = b.draft || b.isDraft;
                            return (
                              <div
                                key={b.id}
                                className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                                        isDraft ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                      }`}
                                    >
                                      {isDraft ? 'DRAFT' : 'PUBLISHED'}
                                    </span>
                                    <span className="text-[10px] text-coffee-muted uppercase tracking-wider">
                                      {b.category}
                                    </span>
                                    <span className="text-[10px] text-coffee-muted">
                                      • {b.publishDate || b.publishedAt}
                                    </span>
                                  </div>
                                  <h3 className="font-bold text-sm text-coffee-espresso font-sans">{b.title}</h3>
                                  <p className="text-coffee-muted text-xs line-clamp-1 font-sans">{b.excerpt}</p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => {
                                      setEditingBlog(b);
                                      setIsEditingBlog(true);
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-beige-dark/60 hover:border-coffee text-coffee-muted hover:text-coffee-espresso transition flex items-center gap-1 font-sans text-xs cursor-pointer"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBlog(b.id, b.title)}
                                    className="p-1.5 rounded-lg text-accent-terracotta hover:bg-accent-terracotta/10 transition cursor-pointer"
                                    title="Delete article"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* --- TAB: COMMENTS MODERATION --- */}
              {activeTab === 'comments' && (
                <div className="space-y-6">
                  <div className="border-b border-beige/60 pb-5">
                    <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                      // VISITOR FEEDBACK
                    </span>
                    <h2 className="font-editorial text-3xl font-bold font-sans">
                      Comments Moderation ({comments.length})
                    </h2>
                    <p className="text-coffee-muted font-sans text-xs mt-1">
                      Approve or reject visitor comments before they appear on your public essays.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <div className="py-12 text-center text-coffee-muted font-sans">No comments submitted yet.</div>
                    ) : (
                      comments.map((c) => {
                        return (
                          <div
                            key={c.id}
                            className="p-5 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-beige/60 pb-3">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-coffee-espresso font-sans text-sm">
                                    {c.authorName || c.author}
                                  </span>
                                  {c.authorEmail && (
                                    <span className="text-coffee-muted text-[11px]">({c.authorEmail})</span>
                                  )}
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                                      c.status === 'approved'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : c.status === 'pending'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {c.status.toUpperCase()}
                                  </span>
                                </div>
                                <div className="text-[10px] text-coffee-muted">
                                  Post: <code className="bg-beige/40 px-1 py-0.5 rounded">{c.blogSlug}</code> • {c.timestamp}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {c.status !== 'approved' && (
                                  <button
                                    onClick={() => handleCommentStatus(c.id, 'approved')}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-700 text-cream-50 hover:bg-emerald-800 transition flex items-center gap-1 font-sans text-xs cursor-pointer font-bold"
                                  >
                                    <Check className="w-3 h-3" />
                                    <span>Approve</span>
                                  </button>
                                )}
                                {c.status !== 'rejected' && (
                                  <button
                                    onClick={() => handleCommentStatus(c.id, 'rejected')}
                                    className="px-2.5 py-1 rounded-lg border border-beige-dark/60 text-coffee-muted hover:text-coffee-espresso transition flex items-center gap-1 font-sans text-xs cursor-pointer"
                                  >
                                    <X className="w-3 h-3" />
                                    <span>Reject</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteComment(c.id)}
                                  className="p-1.5 rounded-lg text-accent-terracotta hover:bg-accent-terracotta/10 transition cursor-pointer"
                                  title="Delete comment"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <p className="text-coffee-espresso font-sans text-xs whitespace-pre-wrap leading-relaxed">
                              {c.content}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* --- TAB: SKILLS --- */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-beige/60 pb-5">
                    <div>
                      <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                        // TECHNICAL COMPETENCIES
                      </span>
                      <h2 className="font-editorial text-3xl font-bold font-sans">Skills Inventory ({skills.length})</h2>
                    </div>
                    <button
                      onClick={() => setNewSkillModal(true)}
                      className="px-4 py-2 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition flex items-center gap-2 font-sans cursor-pointer shadow-warm-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  {newSkillModal && (
                    <form onSubmit={handleCreateSkill} className="p-5 rounded-xl bg-cream-100 border border-coffee/40 space-y-4 animate-fadeIn">
                      <h3 className="font-bold text-sm font-sans text-coffee-espresso">Add New Skill Module</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Skill Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Agentic AI & LLMs"
                            value={skillForm.name}
                            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Category</label>
                          <select
                            value={skillForm.category}
                            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          >
                            <option>AI / ML</option>
                            <option>Frontend</option>
                            <option>Backend</option>
                            <option>Databases</option>
                            <option>Cloud / Deployment</option>
                            <option>Languages</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Familiarity</label>
                          <input
                            type="text"
                            placeholder="e.g. Core Interest, Proficient"
                            value={skillForm.familiarity}
                            onChange={(e) => setSkillForm({ ...skillForm, familiarity: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-coffee-muted font-bold block mb-1">Technologies (Comma separated)</label>
                        <input
                          type="text"
                          placeholder="Tool schemas, ReAct, Prompt evaluation"
                          value={skillForm.technologies}
                          onChange={(e) => setSkillForm({ ...skillForm, technologies: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-coffee-muted font-bold block mb-1">Short Description</label>
                        <input
                          type="text"
                          placeholder="Brief technical description"
                          value={skillForm.description}
                          onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setNewSkillModal(false)}
                          className="px-3 py-1.5 rounded-lg border border-beige-dark/60 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-coffee text-cream-50 font-bold text-xs"
                        >
                          Save Skill
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skills.map((s) => (
                      <div
                        key={s.id}
                        className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-accent-terracotta uppercase font-bold">{s.category}</span>
                            <span className="text-[10px] text-coffee-muted">• {s.familiarity}</span>
                          </div>
                          <h4 className="font-bold text-xs font-sans text-coffee-espresso">{s.name}</h4>
                          <p className="text-[11px] text-coffee-muted font-sans">{s.description}</p>
                          {s.technologies && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {s.technologies.map((t: string) => (
                                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-beige/50 text-coffee">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(s.id)}
                          className="p-1 rounded text-accent-terracotta hover:bg-accent-terracotta/10 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB: PROJECTS --- */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-beige/60 pb-5">
                    <div>
                      <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                        // CODE & SYSTEMS
                      </span>
                      <h2 className="font-editorial text-3xl font-bold font-sans">Projects ({projects.length})</h2>
                    </div>
                    <button
                      onClick={() => setNewProjModal(true)}
                      className="px-4 py-2 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition flex items-center gap-2 font-sans cursor-pointer shadow-warm-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {newProjModal && (
                    <form onSubmit={handleCreateProject} className="p-5 rounded-xl bg-cream-100 border border-coffee/40 space-y-4 animate-fadeIn">
                      <h3 className="font-bold text-sm font-sans text-coffee-espresso">Create Project Entry</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Title</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. DevPosting"
                            value={projForm.title}
                            onChange={(e) => setProjForm({ ...projForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Slug</label>
                          <input
                            type="text"
                            required
                            value={projForm.slug}
                            onChange={(e) => setProjForm({ ...projForm, slug: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={projForm.subtitle}
                            onChange={(e) => setProjForm({ ...projForm, subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Category</label>
                          <input
                            type="text"
                            value={projForm.category}
                            onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Status</label>
                          <select
                            value={projForm.status}
                            onChange={(e) => setProjForm({ ...projForm, status: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          >
                            <option value="ONLINE">ONLINE</option>
                            <option value="PRODUCTION">PRODUCTION</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-coffee-muted font-bold block mb-1">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          placeholder="React, Node.js, Express, MongoDB"
                          value={projForm.techStack}
                          onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">GitHub Repo URL</label>
                          <input
                            type="text"
                            value={projForm.githubUrl}
                            onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Live URL (optional)</label>
                          <input
                            type="text"
                            value={projForm.liveUrl}
                            onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-coffee-muted font-bold block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={projForm.description}
                          onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-cream-50 border border-beige-dark/60 text-xs"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setNewProjModal(false)}
                          className="px-3 py-1.5 rounded-lg border border-beige-dark/60 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-coffee text-cream-50 font-bold text-xs"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-coffee/10 text-coffee font-mono font-bold">
                              {p.status}
                            </span>
                            <span className="text-[10px] text-coffee-muted">{p.category}</span>
                            {p.featured && (
                              <span className="text-[10px] text-accent-terracotta font-bold">★ FEATURED</span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm font-sans text-coffee-espresso">{p.title}</h4>
                          <p className="text-coffee-muted text-xs line-clamp-1 font-sans">{p.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg border border-beige-dark/60 text-coffee-muted hover:text-coffee transition flex items-center gap-1 font-sans text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </a>
                          <button
                            onClick={() => handleDeleteProject(p.id, p.title)}
                            className="p-1.5 rounded-lg text-accent-terracotta hover:bg-accent-terracotta/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB: RESEARCH NOTES --- */}
              {activeTab === 'research' && (
                <div className="space-y-6">
                  <div className="border-b border-beige/60 pb-5">
                    <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                      // EXPLORATORY NOTES
                    </span>
                    <h2 className="font-editorial text-3xl font-bold font-sans">Research Questions ({research.length})</h2>
                    <p className="text-coffee-muted font-sans text-xs mt-1">
                      Real inquiry questions, exploratory test setups, and literature reading notes. (No fake publications).
                    </p>
                  </div>

                  <div className="space-y-4">
                    {research.map((r) => (
                      <div key={r.id} className="p-5 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-beige/60 text-coffee font-mono">
                              {r.status}
                            </span>
                            <span className="text-[10px] text-accent-terracotta font-bold">{r.topic}</span>
                          </div>
                          <span className="text-[10px] text-coffee-muted">{r.type}</span>
                        </div>
                        <h4 className="font-bold text-sm font-sans text-coffee-espresso">{r.title}</h4>
                        <p className="text-coffee-espresso/90 text-xs font-sans italic">
                          "{r.question}"
                        </p>
                        <div className="text-[11px] text-coffee-muted font-sans pt-1">
                          <strong>Finding:</strong> {r.whatFound}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB: READING & BOOKS --- */}
              {activeTab === 'books' && (
                <div className="space-y-6">
                  <div className="border-b border-beige/60 pb-5">
                    <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                      // PHYSICAL & TECHNICAL BOOKS
                    </span>
                    <h2 className="font-editorial text-3xl font-bold font-sans">Reading Archive ({books.length})</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {books.map((b) => (
                      <div key={b.id} className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-coffee/10 text-coffee font-mono font-bold">
                            {b.status}
                          </span>
                          <span className="text-accent-terracotta font-mono">{'★'.repeat(Math.round(b.rating || 5))}</span>
                        </div>
                        <h4 className="font-bold text-sm font-sans text-coffee-espresso">{b.title}</h4>
                        <div className="text-xs text-coffee-muted font-sans">by {b.author}</div>
                        <p className="text-xs text-coffee-muted font-sans line-clamp-2">{b.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB: HOBBIES --- */}
              {activeTab === 'hobbies' && (
                <div className="space-y-6">
                  <div className="border-b border-beige/60 pb-5">
                    <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                      // LIFE OUTSIDE CODE
                    </span>
                    <h2 className="font-editorial text-3xl font-bold font-sans">Interests & Hobbies ({hobbies.length})</h2>
                  </div>

                  <div className="space-y-3">
                    {hobbies.map((h) => (
                      <div key={h.id} className="p-4 rounded-xl bg-cream-100 border border-beige-dark/50 space-y-1">
                        <h4 className="font-bold text-sm font-sans text-coffee-espresso">{h.title}</h4>
                        <p className="text-xs text-coffee-muted font-sans">{h.description}</p>
                        <p className="text-[11px] text-coffee-espresso/80 font-sans italic pt-1">{h.personalStory}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB: MEDIA LIBRARY --- */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="border-b border-beige/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                        // ASSETS & ARCHIVE IMAGERY
                      </span>
                      <h2 className="font-editorial text-3xl font-bold font-sans">Media Library ({media.length})</h2>
                      <p className="text-coffee-muted font-sans text-xs mt-1">
                        Centralized manager for portraits, project screenshots, book covers, and essay imagery.
                      </p>
                    </div>

                    <button
                      onClick={() => setNewMediaModal(true)}
                      className="px-4 py-2 rounded-xl bg-coffee text-cream-50 hover:bg-coffee-roast font-bold transition flex items-center gap-2 font-sans text-xs shrink-0 cursor-pointer shadow-warm-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Media Asset</span>
                    </button>
                  </div>

                  {/* Active Portrait Control Banner */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-cream-50 border border-beige-dark/70 shadow-warm-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-beige/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold">
                            CURRENT ACTIVE PORTRAIT
                          </span>
                          <span className="font-mono text-xs font-bold text-coffee">{activePhotoUrl}</span>
                        </div>
                        <p className="text-[11px] text-coffee-muted font-sans mt-0.5">
                          This is the photograph loaded in the homepage hero and about page. Select any portrait below to activate it instantly.
                        </p>
                      </div>
                    </div>

                    {/* Quick Profile Portraits Row */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-coffee-muted font-mono">
                        Available Portrait Variations:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {media
                          .filter((m) => m.category === 'Profile')
                          .map((p) => {
                            const isCurrentActive = activePhotoUrl === p.url;
                            return (
                              <div
                                key={p.id}
                                className={`p-2 rounded-xl border transition-all text-center space-y-1.5 flex flex-col items-center ${
                                  isCurrentActive
                                    ? 'bg-cream-100 border-coffee shadow-warm-sm ring-2 ring-coffee/20'
                                    : 'bg-cream-50 border-beige-dark/50 hover:border-coffee/50'
                                }`}
                              >
                                <div className="w-16 h-20 rounded-lg overflow-hidden bg-cream-100 border border-coffee/20 shadow-inner">
                                  <img
                                    src={`/${p.url}`}
                                    alt={p.title}
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="text-[11px] font-bold font-sans truncate w-full text-coffee-espresso">
                                  {p.title}
                                </div>
                                {isCurrentActive ? (
                                  <span className="text-[9px] font-mono px-2 py-0.5 bg-coffee text-cream-50 rounded-full font-bold">
                                    ✓ Active
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleSetActivePortrait(p.url)}
                                    className="text-[9px] font-mono px-2 py-0.5 bg-beige hover:bg-coffee hover:text-cream-50 text-coffee-espresso rounded-full transition cursor-pointer font-bold"
                                  >
                                    Activate
                                  </button>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  {/* Filter Categories */}
                  <div className="flex items-center gap-1.5 flex-wrap font-sans text-xs">
                    {['ALL', 'Profile', 'Project', 'Book', 'Blog', 'Hobby', 'Research'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setMediaCategoryFilter(cat)}
                        className={`px-3 py-1 rounded-lg border transition font-mono text-[11px] cursor-pointer ${
                          mediaCategoryFilter === cat
                            ? 'bg-coffee text-cream-50 border-coffee font-bold'
                            : 'bg-cream-50 border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso'
                        }`}
                      >
                        {cat === 'ALL' ? 'All Assets' : cat}
                      </button>
                    ))}
                  </div>

                  {/* Media Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media
                      .filter((m) => mediaCategoryFilter === 'ALL' || m.category === mediaCategoryFilter)
                      .map((m) => {
                        const isProfile = m.category === 'Profile';
                        const isCurrentActive = activePhotoUrl === m.url;

                        return (
                          <div
                            key={m.id}
                            className="p-3 rounded-xl bg-cream-50 border border-beige-dark/60 shadow-warm-xs hover:shadow-warm-sm transition-all space-y-2 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              {/* Thumbnail */}
                              <div
                                onClick={() => setPreviewMediaModal(m)}
                                className="aspect-[4/3] rounded-lg bg-cream-100 overflow-hidden border border-beige/60 flex items-center justify-center cursor-pointer group relative"
                              >
                                <img
                                  src={`/${m.url}`}
                                  alt={m.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-coffee/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-cream-50 text-[10px] font-mono">
                                  Click to Preview
                                </div>
                              </div>

                              {/* Info */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-beige/80 text-coffee font-mono font-bold">
                                    {m.category || 'Asset'}
                                  </span>
                                  {isCurrentActive && (
                                    <span className="text-[9px] text-accent-terracotta font-mono font-bold flex items-center gap-0.5">
                                      <Star className="w-2.5 h-2.5 fill-current" /> Active Portrait
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-bold text-xs font-sans text-coffee-espresso truncate" title={m.title}>
                                  {m.title}
                                </h4>
                                <div className="text-[10px] text-coffee-muted font-mono truncate" title={m.url}>
                                  /{m.url}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 border-t border-beige/60 flex items-center justify-between gap-1 text-[10px] font-mono">
                              <div className="flex items-center gap-1">
                                {isProfile && !isCurrentActive && (
                                  <button
                                    onClick={() => handleSetActivePortrait(m.url)}
                                    className="px-2 py-1 rounded-md bg-coffee/10 hover:bg-coffee hover:text-cream-50 text-coffee transition font-bold cursor-pointer"
                                    title="Set as active profile portrait"
                                  >
                                    Activate
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setSelectedMediaForAssign(m);
                                    setAssignTargetType('project');
                                    setAssignTargetId('');
                                  }}
                                  className="px-2 py-1 rounded-md border border-beige-dark/60 hover:border-coffee text-coffee-muted hover:text-coffee transition cursor-pointer"
                                  title="Assign this image to project, book, or blog"
                                >
                                  Assign
                                </button>
                              </div>

                              <button
                                onClick={() => handleDeleteMedia(m.id, m.title)}
                                className="p-1 rounded-md text-accent-terracotta hover:bg-accent-terracotta/10 transition cursor-pointer"
                                title="Delete media asset"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Add Media Modal */}
                  {newMediaModal && (
                    <div className="fixed inset-0 z-50 bg-coffee-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-xl max-w-md w-full p-6 space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-beige/60 pb-3">
                          <h3 className="font-bold text-sm text-coffee-espresso font-sans">Add Media Asset to Library</h3>
                          <button
                            onClick={() => setNewMediaModal(false)}
                            className="p-1 text-coffee-muted hover:text-coffee"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <form onSubmit={handleCreateMedia} className="space-y-3 font-sans">
                          <div>
                            <label className="text-[10px] font-bold text-coffee-muted block mb-1">Asset Title</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Portrait Variant 4, Project Architecture Diagram"
                              value={mediaForm.title}
                              onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-coffee-muted block mb-1">
                              File Path / URL
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. me1.jpeg, devposting-chronicles.png, or https://..."
                              value={mediaForm.url}
                              onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs font-mono"
                            />
                            <p className="text-[10px] text-coffee-muted mt-1">
                              Files placed in the public directory (like <code className="font-mono">me1.jpeg</code>) or external URLs.
                            </p>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-coffee-muted block mb-1">Category</label>
                            <select
                              value={mediaForm.category}
                              onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs"
                            >
                              <option value="Profile">Profile Portrait</option>
                              <option value="Project">Project Screenshot / Diagram</option>
                              <option value="Book">Book Cover</option>
                              <option value="Blog">Essay / Blog Cover</option>
                              <option value="Hobby">Hobby / Sketch / Photo</option>
                              <option value="Research">Research Diagram</option>
                            </select>
                          </div>

                          <div className="flex justify-end gap-2 pt-2 border-t border-beige/60">
                            <button
                              type="button"
                              onClick={() => setNewMediaModal(false)}
                              className="px-3 py-1.5 rounded-lg border border-beige-dark/60 text-xs text-coffee-muted hover:text-coffee"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-1.5 rounded-lg bg-coffee text-cream-50 font-bold text-xs hover:bg-coffee-roast transition"
                            >
                              Add to Library
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Assign Media Modal */}
                  {selectedMediaForAssign && (
                    <div className="fixed inset-0 z-50 bg-coffee-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-xl max-w-md w-full p-6 space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-beige/60 pb-3">
                          <h3 className="font-bold text-sm text-coffee-espresso font-sans">
                            Assign "{selectedMediaForAssign.title}"
                          </h3>
                          <button
                            onClick={() => setSelectedMediaForAssign(null)}
                            className="p-1 text-coffee-muted hover:text-coffee"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-3 font-sans">
                          <div>
                            <label className="text-[10px] font-bold text-coffee-muted block mb-1">Target Section</label>
                            <div className="grid grid-cols-3 gap-2">
                              {(['project', 'book', 'blog'] as const).map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => {
                                    setAssignTargetType(t);
                                    setAssignTargetId('');
                                  }}
                                  className={`py-1.5 px-2 rounded-lg border text-center text-xs font-mono capitalize transition ${
                                    assignTargetType === t
                                      ? 'bg-coffee text-cream-50 border-coffee font-bold'
                                      : 'bg-cream-100 border-beige-dark/60 text-coffee-muted'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-coffee-muted block mb-1">
                              Select Specific {assignTargetType.toUpperCase()}
                            </label>
                            <select
                              value={assignTargetId}
                              onChange={(e) => setAssignTargetId(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs"
                            >
                              <option value="">-- Choose target --</option>
                              {assignTargetType === 'project' &&
                                projects.map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.title} ({p.slug})
                                  </option>
                                ))}
                              {assignTargetType === 'book' &&
                                books.map((b) => (
                                  <option key={b.id} value={b.id}>
                                    {b.title} by {b.author}
                                  </option>
                                ))}
                              {assignTargetType === 'blog' &&
                                blogs.map((bl) => (
                                  <option key={bl.id} value={bl.id}>
                                    {bl.title}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className="flex justify-end gap-2 pt-2 border-t border-beige/60">
                            <button
                              type="button"
                              onClick={() => setSelectedMediaForAssign(null)}
                              className="px-3 py-1.5 rounded-lg border border-beige-dark/60 text-xs text-coffee-muted hover:text-coffee"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAssignMedia}
                              disabled={!assignTargetId}
                              className="px-4 py-1.5 rounded-lg bg-coffee text-cream-50 font-bold text-xs hover:bg-coffee-roast transition disabled:opacity-50"
                            >
                              Confirm Assignment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Preview Modal */}
                  {previewMediaModal && (
                    <div
                      onClick={() => setPreviewMediaModal(null)}
                      className="fixed inset-0 z-50 bg-coffee-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-xl max-w-xl w-full p-5 space-y-4 cursor-default animate-fadeIn"
                      >
                        <div className="flex items-center justify-between border-b border-beige/60 pb-3">
                          <div>
                            <h3 className="font-bold text-sm text-coffee-espresso font-sans">
                              {previewMediaModal.title}
                            </h3>
                            <span className="text-[10px] font-mono text-coffee-muted">
                              /{previewMediaModal.url}
                            </span>
                          </div>
                          <button
                            onClick={() => setPreviewMediaModal(null)}
                            className="p-1 text-coffee-muted hover:text-coffee"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="max-h-[60vh] overflow-hidden rounded-xl bg-cream-100 flex items-center justify-center border border-beige/60">
                          <img
                            src={`/${previewMediaModal.url}`}
                            alt={previewMediaModal.title}
                            className="max-h-[58vh] w-auto object-contain"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-beige/60 text-xs font-mono">
                          <span className="text-coffee-muted text-[11px]">
                            Category: {previewMediaModal.category || 'Asset'}
                          </span>
                          {previewMediaModal.category === 'Profile' && (
                            <button
                              onClick={() => {
                                handleSetActivePortrait(previewMediaModal.url);
                                setPreviewMediaModal(null);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition cursor-pointer"
                            >
                              Set as Active Portrait
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB: SETTINGS & BACKUP --- */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div className="border-b border-beige/60 pb-5">
                    <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
                      // CONFIGURATION & DATABASE
                    </span>
                    <h2 className="font-editorial text-3xl font-bold font-sans">Studio Settings & Database</h2>
                  </div>

                  {/* Metadata & Currently Editor */}
                  <form onSubmit={handleSaveSettings} className="space-y-6 font-sans">
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm text-coffee-espresso">Currently Section</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Currently Reading</label>
                          <input
                            type="text"
                            value={settings.currently?.reading || ''}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                currently: { ...settings.currently, reading: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Reading Author</label>
                          <input
                            type="text"
                            value={settings.currently?.readingAuthor || ''}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                currently: { ...settings.currently, readingAuthor: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Currently Exploring</label>
                          <input
                            type="text"
                            value={settings.currently?.exploring || ''}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                currently: { ...settings.currently, exploring: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Currently Building</label>
                          <input
                            type="text"
                            value={settings.currently?.building || ''}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                currently: { ...settings.currently, building: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-sm text-coffee-espresso">Site Metadata & Header Badge</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Status Badge Text</label>
                          <input
                            type="text"
                            value={settings.siteMetadata?.statusBadge || ''}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                siteMetadata: { ...settings.siteMetadata, statusBadge: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-coffee-muted font-bold block mb-1">Location</label>
                          <input
                            type="text"
                            value={settings.siteMetadata?.location || ''}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                siteMetadata: { ...settings.siteMetadata, location: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-cream-100 border border-beige-dark/60 text-xs font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition cursor-pointer shadow-warm-sm text-xs font-sans"
                    >
                      Save Studio Settings
                    </button>
                  </form>

                  {/* MongoDB Database Architecture */}
                  <div className="pt-6 border-t border-beige/60 space-y-4 font-sans">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-coffee-espresso">MongoDB Database Architecture</h3>
                          {mongoStatus?.connected ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold">
                              ✓ MONGODB CONNECTED & ACTIVE
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold">
                              ● HYBRID STORE (FALLBACK READY)
                            </span>
                          )}
                        </div>
                        <p className="text-coffee-muted text-xs mt-1">
                          All portfolio collections (Projects, Skills, Experience, Research, Books, Hobbies, Blogs, Comments, Media, Settings) are backed by MongoDB schemas.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSyncMongo}
                        disabled={syncingMongo}
                        className="px-4 py-2 rounded-xl bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition flex items-center gap-2 text-xs cursor-pointer shadow-warm-xs shrink-0 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${syncingMongo ? 'animate-spin' : ''}`} />
                        <span>{syncingMongo ? 'Syncing...' : 'Sync with MongoDB'}</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-cream-100 border border-beige-dark/50 text-[11px] font-mono space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-coffee-muted">Configured URI:</span>
                        <span className="font-bold text-coffee">process.env.MONGODB_URI</span>
                      </div>
                      <div className="text-[10px] text-coffee-muted">
                        Active Mongoose Collections: <span className="text-coffee font-semibold">11 collections</span> (projects, skills, experience, research, books, hobbies, blogs, comments, media, settings, admins).
                      </div>
                    </div>
                  </div>

                  {/* Database Export & Restore */}
                  <div className="pt-6 border-t border-beige/60 space-y-4 font-sans">
                    <h3 className="font-bold text-sm text-coffee-espresso">Database Backup & Portability</h3>
                    <p className="text-coffee-muted text-xs">
                      Export a complete JSON snapshot of all portfolio collections or restore from a previous backup file.
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href={api.admin.backup.exportUrl()}
                        download
                        className="px-4 py-2 rounded-xl bg-cream-100 border border-beige-dark/60 hover:border-coffee text-coffee-espresso transition flex items-center gap-2 text-xs font-bold font-sans"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Database JSON</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-coffee-espresso/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-lg p-6 sm:p-8 space-y-6 font-mono text-xs animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-beige/60">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-coffee" />
                <h3 className="font-bold text-sm font-sans text-coffee-espresso">Change Administrator Passphrase</h3>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-coffee-muted hover:text-coffee cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-accent-terracotta/10 border border-accent-terracotta/30 text-accent-terracotta text-xs font-sans">
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 font-sans">
              <div className="space-y-1">
                <label className="text-[10px] text-coffee-muted font-bold block uppercase">Current Passphrase</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-beige-dark/60 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-coffee-muted font-bold block uppercase">New Passphrase (min 8 chars)</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-beige-dark/60 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-coffee-muted font-bold block uppercase">Confirm New Passphrase</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-cream-100 border border-beige-dark/60 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-beige-dark/60 text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-coffee text-cream-50 font-bold text-xs hover:bg-coffee-roast cursor-pointer"
                >
                  Update & Invalidate Sessions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
