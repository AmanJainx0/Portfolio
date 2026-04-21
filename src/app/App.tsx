import { useEffect, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ParticleBackground } from './components/ParticleBackground';
import { FloatingNav } from './components/FloatingNav';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [secretMode, setSecretMode] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Secret keyboard shortcut: Ctrl + Shift + F for "Fun Mode"
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        setSecretMode(!secretMode);
        document.body.style.filter = secretMode ? 'none' : 'hue-rotate(180deg)';
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [secretMode]);

  if (!isLoaded) {
    return (
      <div className="size-full flex items-center justify-center bg-black">
        <div className="text-cyan-400 text-2xl font-bold animate-pulse">
          Loading Experience...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Main Content */}
      <main className="relative z-10">
        <div id="home">
          <HeroSection />
        </div>

        <div id="about">
          <AboutSection />
        </div>

        <div id="skills">
          <SkillsSection />
        </div>

        <div id="projects">
          <ProjectsSection />
        </div>

        <div id="experience">
          <ExperienceSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-white/10">
        <p className="text-gray-400">
          Made with 💜 by Aman Jain • © 2026
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Psst... Try pressing Ctrl + Shift + F 🎨
        </p>
      </footer>
    </div>
  );
}