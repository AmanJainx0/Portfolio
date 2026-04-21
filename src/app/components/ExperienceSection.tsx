import { motion, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import { Briefcase, GraduationCap, Award, Users } from 'lucide-react';

const experiences = [
  {
    type: 'role',
    icon: Users,
    title: 'Campus Mantri',
    company: 'GeeksforGeeks',
    period: '2024 - Present',
    description: 'Representing GeeksforGeeks on campus, organizing coding events, workshops, and driving the competitive programming culture at MIT Meerut.',
    color: 'cyan',
  },
  {
    type: 'role',
    icon: Briefcase,
    title: 'Member — Computer Engineering Society',
    company: 'Meerut Institute of Technology',
    period: '2023 - Present',
    description: 'Active contributor in the Computer Engineering Society, collaborating on tech projects, hackathons, and knowledge-sharing sessions.',
    color: 'purple',
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.Tech in Computer Science & Engineering',
    company: 'Meerut Institute of Technology, Meerut',
    period: '2022 - 2026',
    description: 'Pursuing B.Tech CSE with a focus on data structures, algorithms, object-oriented programming, and full-stack web development.',
    color: 'pink',
  },
  {
    type: 'achievement',
    icon: Award,
    title: '365 Days of Code',
    company: 'Self-Driven DSA Challenge',
    period: '2024 - 2025',
    description: 'Committed to solving one DSA problem every single day for a year — covering arrays, trees, graphs, dynamic programming, and competitive patterns in Java.',
    color: 'orange',
  },
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={containerRef} className="min-h-screen py-20 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Experience & Education
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"
            style={{
              scaleY: scrollYProgress,
              transformOrigin: 'top',
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  experience,
  index
}: {
  experience: typeof experiences[0];
  index: number;
}) {
  const Icon = experience.icon;
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      className="relative pl-20"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute left-6 top-0 w-6 h-6 rounded-full bg-${experience.color}-500 border-4 border-black`}
        style={{
          boxShadow: `0 0 20px var(--color-${experience.color}-500)`,
        }}
        whileHover={{ scale: 1.5 }}
        animate={{
          boxShadow: [
            `0 0 20px ${getColorValue(experience.color)}`,
            `0 0 40px ${getColorValue(experience.color)}`,
            `0 0 20px ${getColorValue(experience.color)}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        className={`p-6 rounded-2xl bg-gradient-to-br from-${experience.color}-900/30 to-${experience.color}-900/10 backdrop-blur-xl border border-${experience.color}-500/20 cursor-pointer`}
        whileHover={{ scale: 1.02, x: 10 }}
        onClick={() => setIsRevealed(!isRevealed)}
      >
        <div className="flex items-start gap-4">
          <motion.div
            className={`p-3 rounded-xl bg-${experience.color}-500/20`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className={`w-6 h-6 text-${experience.color}-400`} />
          </motion.div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                <p className={`text-${experience.color}-400 font-medium`}>{experience.company}</p>
              </div>
              <span className="text-gray-400 text-sm">{experience.period}</span>
            </div>

            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isRevealed ? 1 : 0.7 }}
            >
              {experience.description}
            </motion.p>

            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 text-sm text-gray-400"
              >
                ✨ Click other items to explore more of my journey!
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function getColorValue(color: string) {
  const colors: Record<string, string> = {
    cyan: '#06b6d4',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f59e0b',
  };
  return colors[color] || '#06b6d4';
}
