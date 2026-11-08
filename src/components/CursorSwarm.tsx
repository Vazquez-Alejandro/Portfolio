"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#d08bbd", "#c084fc", "#a78bfa", "#8b5cf6", "#714b67", "#e46e78"];

type TrailPoint = { x: number; y: number };

type Agent = {
  x: number;
  y: number;
  lag: number;
  angle: number;
  radius: number;
  speed: number;
  color: string;
  size: number;
  heading: number;
  trail: TrailPoint[];
};

type FrameState = "idle" | "drawing" | "hold" | "fade" | "done";

type Frame = {
  el: HTMLElement;
  label: string;
  color: string;
  progress: number;
  alpha: number;
  hold: number;
  state: FrameState;
};

type Drawer = {
  x: number;
  y: number;
  lag: number;
  angle: number;
  radius: number;
  speed: number;
  color: string;
  size: number;
  frameIndex: number;
  offset: number;
  heading: number;
  trail: TrailPoint[];
};

function drawCursor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
  rotate: number
) {
  const s = size / 24;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(4, 2.5);
  ctx.lineTo(20, 11);
  ctx.lineTo(13.8, 12.4);
  ctx.lineTo(10.5, 21);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
}

function drawTrail(
  ctx: CanvasRenderingContext2D,
  trail: TrailPoint[],
  color: string,
  alpha: number,
  width: number
) {
  if (trail.length < 2) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = 1; i < trail.length; i++) {
    const t = i / trail.length;
    ctx.globalAlpha = alpha * t;
    ctx.beginPath();
    ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
    ctx.lineTo(trail[i].x, trail[i].y);
    ctx.stroke();
  }
  ctx.restore();
}

function turnHeading(current: number, target: number) {
  let diff = target - current;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return current + diff * 0.2;
}

function pointOnRect(x: number, y: number, w: number, h: number, t: number) {
  const per = 2 * (w + h);
  let d = Math.max(0, Math.min(1, t)) * per;
  if (d <= w) return { x: x + d, y };
  d -= w;
  if (d <= h) return { x: x + w, y: y + d };
  d -= h;
  if (d <= w) return { x: x + w - d, y: y + h };
  d -= w;
  return { x, y: y + h - d };
}

