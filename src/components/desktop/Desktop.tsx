"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Bomb,
  Calculator,
  Camera,
  Cpu,
  Folder,
  GraduationCap,
  Mail,
  Terminal as TerminalIcon,
  User,
  type LucideIcon,
} from "lucide-react";
import Window from "./Window";
import { projects } from "./data";
import { AboutApp, ContactApp, ProjectApp, ProjectsFolder, SkillsApp, TimelineApp } from "./apps/Content";
import TerminalApp from "./apps/Terminal";
import CameraApp from "./apps/Camera";
import CalculatorApp from "./apps/Calculator";
import MinesweeperApp from "./apps/Minesweeper";

type AppKey =
  | "about"
  | "projects"
  | "project"
  | "timeline"
  | "skills"
  | "contact"
  | "terminal"
  | "camera"
  | "calc"
  | "mines";

type AppConfig = { title: string; w: number; h: number; icon: LucideIcon };

const APPS: Record<AppKey, AppConfig> = {
  about: { title: "Sobre mí", w: 500, h: 400, icon: User },
  projects: { title: "Proyectos", w: 460, h: 340, icon: Folder },
  project: { title: "Proyecto", w: 440, h: 380, icon: Folder },
  timeline: { title: "Trayectoria", w: 440, h: 420, icon: GraduationCap },
  skills: { title: "Capacidades", w: 460, h: 400, icon: Cpu },
  contact: { title: "Contacto", w: 380, h: 300, icon: Mail },
  terminal: { title: "Terminal", w: 520, h: 340, icon: TerminalIcon },
  camera: { title: "Cámara", w: 420, h: 380, icon: Camera },
  calc: { title: "Calculadora", w: 250, h: 360, icon: Calculator },
  mines: { title: "Buscaminas", w: 300, h: 390, icon: Bomb },
};

const ICONS: { app: AppKey; label: string; icon: LucideIcon }[] = [
  { app: "about", label: "Sobre mí", icon: User },
  { app: "projects", label: "Proyectos", icon: Folder },
  { app: "timeline", label: "Trayectoria", icon: GraduationCap },
  { app: "skills", label: "Capacidades", icon: Cpu },
  { app: "contact", label: "Contacto", icon: Mail },
  { app: "terminal", label: "Terminal", icon: TerminalIcon },
  { app: "camera", label: "Cámara", icon: Camera },
  { app: "calc", label: "Calculadora", icon: Calculator },
  { app: "mines", label: "Buscaminas", icon: Bomb },
];

type WinState = {
  id: string;
  app: AppKey;
  param?: string;
  title: string;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function subscribeDesktop(callback: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true
  );
}

function Clock() {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }));
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="mono shrink-0 text-[11px] tabular-nums text-[#3dff7a]/80">{now || "--:--"}</span>;
}

