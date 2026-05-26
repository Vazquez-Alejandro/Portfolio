"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

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
            Soy desarrollador de software graduado en diciembre de 2025.
            Mi enfoque está en construir aplicaciones web completas, desde
            el frontend hasta el backend, priorizando la seguridad, el
            rendimiento y la experiencia de usuario.
          </p>
          <p>
            Trabajo con TypeScript, Python, React, Next.js y FastAPI,
            y me gusta enfrentar desafíos que requieran pensar en
            soluciones creativas. Creo firmemente en el código limpio,
            la documentación clara y el aprendizaje continuo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 shrink-0">
              <GraduationCap size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">
                Desarrollador de Software
              </p>
              <p className="text-xs text-zinc-500">Graduado Dic 2025</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
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
