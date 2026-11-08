"use client";

import { motion } from "framer-motion";

const items = [
  {
    when: "Formación",
    title: "Desarrollador de Software",
    org: "IFTS n° 16",
    text: "Formación full-stack con base en programación, bases de datos y desarrollo de aplicaciones.",
  },
  {
    when: "Curso",
    title: "Java (2 stacks)",
    org: "Formación complementaria",
    text: "Programación orientada a objetos, backend y desarrollo de aplicaciones con Java.",
  },
  {
    when: "Curso",
    title: "React.js",
    org: "Formación complementaria",
    text: "Desarrollo de interfaces modernas, componentes, estado y consumo de APIs.",
  },
  {
    when: "Curso completado",
    title: "Desarrollo de Videojuegos",
    org: "Unity + C#",
    text: "Diseño y programación de videojuegos con C#, lógica de gameplay y desarrollo en Unity.",
  },
  {
    when: "Hoy",
    title: "Productos y proyectos reales",
    org: "Freelance / productos propios",
    text: "Construyo y mantengo aplicaciones web completas, desde el backend hasta la interfaz y el deploy.",
  },
];

export default function Timeline() {
  return (
    <section id="experiencia" data-swarm="Trayectoria" className="section">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <p className="mono text-ciruela mb-4 tracking-widest uppercase">
              Trayectoria
            </p>
            <h2 className="h2">
              Mi recorrido,
              <br />
              <span className="text-gris">como un repositorio.</span>
            </h2>
            <p className="body-l mt-6 max-w-md">
              Formación, cursos y proyectos que fueron construyendo el stack con
              el que trabajo hoy.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[5px] top-2 bottom-2 w-px timeline-line" />
            <ul className="space-y-10">
              {items.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative pl-9"
                >
                  <span className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full bg-ciruela shadow-[0_0_16px_rgba(208,139,189,0.8)]" />
                  <p className="mono text-gris mb-2">{item.when}</p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gris mt-1">{item.org}</p>
                  <p className="text-sm text-gris mt-3 max-w-lg leading-relaxed">
                    {item.text}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