export default function Desktop() {
  const screenRef = useRef<HTMLDivElement>(null);
  const zRef = useRef(10);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const [wins, setWins] = useState<WinState[]>([]);
  const isDesktop = useIsDesktop();

  const focus = useCallback((id: string) => {
    setWins((prev) => {
      zRef.current += 1;
      const z = zRef.current;
      return prev.map((w) => (w.id === id ? { ...w, z } : w));
    });
  }, []);

  const openApp = useCallback((app: AppKey, param?: string) => {
    const id = param ? `${app}:${param}` : app;
    setWins((prev) => {
      zRef.current += 1;
      const z = zRef.current;
      if (prev.some((w) => w.id === id)) {
        return prev.map((w) => (w.id === id ? { ...w, z } : w));
      }
      const rect = screenRef.current?.getBoundingClientRect();
      const sw = rect?.width ?? 900;
      const sh = rect?.height ?? 600;
      const cfg = APPS[app];
      const w = Math.min(cfg.w, sw - 24);
      const h = Math.min(cfg.h, sh - 80);
      const offset = (prev.length % 6) * 26;
      const title = param ? (projects.find((p) => p.slug === param)?.title ?? cfg.title) : cfg.title;
      return [
        ...prev,
        {
          id,
          app,
          param,
          title,
          x: clamp((sw - w) / 2 + offset - 40, 8, sw - w - 8),
          y: clamp(16 + offset, 8, sh - h - 48),
          z,
          w,
          h,
        },
      ];
    });
  }, []);

  const close = useCallback((id: string) => {
    setWins((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const startDrag = (win: WinState, e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = screenRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = {
      id: win.id,
      dx: e.clientX - rect.left - win.x,
      dy: e.clientY - rect.top - win.y,
    };
    focus(win.id);
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = dragRef.current;
      const rect = screenRef.current?.getBoundingClientRect();
      if (!d || !rect) return;
      const nx = e.clientX - rect.left - d.dx;
      const ny = e.clientY - rect.top - d.dy;
      setWins((prev) =>
        prev.map((w) =>
          w.id !== d.id
            ? w
            : {
                ...w,
                x: clamp(nx, 8 - w.w + 60, rect.width - 60),
                y: clamp(ny, 0, rect.height - 40),
              }
        )
      );
    };
    const up = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const topId = wins.length ? wins.reduce((a, b) => (b.z > a.z ? b : a)).id : null;

  const renderApp = (win: WinState) => {
    switch (win.app) {
      case "about":
        return <AboutApp />;
      case "projects":
        return <ProjectsFolder onOpen={(slug) => openApp("project", slug)} />;
      case "project":
        return <ProjectApp slug={win.param ?? ""} />;
      case "timeline":
        return <TimelineApp />;
      case "skills":
        return <SkillsApp />;
      case "contact":
        return <ContactApp />;
      case "terminal":
        return <TerminalApp />;
      case "camera":
        return <CameraApp />;
      case "calc":
        return <CalculatorApp />;
      case "mines":
        return <MinesweeperApp />;
    }
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-bg md:p-8">
      <div className="w-full md:max-w-5xl">
        <div className="relative md:rounded-[26px] md:border md:border-[#8f877a] md:bg-[#c9c1b3] md:p-[1.8vw] md:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          <div className="relative md:rounded-[14px] md:bg-[#2a261f] md:p-[0.9vw]">
            <span className="absolute bottom-1 right-3 hidden h-2 w-2 rounded-full bg-[#3dff7a] shadow-[0_0_8px_#3dff7a] md:block" />
            <div
              ref={screenRef}
            className="desk-wall desk-grid crt relative h-[100dvh] select-none overflow-hidden md:h-auto md:aspect-[16/10] md:rounded-[6px]"
          >
            <div className="absolute left-3 top-3 grid grid-cols-4 gap-2 md:grid-flow-col md:grid-cols-none md:grid-rows-5 md:gap-3">
              {ICONS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.app}
                    type="button"
                    onClick={() => openApp(item.app)}
                    className="flex w-[68px] flex-col items-center gap-1 rounded-md p-1 text-center hover:bg-[#3dff7a]/12 focus-visible:bg-[#3dff7a]/15 md:w-[84px]"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md border border-[#3dff7a]/40 bg-[#0b3d1c]/70 text-[#eafff2] shadow-[0_0_14px_rgba(61,255,122,0.3)]">
                      <Icon size={20} />
                    </span>
                    <span className="mono text-[10px] leading-tight text-[#eafff2] drop-shadow">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {wins.map((win) => {
              const cfg = APPS[win.app];
              const Icon = cfg.icon;
              const style = isDesktop
                ? { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }
                : { left: 8, right: 8, top: 8, bottom: 52, zIndex: win.z };
              return (
                <Window
                  key={win.id}
                  title={win.title}
                  icon={<Icon size={12} />}
                  style={style}
                  active={win.id === topId}
                  draggable={isDesktop}
                  onFocus={() => focus(win.id)}
                  onClose={() => close(win.id)}
                  onDragStart={(e) => startDrag(win, e)}
                >
                  {renderApp(win)}
                </Window>
              );
            })}

            <div className="absolute inset-x-0 bottom-0 z-[1000] flex h-10 items-center gap-2 border-t border-[#3dff7a]/30 bg-[#02100a]/95 px-2">
              <button
                type="button"
                onClick={() => openApp("about")}
                className="mono h-7 shrink-0 rounded-sm bg-[#0b3d1c] px-3 text-xs text-[#eafff2] hover:bg-[#3dff7a] hover:text-[#02100a]"
              >
                INICIO
              </button>
              <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
                {wins.map((win) => (
                  <button
                    key={win.id}
                    type="button"
                    onClick={() => focus(win.id)}
                    className={`mono h-7 max-w-[140px] shrink-0 truncate rounded-sm px-2 text-[11px] ${
                      win.id === topId ? "bg-[#3dff7a]/15 text-[#eafff2]" : "text-[#9fe8b5] hover:bg-[#3dff7a]/12"
                    }`}
                  >
                    {win.title}
                  </button>
                ))}
              </div>
              <Clock />
            </div>
          </div>
          </div>

          <div className="mx-auto hidden h-5 w-24 bg-[#c9c1b3] md:block" />
          <div className="mx-auto hidden h-2 w-40 rounded-b-lg bg-[#b5ad9d] md:block" />
        </div>
      </div>
    </main>
  );
}
