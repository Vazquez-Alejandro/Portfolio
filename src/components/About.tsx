"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-3">
          Sobre mí
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-8">
          Transformando ideas en{" "}
          <span className="gradient-text">código funcional</span>
        </h3>

        <div className="space-y-5 text-zinc-400 text-base sm:text-lg leading-relaxed">
          <p>
            Soy desarrollador de software con formación en desarrollo
            full-stack. He trabajado con Java, actualmente me especializo
            en React.js y próximamente comienzo a estudiar desarrollo
            de videojuegos.
          </p>
          <p>
            Trabajo con TypeScript, Python, React, Next.js y FastAPI,
            y me gusta enfrentar desafíos que requieran pensar en
            soluciones creativas. Creo firmemente en el código limpio,
            la documentación clara y el aprendizaje continuo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 shrink-0">
              <GraduationCap size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">
                Desarrollador de Software
              </p>
              <p className="text-xs text-zinc-500">IFTS n° 16</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 shrink-0">
              <GraduationCap size={18} className="text-pink-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Cursos</p>
              <ul className="text-xs text-zinc-500 mt-1 space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                  Java (2 stacks)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  React.js (actual)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-pink-400 shrink-0" />
                  Videojuegos (próximamente)
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shrink-0">
              <MapPin size={18} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Argentina</p>
              <p className="text-xs text-zinc-500">Disponible para remoto</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
