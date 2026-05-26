"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "Java", "WebSockets", "REST APIs"],
  },
  {
    title: "Base de datos",
    skills: ["PostgreSQL", "Supabase", "SQLite", "MySQL", "SQLAlchemy"],
  },
  {
    title: "Herramientas",
    skills: ["Git & GitHub", "Docker", "Vite", "Playwright", "Streamlit", "Vercel/Render"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-3 text-center">
          Habilidades
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-14 text-center">
          Stack <span className="gradient-text">tecnológico</span>
        </h3>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
      >
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.title}
            variants={item}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/20 transition-colors"
          >
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">
              {cat.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-zinc-400 border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
