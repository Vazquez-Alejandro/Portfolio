"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { X } from "lucide-react";

type WindowProps = {
  title: string;
  icon: ReactNode;
  style: CSSProperties;
  active: boolean;
  draggable: boolean;
  onFocus: () => void;
  onClose: () => void;
  onDragStart: (e: ReactPointerEvent<HTMLDivElement>) => void;
  children: ReactNode;
};

export default function Window({
  title,
  icon,
  style,
  active,
  draggable,
  onFocus,
  onClose,
  onDragStart,
  children,
}: WindowProps) {
  return (
    <div
      onPointerDown={onFocus}
      style={style}
      className={`absolute flex flex-col overflow-hidden rounded-md border bg-[#03100a]/95 text-[#eafff2] shadow-[0_18px_40px_rgba(0,0,0,0.55)] ${
        active ? "border-[#3dff7a]/60" : "border-[#3dff7a]/25"
      }`}
    >
      <div
        onPointerDown={(e) => {
          if (draggable) onDragStart(e);
        }}
        className={`flex shrink-0 items-center justify-between gap-2 px-3 py-1.5 select-none ${
          active ? "bg-[#0b3d1c]" : "bg-[#0a2414]"
        } ${draggable ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        <span className="mono flex min-w-0 items-center gap-2 truncate text-xs text-[#eafff2]">
          {icon}
          <span className="truncate">{title}</span>
        </span>
        <button
          type="button"
          aria-label={`Cerrar ${title}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onClose}
          className="grid h-5 w-5 shrink-0 place-items-center rounded-sm bg-black/30 text-[#eafff2] hover:bg-[#3dff7a] hover:text-[#02100a]"
        >
          <X size={12} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 text-sm text-[#9fe8b5]">{children}</div>
    </div>
  );
}
