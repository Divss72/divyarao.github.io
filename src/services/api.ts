/**
 * Frontend API Client for Private Studio & Public Portfolio
 * Automatically sends HttpOnly cookies with `credentials: 'include'`
 */

export const API_BASE = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL as string).replace(/\/$/, '') + '/api'
  : '/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Includes HttpOnly session cookie
  });

  const contentType = response.headers.get('content-type') || '';
  let data: any = null;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = data?.error || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // Auth
  auth: {
    async login(identifier: string, password: string) {
      return request<{ success: boolean; message: string; token?: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      });
    },
    async logout() {
      return request<{ success: boolean; message: string }>('/auth/logout', {
        method: 'POST',
      });
    },
    async me() {
      return request<{
        authenticated: boolean;
        email?: string;
        session?: { email: string; activeSince: string; expiresAt: string; activeSessionsCount: number };
      }>('/auth/me');
    },
    async changePassword(currentPassword: string, newPassword: string) {
      return request<{ success: boolean; message: string }>('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    },
  },

  // Public Endpoints
  public: {
    async getData() {
      return request<{
        skills: any[];
        projects: any[];
        experience: any[];
        research: any[];
        books: any[];
        hobbies: any[];
        blogs: any[];
        approvedComments: any[];
        settings: any;
      }>('/public/data');
    },
    async submitComment(blogSlug: string, author: string, email: string | undefined, content: string) {
      return request<{ success: boolean; message: string; commentId: string }>('/public/comments', {
        method: 'POST',
        body: JSON.stringify({ blogSlug, author, email, content }),
      });
    },
  },

  // Admin CRUD Endpoints
  admin: {
    // Skills
    skills: {
      getAll: () => request<any[]>('/admin/skills'),
      create: (item: any) => request<any>('/admin/skills', { method: 'POST', body: JSON.stringify(item) }),
      update: (id: string, item: any) => request<any>(`/admin/skills/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/skills/${id}`, { method: 'DELETE' }),
    },

    // Projects
    projects: {
      getAll: () => request<any[]>('/admin/projects'),
      create: (item: any) => request<any>('/admin/projects', { method: 'POST', body: JSON.stringify(item) }),
      update: (id: string, item: any) => request<any>(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/projects/${id}`, { method: 'DELETE' }),
    },

    // Experience
    experience: {
      getAll: () => request<any[]>('/admin/experience'),
      create: (item: any) => request<any>('/admin/experience', { method: 'POST', body: JSON.stringify(item) }),
      update: (id: string, item: any) => request<any>(`/admin/experience/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/experience/${id}`, { method: 'DELETE' }),
    },

    // Research
    research: {
      getAll: () => request<any[]>('/admin/research'),
      create: (item: any) => request<any>('/admin/research', { method: 'POST', body: JSON.stringify(item) }),
      update: (id: string, item: any) => request<any>(`/admin/research/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/research/${id}`, { method: 'DELETE' }),
    },

    // Books
    books: {
      getAll: () => request<any[]>('/admin/books'),
      create: (item: any) => request<any>('/admin/books', { method: 'POST', body: JSON.stringify(item) }),
      update: (id: string, item: any) => request<any>(`/admin/books/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/books/${id}`, { method: 'DELETE' }),
    },

    // Hobbies
    hobbies: {
      getAll: () => request<any[]>('/admin/hobbies'),
      create: (item: any) => request<any>('/admin/hobbies', { method: 'POST', body: JSON.stringify(item) }),
      update: (id: string, item: any) => request<any>(`/admin/hobbies/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/hobbies/${id}`, { method: 'DELETE' }),
    },

    // Blogs
    blogs: {
      getAll: () => request<any[]>('/admin/blogs'),
      create: (item: any) => request<any>('/admin/blogs', { method: 'POST', body: JSON.stringify(item) }),
      update: (id: string, item: any) => request<any>(`/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/blogs/${id}`, { method: 'DELETE' }),
    },

    // Comments Moderation
    comments: {
      getAll: () => request<any[]>('/admin/comments'),
      setStatus: (id: string, status: 'approved' | 'rejected' | 'spam' | 'pending') =>
        request<any>(`/admin/comments/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
      delete: (id: string) => request<any>(`/admin/comments/${id}`, { method: 'DELETE' }),
    },

    // Media
    media: {
      getAll: () => request<any[]>('/admin/media'),
      create: (item: any) => request<any>('/admin/media', { method: 'POST', body: JSON.stringify(item) }),
      delete: (id: string) => request<any>(`/admin/media/${id}`, { method: 'DELETE' }),
    },

    // Settings
    settings: {
      get: () => request<any>('/admin/settings'),
      update: (settings: any) => request<any>('/admin/settings', { method: 'PUT', body: JSON.stringify(settings) }),
    },

    // MongoDB Management
    mongodb: {
      getStatus: () => request<{ connected: boolean; collections: string[] }>('/admin/mongodb/status'),
      sync: () => request<{ success: boolean; message: string }>('/admin/mongodb/sync', { method: 'POST' }),
    },

    // Backup
    backup: {
      exportUrl: () => `${API_BASE}/admin/backup/export`,
      restore: (data: any) => request<any>('/admin/backup/restore', { method: 'POST', body: JSON.stringify(data) }),
    },
  },
};
