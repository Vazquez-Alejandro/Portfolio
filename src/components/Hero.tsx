"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-20">
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-odoo/30 blur-[160px]" />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-odoo/20 blur-[140px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 items-center">
        <div>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mono text-gris mb-8 tracking-widest uppercase"
          >
            Software Developer · Buenos Aires, Argentina
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative text-[18vw] sm:text-[13vw] lg:text-[9rem] font-bold tracking-tighter leading-[0.86] mb-8"
          >
            <span className="relative block">
              <span aria-hidden="true" className="name-halo select-none">
                Alejandro
                <br />
                Vázquez
              </span>
              <span className="name-lit relative">
                Alejandro
                <br />
                Vázquez
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.25 }}
            className="body-l max-w-lg mb-10"
          >
            Desarrollador de software con formación full-stack. Construyo
            aplicaciones web funcionales y seguras con{" "}
            <strong>TypeScript, Python y el ecosistema React</strong>, y
            desarrollo de videojuegos con C#.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos →
            </a>
            <a href="#contacto" className="btn">
              Hablemos →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-surface border border-white/5"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: "url(/hero-av.webp)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 mono text-gris">
            AVAILABLE FOR REMOTE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
