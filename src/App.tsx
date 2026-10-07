import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { CvModal } from './components/ui/CvModal';
import { LivingBackground } from './components/visual/LivingBackground';

// Multi-Page Routes
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ResearchPage } from './pages/ResearchPage';
import { BooksPage } from './pages/BooksPage';
import { HobbiesPage } from './pages/HobbiesPage';
import { PlayPage } from './pages/PlayPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically when navigating between pages
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream-100 text-coffee-espresso font-sans relative flex flex-col justify-between selection:bg-beige selection:text-coffee-black bg-notebook-pattern">
      {/* Ambient living-paper animated background */}
      <LivingBackground />

      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Subtle Custom Cursor for desktop */}
      <CustomCursor />

      {/* Global Editorial Navigation */}
      <Navbar onOpenCv={() => setCvModalOpen(true)} />

      {/* Main Multi-Page Routed Viewports */}
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Editorial Footer */}
      <Footer />

      {/* CV Request Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
};

export default App;
