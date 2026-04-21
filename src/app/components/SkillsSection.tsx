import { motion } from 'motion/react';
import { useState } from 'react';

const skills = [
  { name: 'Java', level: 90, color: '#E76F00' },
  { name: 'C', level: 85, color: '#A8B9CC' },
  { name: 'JavaScript', level: 88, color: '#F7DF1E' },
  { name: 'React', level: 85, color: '#61DAFB' },
  { name: 'Next.js', level: 80, color: '#FFFFFF' },
  { name: 'Node.js', level: 82, color: '#339933' },
  { name: 'HTML/CSS', level: 92, color: '#E34F26' },
  { name: 'Git', level: 85, color: '#F05032' },
];

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [shakeMode, setShakeMode] = useState(false);

  const handleDoubleClick = () => {
    setShakeMode(true);
    setTimeout(() => setShakeMode(false), 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative" onDoubleClick={handleDoubleClick}>
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </span>
        </motion.h2>

        <motion.p className="text-center text-gray-400 mb-12 text-sm">
          💡 Psst... try double-clicking anywhere in this section
        </motion.p>

        {/* Floating skill bubbles */}
        <div className="relative h-[600px]">
          {skills.map((skill, i) => {
            const angle = (i / skills.length) * Math.PI * 2;
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={skill.name}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  x: -50,
                  y: -50,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: x - 50,
                  y: y - 50,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                animate={shakeMode ? {
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  transition: { duration: 0.5 }
                } : {
                  y: y - 50,
                }}
                whileHover={{
                  scale: 1.3,
                  zIndex: 10,
                }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <motion.div
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
                    border: `2px solid ${skill.color}`,
                    boxShadow: hoveredSkill === skill.name
                      ? `0 0 30px ${skill.color}`
                      : `0 0 10px ${skill.color}80`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <div
                      className="font-bold text-sm md:text-base mb-1"
                      style={{ color: skill.color }}
                    >
                      {skill.name}
                    </div>
                    <motion.div
                      className="text-2xl md:text-3xl font-bold text-white"
                      animate={hoveredSkill === skill.name ? {
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.level}%
                    </motion.div>
                  </div>

                  {/* Orbital ring */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: skill.color }}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-cyan-400/30 flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className="text-white font-bold text-lg">Tech Stack</span>
          </motion.div>
        </div>

        {/* Alternative view - bars */}
        <motion.div
          className="mt-16 space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-white font-semibold">{skill.name}</span>
                <span className="text-gray-400">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                    boxShadow: `0 0 10px ${skill.color}`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
