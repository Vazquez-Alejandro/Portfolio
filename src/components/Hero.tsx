"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!line1 || !line2) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      line1.style.setProperty("--paint", "120%");
      line2.style.setProperty("--paint", "120%");
      return;
    }

    const phases = [
      { el: line1, start: 500, duration: 1300 },
      { el: line2, start: 1650, duration: 1300 },
    ];

    phases.forEach((phase) => phase.el.style.setProperty("--paint", "0%"));

    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      let active:
        | { el: HTMLSpanElement; progress: number }
        | undefined;

      for (const phase of phases) {
        const t = Math.min(
          Math.max((elapsed - phase.start) / phase.duration, 0),
          1
        );
        const eased = 1 - Math.pow(1 - t, 3);
        phase.el.style.setProperty("--paint", `${eased * 105}%`);

        if (t > 0 && t < 1) {
          active = { el: phase.el, progress: eased };
        }
      }

      if (active) {
        const r = active.el.getBoundingClientRect();
        window.dispatchEvent(
          new CustomEvent("swarm:writing", {
            detail: {
              active: true,
              x: r.left + r.width * active.progress,
              y: r.top + r.height / 2,
              h: r.height,
            },
          })
        );
      }

      const done = phases.every(
        (phase) => elapsed - phase.start >= phase.duration
      );

      if (!done) {
        raf = requestAnimationFrame(tick);
      } else {
        phases.forEach((phase) =>
          phase.el.style.setProperty("--paint", "120%")
        );
        window.dispatchEvent(
          new CustomEvent("swarm:writing", { detail: { active: false } })
        );
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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
            <span className="relative block">
              <span
                aria-hidden="true"
                className="block w-max whitespace-pre-line text-white/[0.07]"
              >
                Alejandro
                <br />
                Vázquez
              </span>

              <span aria-hidden="true" className="absolute inset-0 block">
                <span
                  ref={line1Ref}
                  className="paint-line name-lit name-glow block w-max"
                >
                  Alejandro
                </span>
                <span
                  ref={line2Ref}
                  className="paint-line name-lit name-glow block w-max"
                >
                  Vázquez
                </span>
              </span>

              <span className="sr-only">Alejandro Vázquez</span>
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
