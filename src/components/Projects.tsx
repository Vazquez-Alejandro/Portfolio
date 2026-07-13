"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Home,
  Shield,
  ShoppingCart,
  Users,
  Calendar,
} from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const projects = [
  {
    title: "Inmoxil",
    description:
      "SaaS completo para inmobiliarias. Importación de propiedades desde múltiples portales, generación de flyers y anuncios, contratos con firma digital, facturación con Mercado Pago y calendario de visitas.",
    icon: Home,
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Mercado Pago",
      "Scraping",
      "Tailwind CSS",
    ],
    github: null,
    live: "https://inmoxil.vercel.app",
    color: "from-blue-500 to-cyan-500",
    features: [
      "Multi-portal scraping",
      "Generador de ads",
      "Contratos digitales",
      "Facturación MP",
      "Calendario de visitas",
    ],
  },
  {
    title: "Revendr",
    description:
      "Plataforma de automatización de ventas. Scraping de leads, demos personalizadas con IA, campañas multicanal (WhatsApp + Email), cobros con Stripe/Mercado Pago y pipeline de ventas en tiempo real.",
    icon: Users,
    tags: [
      "React",
      "Firebase",
      "Node.js",
      "WhatsApp API",
      "Stripe",
      "Mercado Pago",
    ],
    github: null,
    live: null,
    color: "from-violet-500 to-purple-600",
    features: [
      "Scraping de leads",
      "Demos con IA",
      "Campañas WhatsApp",
      "Cobros integrados",
      "Pipeline de ventas",
    ],
  },
  {
    title: "PriceAnchor",
    description:
      "Monitoreo de precios para marcas. Detección automática de violaciones MAP, alertas en tiempo real por WhatsApp/Telegram, reportes PDF, captura de evidencia y dashboard con KPIs.",
    icon: ShoppingCart,
    tags: [
      "React",
      "Vite",
      "Node.js",
      "Playwright",
      "WhatsApp API",
      "Telegram",
    ],
    github: null,
    live: null,
    color: "from-amber-500 to-orange-600",
    features: [
      "Monitoreo 24/7",
      "Alertas multicanal",
      "Captura de evidencia",
      "Reportes PDF",
      "Multi-tienda",
    ],
  },
  {
    title: "TraceLess",
    description:
      "Herramienta de protección de datos personales bajo la Ley 25.326 argentina. Monitoreo de filtraciones, generación de cartas Habeas Data y dashboard de cumplimiento normativo.",
    icon: Shield,
    tags: [
      "Next.js",
      "TypeScript",
      "Neon",
      "Clerk",
      "Resend",
      "LemonSqueezy",
    ],
    github: null,
    live: "https://www.traceless.com.ar",
    color: "from-emerald-500 to-teal-600",
    features: [
      "Monitoreo de breaches",
      "Cartas Habeas Data",
      "Ley 25.326",
      "Dashboard compliance",
      "Planes premium",
    ],
  },
  {
    title: "Turnos-Online",
    description:
      "Sistema de turnos para negocios de servicios. Reserva online, gestión de profesionales, disponibilidad por servicio, recordatorios por WhatsApp y panel de administración.",
    icon: Calendar,
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Vercel",
    ],
    github: null,
    live: "https://turnos-online-alpha.vercel.app",
    color: "from-rose-500 to-pink-600",
    features: [
      "Reserva online",
      "Gestión de profesionales",
      "Disponibilidad por servicio",
      "Recordatorios WhatsApp",
      "Panel admin",
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
