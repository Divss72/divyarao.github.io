import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { PersonalMap } from '../components/home/PersonalMap';
import { SelectedProjects } from '../components/home/SelectedProjects';
import { ExploringSection } from '../components/home/ExploringSection';
import { HobbyPreview } from '../components/home/HobbyPreview';
import { RecentWriting } from '../components/home/RecentWriting';
import { PlayPreview } from '../components/home/PlayPreview';
import { HomeContact } from '../components/home/HomeContact';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 sm:space-y-28 py-6 sm:py-10 px-4 sm:px-6 max-w-6xl mx-auto font-sans text-coffee-espresso">
      {/* 01 — HERO ("HELLO, I'M DIVYA") */}
      <HeroSection />

      {/* 02 — THE PERSONAL MAP ("EXPLORE MY WORLD") */}
      <PersonalMap />

      {/* 03 — SMALL PROJECT PREVIEW */}
      <SelectedProjects />

      {/* 04 — WHAT I EXPLORE (Research Inquiries + Reading Notes) */}
      <ExploringSection />

      {/* 05 — LIFE OUTSIDE CODE (Hobbies: Basketball, Books, Cinema, Running) */}
      <HobbyPreview />

      {/* 06 — LATEST ESSAYS / BLOG */}
      <RecentWriting />

      {/* 07 — PLAY & EXPERIMENTS ARCADE */}
      <PlayPreview />

      {/* 08 — PERSONAL CONTACT INVITATION */}
      <HomeContact />
    </div>
  );
};

export default HomePage;
