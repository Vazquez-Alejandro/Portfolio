"use client";

import { useEffect, useRef } from "react";

const COUNT = 7;

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

export default function CursorSwarm() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef(
    Array.from({ length: COUNT }, () => ({ x: -100, y: -100 }))
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
    let prevX = target.x;
    let prevY = target.y;

    const animate = () => {
      prevX = target.x;
      prevY = target.y;

      positions.current.forEach((p, i) => {
        p.x += (prevX - p.x) * 0.22;
        p.y += (prevY - p.y) * 0.22;

        const el = refs.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
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
      {Array.from({ length: COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="absolute top-0 left-0 opacity-0 transition-opacity duration-300 will-change-transform"
          style={{
            transform: "translate3d(-100px,-100px,0)",
          }}
        >
          <CursorArrow
            color={`rgba(${208 - i * 10}, ${139 - i * 8}, ${189 - i * 8}, ${
              0.9 - i * 0.1
            })`}
            size={18 - i * 1.4}
          />
        </div>
      ))}
    </div>
  );
}
