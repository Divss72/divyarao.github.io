import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../data/store';

interface NavbarProps {
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCv }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skills' },
    { to: '/experience', label: 'Experience' },
    { to: '/research', label: 'Research' },
    { to: '/books', label: 'Books' },
    { to: '/hobbies', label: 'Hobbies' },
    { to: '/blog', label: 'Blog' },
    { to: '/play', label: 'Play' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-beige-dark/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-coffee text-cream-50 flex items-center justify-center font-serif text-lg font-bold shadow-warm-sm group-hover:bg-coffee-roast transition-colors">
            DR
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-editorial font-bold text-lg text-coffee-espresso tracking-tight block">
                Divya Rao
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-beige/60 text-coffee-muted font-mono font-medium">
                CS & AI
              </span>
            </div>
            <span className="text-[11px] text-coffee-muted font-mono block -mt-0.5">
              Chandigarh, India
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-mono font-medium text-coffee-muted">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-beige/70 text-coffee-espresso font-bold shadow-warm-inner'
                    : 'hover:text-coffee-espresso hover:bg-beige/30'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenCv}
            className="px-3.5 py-1.5 rounded-lg border border-beige-dark/50 text-coffee-dark hover:bg-beige/40 text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>CV</span>
            <span className="text-[10px] text-accent-terracotta">✦</span>
          </button>

          <Link
            to="/contact"
            className="px-4 py-1.5 rounded-lg bg-coffee text-cream-50 hover:bg-coffee-roast text-xs font-mono font-bold shadow-warm-sm transition flex items-center gap-1.5"
          >
            <span>Let's Talk</span>
            <span>→</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCv}
            className="px-2.5 py-1 rounded border border-beige-dark/50 text-coffee-dark text-xs font-mono"
          >
            CV
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg border border-beige-dark/50 text-coffee-espresso bg-cream-50 hover:bg-beige/30 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-beige/60 bg-cream-50/98 px-6 py-6 space-y-4 shadow-warm-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-sm font-mono">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-coffee text-cream-50 font-bold'
                      : 'text-coffee-dark hover:bg-beige/40'
                  }`
                }
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-60">→</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-beige/60 flex items-center justify-between text-xs font-mono">
            <Link
              to="/admin"
              onClick={closeMenu}
              className="text-coffee-muted hover:text-coffee-espresso flex items-center gap-1"
            >
              <span>🔒 Admin CMS</span>
            </Link>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-accent-terracotta hover:underline font-semibold"
            >
              {SOCIAL_LINKS.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
