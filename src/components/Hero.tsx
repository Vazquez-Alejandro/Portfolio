"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0b070a] px-6 py-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "url(/hero-av.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[140px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Disponible para proyectos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-8xl font-bold tracking-tighter leading-[0.9] mb-6"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
          >
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute inset-0 blur-2xl text-purple-500/40 select-none"
              >
                Alejandro
                <br />
                Vázquez
              </span>
              <span className="relative" style={{ color: "#c084fc" }}>
                Alejandro
                <br />
                Vázquez
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl text-zinc-300 max-w-md leading-relaxed mb-10"
          >
            Desarrollador de software. Aplicaciones web funcionales, seguras y con buena experiencia de usuario.
            <span className="text-zinc-500"> TypeScript, Python y el ecosistema React.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-purple-700 text-white font-medium hover:bg-purple-600 transition-colors"
            >
              Ver proyectos →
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Contactar →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-purple-900/20 border border-white/5"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url(/hero-av.webp)" }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
