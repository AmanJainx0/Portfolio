import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Github, Linkedin, Send, Sparkles } from 'lucide-react';

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confettiMode, setConfettiMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setConfettiMode(true);

    setTimeout(() => {
      alert('🎉 Message sent successfully! (This is a demo)');
      setIsSubmitting(false);
      setConfettiMode(false);
      setFormState({ name: '', email: '', message: '' });
    }, 2000);
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/AmanJainx0', color: '#333' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aman-jain-861868326', color: '#0A66C2' },
    { icon: Mail, label: 'Email', href: 'mailto:amanjainx0@gmail.com', color: '#EA4335' },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Confetti effect */}
      {confettiMode && (
        <>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, y: 0 }}
              animate={{
                scale: [0, 1, 1, 0],
                y: [0, -100, -200, -300],
                x: [(Math.random() - 0.5) * 200],
                rotate: [0, 360],
              }}
              transition={{ duration: 2, delay: i * 0.02 }}
            />
          ))}
        </>
      )}

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Let's Connect
          </span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Got a project in mind? Want to collaborate? Or just want to say hi?
          Drop me a message and I'll get back to you as soon as possible!
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <motion.input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white focus:border-cyan-500 focus:outline-none backdrop-blur-xl transition-all"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <motion.input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white focus:border-cyan-500 focus:outline-none backdrop-blur-xl transition-all"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <motion.textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/20 text-white focus:border-cyan-500 focus:outline-none backdrop-blur-xl transition-all resize-none"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <motion.span
                  animate={isSubmitting ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: 'linear' }}
                >
                  {isSubmitting ? <Sparkles className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                </motion.span>
                {isSubmitting ? 'Sending...' : 'Send Message'}

                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Find me on</h3>

            <div className="space-y-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <motion.div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${social.color}20` }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <social.icon className="w-6 h-6" style={{ color: social.color }} />
                  </motion.div>
                  <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                    {social.label}
                  </span>
                  <motion.div
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-xl border border-cyan-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-gray-300 text-center">
                "Discipline beats motivation, every single day. One problem a day keeps mediocrity away."
              </p>
              <p className="text-cyan-400 text-center mt-2 font-semibold">— Aman Jain</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
