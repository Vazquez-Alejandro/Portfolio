"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2 } from "lucide-react";

const words =
  "Trabajo donde el código se encuentra con las personas. Desarrollo software que resuelve problemas reales, no solo pantallas bonitas.".split(
    " "
  );

export default function About() {
  return (
    <section id="about" data-swarm="Sobre mí" className="section">
      <div className="wrap">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mono text-ciruela mb-8 tracking-widest uppercase"
        >
          Sobre mí
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.02 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl mb-14"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={{
                hidden: { opacity: 0.16 },
                show: { opacity: 1, transition: { duration: 0.5 } },
              }}
              className={i > 7 && i < 11 ? "text-ciruela" : ""}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="body-l max-w-2xl mb-14"
        >
          Soy desarrollador de software con formación en desarrollo full-stack.
          He trabajado con Java y actualmente me especializo en React.js y
          desarrollo de videojuegos. Creo firmemente en el código limpio, la
          documentación clara y el aprendizaje continuo.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bento-tile flex items-start gap-4"
          >
            <div className="p-2 rounded-xl bg-odoo/20 border border-odoo/30">
              <GraduationCap size={18} className="text-ciruela" />
            </div>
            <div>
              <p className="font-medium">Desarrollador de Software</p>
              <p className="mono text-gris mt-1">IFTS n° 16</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-tile flex items-start gap-4"
          >
            <div className="p-2 rounded-xl bg-odoo/20 border border-odoo/30">
              <Code2 size={18} className="text-ciruela" />
            </div>
            <div>
              <p className="font-medium">Cursos</p>
              <ul className="mono text-gris mt-1 space-y-1">
                <li>Java (2 stacks)</li>
                <li>React.js</li>
                <li>Videojuegos (C#)</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bento-tile flex items-start gap-4"
          >
            <div className="p-2 rounded-xl bg-odoo/20 border border-odoo/30">
              <MapPin size={18} className="text-ciruela" />
            </div>
            <div>
              <p className="font-medium">Argentina</p>
              <p className="mono text-gris mt-1">Disponible para remoto</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
