"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  logo: string;
  tags: string[];
  live: string | null;
  liveLabel?: string;
};

const projects: Project[] = [
  {
    title: "Blickapp",
    description:
      "Sistema de gestión gastronómica para cadenas de locales. POS propio, ventas y tickets, inventarios con recetas y CMV, mermas, liquidación de mano de obra con F.931 y Estado de Resultados de 19 líneas.",
    logo: "/logos/blickapp.png",
    tags: ["Go", "React", "TypeScript", "PostgreSQL", "Tailwind"],
    live: "https://blickapp.vercel.app",
  },
  {
    title: "Nivela",
    description:
      "Software de gestión de auditorías, controles y planes de acción. Dashboard web y app móvil con Capacitor, detección automática de KO, evidencia multimedia, modo offline y reportes PDF.",
    logo: "/logos/nivela.png",
    tags: ["Python", "FastAPI", "PostgreSQL", "React", "Capacitor"],
    live: "https://getnivela.vercel.app",
  },
  {
    title: "Revendr",
    description:
      "Plataforma de automatización de ventas. Scraping de leads, demos personalizadas con IA, campañas multicanal (WhatsApp + Email), cobros con Stripe/Mercado Pago y pipeline en tiempo real.",
    logo: "/logos/revendr.png",
    tags: ["React", "Firebase", "Node.js", "WhatsApp API", "Stripe"],
    live: "https://revendr.com.ar",
  },
  {
    title: "PriceAnchor",
    description:
      "Monitoreo de precios para marcas. Detección automática de violaciones MAP, alertas en tiempo real por WhatsApp/Telegram, reportes PDF, captura de evidencia y dashboard con KPIs.",
    logo: "/logos/priceanchor.png",
    tags: ["React", "Vite", "Node.js", "Playwright", "Telegram"],
    live: "https://priceanchor.vercel.app",
  },
  {
    title: "TraceLess",
    description:
      "Facturación electrónica por WhatsApp para monotributistas y pequeños negocios. El bot genera la factura con CAE de ARCA al instante, con link de pago y recordatorios de cobranza automáticos.",
    logo: "/logos/traceless.png",
    tags: ["Python", "FastAPI", "React", "Supabase", "MercadoPago"],
    live: "https://www.traceless.com.ar",
    liveLabel: "traceless.com.ar",
  },
  {
    title: "Howlify",
    description:
      "Cazador automático de vuelos baratos, hoteles y paquetes para Latinoamérica. Motor de vigilancia 24/7 con Duffel API, alertas por Telegram/WhatsApp/Email, historial y predicción de precios.",
    logo: "/logos/howlify.png",
    tags: ["Python", "FastAPI", "Celery", "Supabase", "React"],
    live: "https://howlify.vercel.app",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" data-swarm="Proyectos" className="section overflow-x-clip">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <p className="mono text-ciruela mb-4 tracking-widest uppercase">
              Proyectos
            </p>
            <h2 className="h2 max-w-2xl">
              Proyectos reales.
              <br />
              <span className="text-gris">Con usuarios y decisiones difíciles.</span>
            </h2>
          </div>
          <p className="mono text-gris">06 / 06</p>
        </motion.div>
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="snap-center shrink-0 w-[86vw] sm:w-[520px] rounded-[28px] bg-surface border border-white/5 p-7 flex flex-col min-h-[420px]"
          >
            <div className="flex items-start justify-between mb-8">
              <Image
                src={project.logo}
                alt={project.title}
                width={48}
                height={48}
                unoptimized={project.logo.endsWith(".svg")}
                className="w-12 h-12 object-contain"
              />
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/10 text-gris hover:text-text hover:border-white/30 transition-colors"
                  aria-label={`Ver ${project.title}`}
                >
                  <ArrowUpRight size={18} />
                </a>
              )}
            </div>

            <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
            <p className="text-sm text-gris leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mono text-ciruela hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                  {project.liveLabel ?? "Ver proyecto"}
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
