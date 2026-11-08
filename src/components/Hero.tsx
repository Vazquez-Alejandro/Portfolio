"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FULL_NAME = "Alejandro\nVázquez";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const caretRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      const id = window.setTimeout(() => {
        setTyped(FULL_NAME);
        setDone(true);
      }, 0);
      return () => window.clearTimeout(id);
    }

    let charIndex = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const start = window.setTimeout(() => {
      interval = setInterval(() => {
        charIndex += 1;
        const next = FULL_NAME.slice(0, charIndex);
        setTyped(next);

        if (charIndex >= FULL_NAME.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, 105);
    }, 700);

    return () => {
      window.clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (done) {
      window.dispatchEvent(
        new CustomEvent("swarm:writing", { detail: { active: false } })
      );
      return;
    }

    const caret = caretRef.current;
    if (!caret) return;

    const rect = caret.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent("swarm:writing", {
        detail: {
          active: true,
          x: rect.left,
          y: rect.top + rect.height / 2,
        },
      })
    );
  }, [typed, done]);

  return (
    <section
      data-swarm="Hero"
      className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-20"
    >
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
            <span className="invisible select-none whitespace-pre-line" aria-hidden="true">
              {FULL_NAME}
            </span>
            <span className="absolute inset-0 block">
              <span
                aria-hidden="true"
                className="name-halo absolute inset-0 whitespace-pre-line select-none"
              >
                {typed}
              </span>
              <span className="name-lit relative whitespace-pre-line">
                {typed}
                {!done && <span ref={caretRef} className="caret" />}
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