export default function CursorSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: w / 2, y: h / 2, active: false };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const agents: Agent[] = Array.from({ length: 18 }, (_, i) => ({
      x: w / 2 + Math.cos((i / 18) * Math.PI * 2) * 30,
      y: h / 2 + Math.sin((i / 18) * Math.PI * 2) * 30,
      lag: 0.12 + (i % 9) * 0.025,
      angle: (i / 18) * Math.PI * 2,
      radius: 3 + (i % 6) * 4,
      speed: 0.5 + (i % 5) * 0.2,
      color: COLORS[i % COLORS.length],
      size: 8 + (i % 5) * 1.7,
      heading: 0,
      trail: [],
    }));

    const frames: Frame[] = Array.from(
      document.querySelectorAll<HTMLElement>("[data-swarm]")
    ).map((el, i) => ({
      el,
      label: el.dataset.swarm || "Sección",
      color: COLORS[i % COLORS.length],
      progress: 0,
      alpha: 1,
      hold: 0,
      state: "idle",
    }));

    const drawers: Drawer[] = frames.flatMap((frame, fi) =>
      [0, 1].map((offset) => ({
        x: w / 2,
        y: h / 2,
        lag: 0.16,
        angle: (fi / frames.length) * Math.PI * 2 + offset * 0.6,
        radius: 10 + offset * 8,
        speed: 0.7 + offset * 0.2,
        color: frame.color,
        size: 14 - offset * 3,
        frameIndex: fi,
        offset,
        heading: 0,
        trail: [],
      }))
    );

    const writers: Agent[] = Array.from({ length: 3 }, (_, i) => ({
      x: w / 2,
      y: h / 2,
      lag: 0.28,
      angle: i * 2.1,
      radius: 4,
      speed: 1,
      color: "#f7d4ee",
      size: 15 - i * 2.5,
      heading: 0,
      trail: [],
    }));

    const writing = { active: false, x: 0, y: 0, h: 0, until: 0 };

    const onWriting = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail?.active) {
        writing.active = false;
        return;
      }
      writing.active = true;
      writing.x = detail.x;
      writing.y = detail.y;
      writing.h = detail.h ?? 0;
      writing.until = performance.now() + 250;
    };
    window.addEventListener("swarm:writing", onWriting);

    let raf = 0;
    let last = performance.now();
    let time = 0;

    const animate = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      const isWriting = writing.active && now < writing.until;

      const paintPoint = (seed: number, lane: number) => {
        const p = seed * 1.3;
        const sweep = 0.5 + 0.5 * Math.sin(time * 2.6 + p);
        const x = writing.x - 8 - sweep * 52;
        const y =
          writing.y +
          lane * writing.h * 0.34 +
          Math.sin(time * 3.2 + p + lane) * writing.h * 0.09;
        return { x, y };
      };

      ctx.clearRect(0, 0, w, h);

      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        g.addColorStop(0, "rgba(113, 75, 103, 0.18)");
        g.addColorStop(1, "rgba(113, 75, 103, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 160, mouse.y - 160, 320, 320);
      }

      for (const frame of frames) {
        const r = frame.el.getBoundingClientRect();
        const visible = r.top < h * 0.82 && r.bottom > h * 0.18;

        if (!isWriting) {
          if (frame.state === "idle" && visible) frame.state = "drawing";

          if (frame.state === "drawing") {
            frame.progress += dt * 0.8;
            if (frame.progress >= 1) {
              frame.progress = 1;
              frame.state = "hold";
              frame.hold = 0.55;
            }
          } else if (frame.state === "hold") {
            frame.hold -= dt;
            if (frame.hold <= 0) frame.state = "fade";
          } else if (frame.state === "fade") {
            frame.alpha -= dt * 1.6;
            if (frame.alpha <= 0) {
              frame.alpha = 0;
              frame.state = "done";
            }
          }
        }

        if (frame.progress <= 0.005 || frame.alpha <= 0.005) continue;

        const pad = 10;
        const x = r.left + pad;
        const y = r.top + pad;
        const ww = r.width - pad * 2;
        const hh = r.height - pad * 2;
        if (ww <= 0 || hh <= 0) continue;

        const per = 2 * (ww + hh);
        const a = frame.alpha;

        ctx.save();
        ctx.globalAlpha = 0.5 * a;
        ctx.strokeStyle = frame.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([per * frame.progress, per]);
        ctx.strokeRect(x, y, ww, hh);
        ctx.setLineDash([]);

        if (frame.progress > 0.02) {
          ctx.globalAlpha = 0.9 * a;
          ctx.fillStyle = frame.color;
          for (const [cx, cy] of [
            [x, y],
            [x + ww, y],
            [x, y + hh],
            [x + ww, y + hh],
          ]) {
            ctx.fillRect(cx - 2.5, cy - 2.5, 5, 5);
          }
        }

        ctx.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
        const tw = ctx.measureText(frame.label).width;
        ctx.globalAlpha = 0.85 * a;
        ctx.fillStyle = "#0b070a";
        ctx.fillRect(x, y - 20, tw + 12, 16);
        ctx.strokeStyle = frame.color;
        ctx.strokeRect(x + 0.5, y - 19.5, tw + 11, 15);
        ctx.fillStyle = frame.color;
        ctx.fillText(frame.label, x + 6, y - 9);
        ctx.restore();
      }

      // Cursors that detach to draw, then return to the swarm
      drawers.forEach((d) => {
        const frame = frames[d.frameIndex];
        const r = frame.el.getBoundingClientRect();
        let tx: number;
        let ty: number;

        if (isWriting) {
          const lane = ((d.frameIndex + d.offset) % 5 - 2) / 2;
          const p = paintPoint(d.frameIndex * 7 + d.offset + 10, lane);
          tx = p.x;
          ty = p.y;
        } else if (
          (frame.state === "drawing" || frame.state === "hold") &&
          frame.progress > 0
        ) {
          const pad = 10;
          const x = r.left + pad;
          const y = r.top + pad;
          const ww = r.width - pad * 2;
          const hh = r.height - pad * 2;
          const p = Math.max(0, frame.progress - d.offset * 0.02);
          const pt = pointOnRect(x, y, ww, hh, p);
          tx = pt.x;
          ty = pt.y;
        } else {
          tx = mouse.x + Math.cos(time * 0.9 + d.angle) * d.radius;
          ty = mouse.y + Math.sin(time * 1.2 + d.angle) * d.radius;
        }

        d.x += (tx - d.x) * d.lag;
        d.y += (ty - d.y) * d.lag;

        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > 9) d.trail.shift();

        const prev = d.trail[d.trail.length - 2];
        if (prev) {
          const dx = d.x - prev.x;
          const dy = d.y - prev.y;
          if (Math.hypot(dx, dy) > 0.2) {
            d.heading = turnHeading(d.heading, Math.atan2(dy, dx));
          }
        }

        const rotate = isWriting
          ? (d.heading * 180) / Math.PI + 135
          : Math.sin(time * d.speed + d.angle) * 18;

        drawTrail(ctx, d.trail, d.color, isWriting ? 0.4 : 0.1, 1.1);
        drawCursor(ctx, d.x, d.y, d.color, d.size, rotate);
      });

      // Cursors that help paint the hero name
      writers.forEach((wr, i) => {
        let tx: number;
        let ty: number;

        if (isWriting) {
          const p = paintPoint(100 + i * 5, (i - 1) * 0.7);
          tx = p.x + Math.cos(time * 7 + i) * 2;
          ty = p.y + Math.sin(time * 6 + i) * 2;
        } else {
          tx = mouse.x + Math.cos(time * 1.1 + wr.angle) * 14;
          ty = mouse.y + Math.sin(time * 1.3 + wr.angle) * 14;
        }

        wr.x += (tx - wr.x) * wr.lag;
        wr.y += (ty - wr.y) * wr.lag;

        wr.trail.push({ x: wr.x, y: wr.y });
        if (wr.trail.length > 9) wr.trail.shift();

        const prev = wr.trail[wr.trail.length - 2];
        if (prev) {
          const dx = wr.x - prev.x;
          const dy = wr.y - prev.y;
          if (Math.hypot(dx, dy) > 0.2) {
            wr.heading = turnHeading(wr.heading, Math.atan2(dy, dx));
          }
        }

        const rotate = isWriting
          ? (wr.heading * 180) / Math.PI + 135
          : Math.sin(time * wr.speed + wr.angle) * 18;

        drawTrail(ctx, wr.trail, wr.color, isWriting ? 0.45 : 0.1, 1.2);
        drawCursor(ctx, wr.x, wr.y, wr.color, wr.size, rotate);
      });

      // Swarm following the pointer, or the paint edge
      agents.forEach((a, i) => {
        let tx: number;
        let ty: number;

        if (isWriting) {
          const lane = ((i % 7) - 3) / 3;
          const p = paintPoint(i * 3 + 50, lane);
          tx = p.x + Math.cos(time * 6 + a.angle) * 3;
          ty = p.y + Math.sin(time * 5 + a.angle) * 2;
        } else {
          tx =
            mouse.x + Math.cos(time * a.speed + a.angle) * a.radius;
          ty =
            mouse.y +
            Math.sin(time * a.speed * 1.3 + a.angle) * a.radius;
        }

        a.x += (tx - a.x) * a.lag;
        a.y += (ty - a.y) * a.lag;

        a.trail.push({ x: a.x, y: a.y });
        if (a.trail.length > 9) a.trail.shift();

        const prev = a.trail[a.trail.length - 2];
        if (prev) {
          const dx = a.x - prev.x;
          const dy = a.y - prev.y;
          if (Math.hypot(dx, dy) > 0.2) {
            a.heading = turnHeading(a.heading, Math.atan2(dy, dx));
          }
        }

        const rotate = isWriting
          ? (a.heading * 180) / Math.PI + 135
          : Math.sin(time * a.speed + a.angle) * 18;

        if (i > 0) {
          const prevAgent = agents[i - 1];
          ctx.save();
          ctx.globalAlpha = 0.08;
          ctx.strokeStyle = a.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(prevAgent.x, prevAgent.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();
          ctx.restore();
        }

        drawTrail(ctx, a.trail, a.color, isWriting ? 0.35 : 0.08, 1);
        drawCursor(ctx, a.x, a.y, a.color, a.size, rotate);
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("swarm:writing", onWriting);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
    />
  );
}
