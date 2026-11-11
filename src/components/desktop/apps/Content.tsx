"use client";

import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { contact, projects, skillGroups, timeline } from "../data";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono mb-3 text-[11px] uppercase tracking-widest text-ciruela">
      {children}
    </p>
  );
}

export function AboutApp() {
  return (
    <div className="space-y-4">
      <Heading>Sobre mí</Heading>
      <p className="text-base leading-relaxed text-text">
        Trabajo donde el código se encuentra con las personas. Desarrollo
        software que resuelve problemas reales, no solo pantallas bonitas.
      </p>
      <p className="leading-relaxed">
        Soy desarrollador de software con formación en desarrollo full-stack. He
        trabajado con Java y actualmente me especializo en React.js y desarrollo
        de videojuegos. Creo firmemente en el código limpio, la documentación
        clara y el aprendizaje continuo.
      </p>
      <ul className="mono space-y-1 border-t border-white/10 pt-3 text-xs">
        <li>&gt; FORMACIÓN: IFTS n° 16 · Desarrollador de Software</li>
        <li>&gt; CURSOS: Java (2 stacks) · React.js · Videojuegos (C#)</li>
        <li>&gt; UBICACIÓN: Buenos Aires, Argentina</li>
        <li>&gt; DISPONIBILIDAD: remoto</li>
      </ul>
    </div>
  );
}

export function ProjectsFolder({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <div>
      <Heading>Proyectos · {projects.length} archivos</Heading>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {projects.map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => onOpen(project.slug)}
            className="flex flex-col items-center gap-2 rounded-md p-2 text-center hover:bg-white/10 focus-visible:bg-white/10"
          >
            <span className="grid h-14 w-14 place-items-center rounded-md border border-white/10 bg-[#1b1421]">
              <Image
                src={project.logo}
                alt=""
                width={36}
                height={36}
                unoptimized={project.logo.endsWith(".svg")}
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="mono text-[11px] text-text">{project.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectApp({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <p>Archivo no encontrado.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-[#1b1421]">
          <Image
            src={project.logo}
            alt=""
            width={36}
            height={36}
            unoptimized={project.logo.endsWith(".svg")}
            className="h-9 w-9 object-contain"
          />
        </span>
        <h3 className="text-xl font-semibold text-text">{project.title}</h3>
      </div>
      <p className="leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="mono rounded-sm bg-white/5 px-2 py-1 text-[11px] text-gris">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="mono inline-flex items-center gap-2 text-ciruela hover:text-white"
      >
        {project.liveLabel ?? "Abrir proyecto"}
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

export function TimelineApp() {
  return (
    <div>
      <Heading>Trayectoria</Heading>
      <ul className="space-y-4 border-l border-ciruela/40 pl-4">
        {timeline.map((item) => (
          <li key={item.title} className="relative">
            <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-ciruela shadow-[0_0_10px_rgba(208,139,189,0.8)]" />
            <p className="mono text-[11px] text-gris">{item.when}</p>
            <p className="font-semibold text-text">{item.title}</p>
            <p className="text-gris">{item.org}</p>
            <p className="mt-1 text-xs leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsApp() {
  return (
    <div className="space-y-4">
      <Heading>Capacidades</Heading>
      {skillGroups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 font-semibold text-text">{group.title}</p>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span key={skill} className="mono rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-gris">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContactApp() {
  return (
    <div className="space-y-4">
      <Heading>Contacto</Heading>
      <p className="leading-relaxed">
        Si tenés un proyecto, una idea o un proceso que no cierra, escribime.
      </p>
      <div className="flex flex-col gap-2">
        <a
          href={`mailto:${contact.email}`}
          className="mono flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-text hover:border-ciruela/60"
        >
          <Mail size={14} className="text-ciruela" />
          {contact.email}
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mono flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-text hover:border-ciruela/60"
        >
          <ArrowUpRight size={14} className="text-ciruela" />
          github.com/Vazquez-Alejandro
        </a>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mono flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-text hover:border-ciruela/60"
        >
          <ArrowUpRight size={14} className="text-ciruela" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
