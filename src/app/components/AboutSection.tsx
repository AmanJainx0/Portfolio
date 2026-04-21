import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Code2, Zap, Sparkles, Coffee } from 'lucide-react';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const [secretClicks, setSecretClicks] = useState(0);

  const handleSecretClick = () => {
    const newClicks = secretClicks + 1;
    setSecretClicks(newClicks);

    if (newClicks === 5) {
      alert('🎉 Easter Egg Found! You discovered the secret developer mode! 🚀');
      setSecretClicks(0);
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        style={{ opacity, scale }}
      >
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-12 text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive card */}
          <motion.div
            className="relative"
            style={{ y }}
          >
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/20 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Glowing orb that follows mouse */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  onClick={handleSecretClick}
                >
                  <Code2 className="w-16 h-16 text-purple-400" />
                </motion.div>

                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  I'm Aman Jain — a technology enthusiast and B.Tech Computer Science student at
                  Meerut Institute of Technology. I craft user-friendly applications through logical
                  thinking, hands-on experience with Java, C, and modern web technologies.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Currently serving as Campus Mantri at GeeksforGeeks and an active member of the
                  Computer Engineering Society at MIT Meerut.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed">
                  My philosophy is simple: <span className="text-cyan-400 font-semibold">Discipline beats motivation, every single day.</span>
                </p>

                {secretClicks > 0 && secretClicks < 5 && (
                  <motion.p
                    className="text-cyan-400 text-sm mt-4 opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                  >
                    {5 - secretClicks} more clicks to unlock something special...
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap, title: 'Fast Learner', desc: 'Always exploring new tech', color: 'cyan' },
              { icon: Sparkles, title: 'Creative Thinker', desc: 'Building with purpose', color: 'purple' },
              { icon: Code2, title: 'DSA Enthusiast', desc: '365 Days of Code', color: 'pink' },
              { icon: Coffee, title: 'Disciplined', desc: 'Consistency over talent', color: 'orange' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-2xl bg-gradient-to-br from-${stat.color}-900/30 to-${stat.color}-900/10 backdrop-blur-xl border border-${stat.color}-500/20 cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotate: Math.random() > 0.5 ? 2 : -2,
                  transition: { type: 'spring', stiffness: 300 }
                }}
              >
                <stat.icon className={`w-8 h-8 text-${stat.color}-400 mb-3`} />
                <h3 className="font-semibold text-white mb-1">{stat.title}</h3>
                <p className="text-sm text-gray-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
