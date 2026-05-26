"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Lock,
  MessageSquare,
  Search,
  ShoppingCart,
} from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const projects = [
  {
    title: "Decidr",
    description:
      "App de mensajería instantánea con cifrado E2EE (Curve25519 + XSalsa20-Poly1305), llamadas de voz/video vía WebRTC, juegos integrados y pagos con Mercado Pago. Incluye WebSockets en tiempo real, TURN server propio, notificaciones push y modo oscuro.",
    icon: MessageSquare,
    tags: [
      "Python",
      "FastAPI",
      "WebRTC",
      "WebSockets",
      "JavaScript",
      "Tailwind CSS",
      "SQLite/PostgreSQL",
      "Mercado Pago",
    ],
    github: "https://github.com/Vazquez-Alejandro/decidr-app",
    live: null,
    color: "from-purple-600 to-pink-500",
    features: [
      "Cifrado extremo a extremo",
      "Llamadas WebRTC",
      "Mensajería en tiempo real",
      "Pagos integrados",
      "Juegos en sala",
    ],
  },
  {
    title: "Howlify",
    description:
      "Motor de monitoreo de precios y notificaciones. Combina scraping avanzado con alertas multicanal (Telegram, WhatsApp) para detectar ofertas. Incluye búsqueda de vuelos con APIs reales y análisis de reputación de vendedores.",
    icon: Search,
    tags: [
      "Python",
      "Streamlit",
      "Supabase",
      "PostgreSQL",
      "Playwright",
      "Docker",
      "Render",
    ],
    github: "https://github.com/Vazquez-Alejandro/Howlify",
    live: "https://howlify.onrender.com",
    features: [
      "Scraping híbrido ML",
      "Alertas multicanal",
      "Búsqueda de vuelos",
      "Anti-bot bypass",
      "Despliegue cloud",
    ],
  },
  {
    title: "Spidegram",
    description:
      "Red social construida con Next.js y Supabase. Gestiona autenticación, publicaciones, interacciones en tiempo real y almacenamiento de medios. Arquitectura moderna con App Router y PostgreSQL con Row Level Security.",
    icon: Lock,
    tags: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    github: "https://github.com/Vazquez-Alejandro/spidegram",
    live: null,
    color: "from-emerald-500 to-teal-600",
    features: [
      "Auth con RLS",
      "Tiempo real",
      "App Router",
      "Medios y archivos",
      "UI responsive",
    ],
  },
  {
    title: "RetroGames",
    description:
      "E-commerce de videojuegos retro, consolas y accesorios. Catálogo completo, carrito de compras y checkout funcional. Construido con React + Vite y deployado en Vercel.",
    icon: ShoppingCart,
    tags: ["JavaScript", "React", "Vite", "CSS", "Vercel"],
    github: "https://github.com/Vazquez-Alejandro/RetroGames",
    live: "https://retro-games-five.vercel.app",
    color: "from-orange-500 to-red-600",
    features: [
      "Catálogo de productos",
      "Carrito de compras",
      "Responsive design",
      "Deployado en Vercel",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-3 text-center">
          Proyectos
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-14 text-center">
          Trabajos <span className="gradient-text">destacados</span>
        </h3>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={item}
            className="group relative"
          >
            <div className="relative h-full p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
              <div className="h-full rounded-2xl bg-[#0a0f1e] p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${project.color} shadow-lg`}
                  >
                    <project.icon size={22} className="text-white" />
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-all"
                        aria-label={`GitHub - ${project.title}`}
                      >
                        <GithubIcon />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-all"
                        aria-label={`Live - ${project.title}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-zinc-100 mb-3">
                  {project.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {project.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-xs text-zinc-500 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
