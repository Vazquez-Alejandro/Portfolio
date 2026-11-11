"use client";

import { useEffect, useRef, useState } from "react";

type Status = "off" | "on" | "error";

export default function CameraApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<Status>("off");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (status === "on" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [status]);

  useEffect(() => {
    const stream = streamRef;
    return () => {
      stream.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      return;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
      setStatus("on");
    } catch {
      setStatus("error");
    }
  };

  const stop = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStatus("off");
  };

  const shoot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    const link = document.createElement("a");
    link.download = `foto-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setFlash(true);
    window.setTimeout(() => setFlash(false), 150);
  };

  return (
    <div className="flex h-full flex-col items-center gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 bg-black">
        {status === "on" && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full scale-x-[-1] object-cover grayscale-[0.2] contrast-110"
          />
        )}
        {status !== "on" && (
          <div className="mono grid h-full place-items-center p-4 text-center text-[11px] text-gris">
            {status === "error"
              ? "No se pudo acceder a la cámara. Revisá los permisos del navegador."
              : "Cámara apagada."}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.18)_0_1px,transparent_1px_3px)]" />
        {flash && <div className="absolute inset-0 bg-white/80" />}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="mono flex gap-2 text-xs">
        {status !== "on" ? (
          <button
            type="button"
            onClick={start}
            className="rounded-sm border border-ciruela/60 px-3 py-1.5 text-text hover:bg-ciruela/20"
          >
            Encender
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={shoot}
              className="rounded-sm bg-odoo px-3 py-1.5 text-white hover:bg-ciruela"
            >
              Sacar foto
            </button>
            <button
              type="button"
              onClick={stop}
              className="rounded-sm border border-white/20 px-3 py-1.5 text-text hover:border-white/40"
            >
              Apagar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
