"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Database, Wrench } from "lucide-react";

const categories = [
  {
    title: "Frontend",
    icon: Monitor,
    span: "md:col-span-7",
    accent: true,
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML/CSS",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    span: "md:col-span-5",
    accent: false,
    skills: ["Python", "FastAPI", "Node.js", "Java", "WebSockets", "REST APIs"],
  },
  {
    title: "Bases de datos",
    icon: Database,
    span: "md:col-span-5",
    accent: false,
    skills: ["PostgreSQL", "Supabase", "SQLite", "MySQL", "SQLAlchemy"],
  },
  {
    title: "Herramientas",
    icon: Wrench,
    span: "md:col-span-7",
    accent: false,
    skills: [
      "Git & GitHub",
      "Docker",
      "Vite",
      "Playwright",
      "Streamlit",
      "Vercel/Render",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" data-swarm="Capacidades" className="section">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mono text-ciruela mb-4 tracking-widest uppercase">
            Capacidades
          </p>
          <h2 className="h2 max-w-2xl">
            Lo que traigo
            <br />
            <span className="text-gris">a un equipo.</span>
          </h2>
        </motion.div>

        <div className="bento">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`${cat.span} col-span-12 rounded-[28px] p-7 sm:p-9 flex flex-col min-h-[260px] relative overflow-hidden ${
                cat.accent ? "bg-odoo" : "bg-surface"
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <cat.icon
                  size={20}
                  className={cat.accent ? "text-white/80" : "text-ciruela"}
                />
                <span className="mono text-white/40">0{i + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto pt-6">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full px-3 py-1.5 text-xs font-mono ${
                      cat.accent
                        ? "bg-black/20 text-white/80"
                        : "bg-white/5 text-gris"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
