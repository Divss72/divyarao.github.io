import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Lock, ArrowLeft, Shield, AlertCircle, Loader2 } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please provide your administrator credentials.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.auth.login(identifier.trim(), password);
      if (res.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/admin');
        }
      } else {
        setError('Invalid credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-cream-50 rounded-2xl border border-beige-dark/70 shadow-warm-lg p-8 sm:p-10 space-y-8 font-mono text-xs text-coffee-espresso relative overflow-hidden">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coffee/20 via-coffee to-coffee/20" />

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-coffee-muted hover:text-coffee-espresso transition group font-sans text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-beige/40 text-coffee-muted border border-beige-dark/40 font-mono">
            <Shield className="w-3 h-3 text-accent-terracotta" />
            Protected
          </span>
        </div>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-beige/60 border border-beige-dark/60 flex items-center justify-center mx-auto text-coffee shadow-warm-sm">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-editorial text-3xl font-bold tracking-tight text-coffee-espresso font-sans pt-1">
            Private Studio
          </h1>
          <p className="text-coffee-muted text-xs leading-relaxed max-w-xs mx-auto font-sans">
            Restricted publishing and management console. Authenticate to manage portfolio content.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-accent-terracotta/10 border border-accent-terracotta/30 flex items-start gap-2.5 text-accent-terracotta animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs font-sans">
              <div className="font-semibold">Authentication Error</div>
              <div className="text-[11px] opacity-90">{error}</div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider text-coffee-muted font-bold">
              Account Identifier
            </label>
            <input
              type="text"
              required
              autoFocus
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Username or admin email"
              autoComplete="username"
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-beige-dark/60 focus:border-coffee focus:outline-none transition text-coffee-espresso text-xs placeholder:text-coffee-muted/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider text-coffee-muted font-bold">
              Passphrase
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-beige-dark/60 focus:border-coffee focus:outline-none transition text-coffee-espresso text-xs placeholder:text-coffee-muted/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-coffee text-cream-50 font-bold hover:bg-coffee-roast transition flex items-center justify-center gap-2 cursor-pointer shadow-warm-sm disabled:opacity-60 disabled:cursor-not-allowed font-sans text-xs tracking-wide"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Unlock Studio</span>
            )}
          </button>
        </form>

        {/* Footer Security Footnote */}
        <div className="pt-2 border-t border-beige/60 text-center">
          <p className="text-[10px] text-coffee-muted font-mono leading-relaxed">
            Encrypted session cookies • Multi-layer rate limiting
          </p>
        </div>
      </div>
    </div>
  );
};
