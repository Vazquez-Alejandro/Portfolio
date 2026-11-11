"use client";

import { useState, type FormEvent } from "react";
import { contact, projects, skillGroups, timeline } from "../data";

type Entry = { cmd: string; out: string[] };

const HELP = [
  "Comandos disponibles:",
  "  about      quién soy",
  "  projects   lista de proyectos",
  "  timeline   formación y experiencia",
  "  skills     stack técnico",
  "  contact    cómo escribirme",
  "  whoami     usuario actual",
  "  date       fecha y hora",
  "  clear      limpiar la pantalla",
];

function run(input: string): { out: string[]; clear?: boolean } {
  const [cmd = "", ...args] = input.trim().toLowerCase().split(/\s+/);
  switch (cmd) {
    case "":
      return { out: [] };
    case "help":
      return { out: HELP };
    case "about":
      return {
        out: [
          "Alejandro Vázquez · Desarrollador de Software (full-stack)",
          "IFTS n° 16 · Buenos Aires, Argentina · remoto",
        ],
      };
    case "projects":
      return { out: projects.map((p) => `  ${p.title.padEnd(12)} ${p.tags.slice(0, 3).join(", ")}`) };
    case "timeline":
      return { out: timeline.map((t) => `  ${t.when.padEnd(16)} ${t.title}`) };
    case "skills":
      return { out: skillGroups.map((g) => `  ${g.title}: ${g.skills.join(", ")}`) };
    case "contact":
      return {
        out: [
          `  email:    ${contact.email}`,
          `  github:   ${contact.github}`,
          `  whatsapp: ${contact.whatsapp}`,
        ],
      };
    case "whoami":
      return { out: ["visitante"] };
    case "date":
      return { out: [new Date().toLocaleString("es-AR")] };
    case "clear":
      return { out: [], clear: true };
    case "sudo":
      return args.join(" ") === "hire-me"
        ? { out: [`[sudo] acceso concedido. Escribime a ${contact.email}`] }
        : { out: ["sudo: permiso denegado"] };
    default:
      return { out: [`comando no encontrado: ${cmd}. Probá 'help'.`] };
  }
}

export default function TerminalApp() {
  const [entries, setEntries] = useState<Entry[]>([
    { cmd: "", out: ["Terminal de Alejandro. Escribí 'help' para empezar."] },
  ]);
  const [input, setInput] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = run(input);
    if (result.clear) {
      setEntries([]);
    } else {
      setEntries((prev) => [...prev, { cmd: input, out: result.out }]);
    }
    setInput("");
  };

  return (
    <div className="mono flex h-full min-h-[220px] flex-col text-xs">
      <div className="flex-1 space-y-2 overflow-auto">
        {entries.map((entry, i) => (
          <div key={i}>
            {entry.cmd && (
              <p className="text-ciruela">
                <span className="text-white/60">visitante@kfolio:~$</span> {entry.cmd}
              </p>
            )}
            {entry.out.map((line, j) => (
              <p key={j} className="whitespace-pre-wrap break-all text-text/90">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
        <span className="text-white/60">visitante@kfolio:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Comando"
          className="min-w-0 flex-1 bg-transparent text-text outline-none"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
