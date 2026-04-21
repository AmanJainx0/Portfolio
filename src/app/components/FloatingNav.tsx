import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, Mail } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: User, label: 'About', id: 'about' },
  { icon: Code, label: 'Projects', id: 'projects' },
  { icon: Briefcase, label: 'Experience', id: 'experience' },
  { icon: Mail, label: 'Contact', id: 'contact' },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, i) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(navItems[i].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
      style={{ opacity }}
    >
      <motion.div
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative p-3 rounded-full transition-colors ${
              activeSection === item.id
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <item.icon className="w-5 h-5" />

            {activeSection === item.id && (
              <motion.div
                className="absolute inset-0 bg-cyan-500/20 rounded-full"
                layoutId="activeNav"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            <motion.span
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-black/80 px-2 py-1 rounded opacity-0 pointer-events-none"
              whileHover={{ opacity: 1 }}
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </motion.div>
    </motion.nav>
  );
}
