'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import Skills from '@/components/Skills';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Publications from '@/components/Publications';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import { ProgressProvider } from '@/components/ProgressTracker';
import { ExternalDataProvider } from '@/contexts/ExternalDataContext';

// Dynamic imports for heavy animation components
const FloatingNav = dynamic(() => import('@/components/FloatingNav'), { ssr: false });
const CursorEffects = dynamic(() => import('@/components/CursorEffects'), { ssr: false });
const AmbientParticles = dynamic(() => import('@/components/AmbientParticles'), { ssr: false });
const AnimatedBlobs = dynamic(() => import('@/components/AnimatedBlobs'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const ThemeSwitcher = dynamic(() => import('@/components/ThemeSwitcher'), { ssr: false });
const AccessibilityPanel = dynamic(() => import('@/components/AccessibilityPanel'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const AIChatbot = dynamic(() => import('@/components/AIChatbot'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false });
const ProgressTracker = dynamic(() => import('@/components/ProgressTracker'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });
const KeyboardHints = dynamic(() => import('@/components/KeyboardHints'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('portfolio-visited');
    if (hasVisited) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('portfolio-visited', 'true');
    // Small delay to ensure smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <ProgressProvider>
      <ExternalDataProvider>
        {/* Loading screen (only on first visit per session) */}
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

        {/* Main content */}
        {showContent && (
          <>
            {/* Background effects */}
            <AnimatedBlobs />
            <AmbientParticles />

            {/* Cursor effects */}
            <CursorEffects />

            {/* Controls */}
            <ThemeSwitcher />
            <ProgressTracker />
            <AccessibilityPanel />
            <FloatingNav />

            {/* Utilities */}
            <CommandPalette />
            <EasterEggs />
            <AIChatbot />
            <BackToTop />
            <KeyboardHints />

            {/* Main content */}
            <main className="main-content">
              <Hero />
              <BentoGrid />
              <Skills />
              <CurrentlyLearning />
              <Experience />
              <Achievements />
              <Projects />
              <Testimonials />
              <Certifications />
              <Publications />
              <Contact />
            </main>
          </>
        )}
      </ExternalDataProvider>
    </ProgressProvider>
  );
}
