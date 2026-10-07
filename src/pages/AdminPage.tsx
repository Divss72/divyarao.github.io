import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboardPage } from './AdminDashboardPage';
import { Shield, Loader2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<{
    authenticated: boolean;
    email?: string;
  }>({ authenticated: false });

  const verifySession = async () => {
    setLoading(true);
    try {
      const res = await api.auth.me();
      setAuthState({
        authenticated: Boolean(res.authenticated),
        email: res.email,
      });
    } catch {
      setAuthState({ authenticated: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-mono text-xs text-coffee-muted space-x-2">
        <Loader2 className="w-4 h-4 animate-spin text-coffee" />
        <span>Verifying studio session...</span>
      </div>
    );
  }

  if (!authState.authenticated) {
    return <AdminLoginPage onSuccess={verifySession} />;
  }

  return (
    <AdminDashboardPage
      adminEmail={authState.email}
      onLogout={() => setAuthState({ authenticated: false })}
    />
  );
};

export default AdminPage;
