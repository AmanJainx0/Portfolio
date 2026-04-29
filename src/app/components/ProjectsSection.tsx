import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'TechBrat — AI Career Buddy',
    description: 'An AI-powered career guidance platform that helps students navigate their tech journey through personalized recommendations, skill assessments, and modular learning paths. Built with a modern stack featuring intelligent content curation.',
    tags: ['React', 'Node.js', 'AI/ML', 'MongoDB'],
    color: 'from-cyan-500 to-blue-500',
    glowColor: '#06b6d4',
    github: 'https://github.com/AmanJainx0',
  },
  {
    id: 2,
    title: 'Smart Hostel Management System',
    description: 'A comprehensive hostel administration platform with role-based dashboards for students, wardens, caretakers, and chief wardens. Features complaint tracking, room allocation, attendance, and real-time notifications.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
    color: 'from-purple-500 to-pink-500',
    glowColor: '#8b5cf6',
    github: 'https://github.com/AmanJainx0',
  },
  {
    id: 3,
    title: 'Portfolio v2 — Design System',
    description: 'A premium editorial-style portfolio website featuring dark navy aesthetics, massive Anton typography, asymmetric layouts, cinematic scroll-driven animations, and ambient orb effects.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Design System'],
    color: 'from-pink-500 to-orange-500',
    glowColor: '#ec4899',
    github: 'https://github.com/AmanJainx0',
  },
  // {
  //   id: 4,
  //   title: 'Daily DSA — 365 Days of Code',
  //   description: 'A disciplined daily practice regimen solving data structures and algorithm problems consistently. Covering arrays, trees, graphs, dynamic programming, and competitive programming patterns in Java.',
  //   tags: ['Java', 'DSA', 'Problem Solving', 'Algorithms'],
  //   color: 'from-green-500 to-cyan-500',
  //   glowColor: '#10b981',
  //   github: 'https://github.com/AmanJainx0',
  // },
  {
    id: 5,
    title: 'Automated Faculty Substitution System',
    description: 'A smart faculty substitution management system that automates the process of finding and assigning substitute teachers when faculty members are unavailable. Features real-time scheduling, availability tracking, notification alerts, and admin dashboards with RESTful API architecture.',
    tags: ['React', 'Node.js', 'Express', 'REST API', 'PostgreSQL'],
    color: 'from-orange-500 to-amber-500',
    glowColor: '#f97316',
    github: 'https://github.com/AmanJainx0',
  },
];

export function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Here are some of my recent works. Hover to explore, click to expand.
          Try dragging them around! 🎮
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isExpanded={expandedProject === project.id}
              onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle
}: {
  project: typeof projects[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const glowX = useTransform(x, (value) => value * 0.5);
  const glowY = useTransform(y, (value) => value * 0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
    >
      <motion.div
        className={`relative p-8 rounded-3xl bg-gradient-to-br ${project.color} bg-opacity-10 backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden`}
        style={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
          transformPerspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        animate={{
          boxShadow: isHovering
            ? `0 20px 60px ${project.glowColor}40`
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0`}
          animate={{ opacity: isHovering ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glowing orb that follows mouse */}
        {isHovering && (
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{
              background: project.glowColor,
              x: glowX,
              y: glowY,
              left: '50%',
              top: '50%',
              marginLeft: '-128px',
              marginTop: '-128px',
            }}
          />
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              animate={{ rotate: isHovering ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <div className="flex gap-2">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5 text-white" />
              </motion.a>
              <motion.button
                className="p-2 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          <motion.h3
            className="text-2xl font-bold text-white mb-3"
            animate={{ x: isHovering ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-gray-300 mb-4"
            initial={{ height: '3rem' }}
            animate={{ height: isExpanded ? 'auto' : '3rem' }}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovering ? 1 : 0.7 }}
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-xl text-white border border-white/20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <p className="text-gray-400 text-sm">
                Click the GitHub icon to view the source code for this project.
              </p>
            </motion.div>
          )}
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
