"use client";

import { useEffect, useRef } from "react";

const COUNT = 34;
const PALETTE = ["#d08bbd", "#c084fc", "#a78bfa", "#8b5cf6", "#714b67", "#e46e78"];

const CursorArrow = ({ color, size }: { color: string; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
  >
    <path d="M4 2.5 20 11l-6.2 1.4L10.5 21 4 2.5Z" />
  </svg>
);

type Particle = {
  x: number;
  y: number;
  lag: number;
  angle: number;
  radius: number;
  speed: number;
};

export default function CursorSwarm() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<Particle[]>(
    Array.from({ length: COUNT }, (_, i) => ({
      x: -100,
      y: -100,
      lag: 0.14 + (i % 10) * 0.025,
      angle: (i / COUNT) * Math.PI * 2,
      radius: 4 + (i % 7) * 5,
      speed: 0.6 + (i % 5) * 0.22,
    }))
  );

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduced) return;

    const target = { x: -100, y: -100 };
    let visible = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        refs.current.forEach((el) => {
          if (el) el.style.opacity = "1";
        });
      }
    };

    const onLeave = () => {
      visible = false;
      refs.current.forEach((el) => {
        if (el) el.style.opacity = "0";
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let time = 0;

    const animate = () => {
      time += 0.016;
      let prevX = target.x;
      let prevY = target.y;

      positions.current.forEach((p, i) => {
        p.x += (prevX - p.x) * p.lag;
        p.y += (prevY - p.y) * p.lag;

        const wobbleX = Math.cos(time * p.speed + p.angle) * p.radius;
        const wobbleY = Math.sin(time * p.speed * 1.3 + p.angle) * p.radius;
        const rotate = Math.sin(time * p.speed + p.angle) * 18;

        const el = refs.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x + wobbleX}px, ${
            p.y + wobbleY
          }px, 0) rotate(${rotate}deg)`;
        }

        prevX = p.x;
        prevY = p.y;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
    >
      {Array.from({ length: COUNT }).map((_, i) => {
        const color = PALETTE[i % PALETTE.length];
        const size = 9 + (i % 6) * 1.8;
        const opacity = 0.85 - (i / COUNT) * 0.55;

        return (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="absolute top-0 left-0 opacity-0 transition-opacity duration-300 will-change-transform"
            style={{ transform: "translate3d(-100px,-100px,0)" }}
          >
            <div style={{ opacity }}>
              <CursorArrow color={color} size={size} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
