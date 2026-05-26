"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

export default function Contact() {
  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-3">
          Contacto
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-6">
          ¿Tenés un proyecto en mente?
        </h3>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
          Estoy abierto a oportunidades laborales y proyectos freelance.
          No dudes en escribirme.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="mailto:vazquezale82@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <Mail size={16} />
            Enviar email
          </a>
          <a
            href="https://github.com/Vazquez-Alejandro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 transition-all duration-300"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/alejandrovazquez82"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 transition-all duration-300"
          >
            <LinkedinIcon />
            LinkedIn
          </a>
        </div>

        <div className="max-w-md mx-auto">
          <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Mensaje"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm"
            >
              <Send size={15} />
              Enviar mensaje
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
