"use client";

import { useState } from "react";

type Calc = {
  display: string;
  acc: number | null;
  op: string | null;
  fresh: boolean;
};

const START: Calc = { display: "0", acc: null, op: null, fresh: true };

const OPS: Record<string, (a: number, b: number) => number> = {
  "+": (a, b) => a + b,
  "−": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

const KEYS = [
  ["C", "⌫", "÷", "×"],
  ["7", "8", "9", "−"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "="],
  ["0", "."],
];

function format(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  return String(Number(n.toPrecision(12)));
}

export function press(s: Calc, key: string): Calc {
  if (s.display === "Error" && key !== "C") return START;

  if (/^\d$/.test(key)) {
    if (s.fresh || s.display === "0") return { ...s, display: key, fresh: false };
    return { ...s, display: s.display + key };
  }

  if (key === ".") {
    if (s.fresh) return { ...s, display: "0.", fresh: false };
    return s.display.includes(".") ? s : { ...s, display: s.display + "." };
  }

  if (key === "C") return START;

  if (key === "⌫") {
    if (s.fresh) return s;
    const next = s.display.length > 1 ? s.display.slice(0, -1) : "0";
    return { ...s, display: next };
  }

  if (key in OPS) {
    const current = Number(s.display);
    if (s.op && s.acc !== null && !s.fresh) {
      const result = OPS[s.op](s.acc, current);
      return { display: format(result), acc: result, op: key, fresh: true };
    }
    return { ...s, acc: current, op: key, fresh: true };
  }

  if (key === "=") {
    if (!s.op || s.acc === null) return s;
    const result = OPS[s.op](s.acc, Number(s.display));
    return { display: format(result), acc: null, op: null, fresh: true };
  }

  return s;
}

export default function CalculatorApp() {
  const [state, setState] = useState<Calc>(START);

  return (
    <div className="flex flex-col gap-3">
      <div className="mono flex min-h-[64px] flex-col items-end justify-end rounded-sm border border-[#3dff7a]/25 bg-black/40 px-3 py-2">
        <span className="text-[10px] text-[#9fe8b5]">
          {state.acc !== null && state.op ? `${format(state.acc)} ${state.op}` : " "}
        </span>
        <span className="truncate text-2xl text-[#eafff2]">{state.display}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {KEYS.flat().map((key, i) => {
          if (key === "") return <div key={i} />;
          const isOp = key in OPS || key === "=";
          const span = key === "0" ? "col-span-2" : "";
          return (
            <button
              key={`${key}-${i}`}
              type="button"
              onClick={() => setState((s) => press(s, key))}
              className={`mono h-10 rounded-sm text-sm transition-colors ${span} ${
                isOp
                  ? "bg-[#0b3d1c] text-[#eafff2] hover:bg-[#3dff7a]"
                  : "bg-[#3dff7a]/8 text-[#eafff2] hover:bg-[#3dff7a]/15"
              }`}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}
