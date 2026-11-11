"use client";

import { useState } from "react";

const N = 9;
const MINES = 10;

type Cell = { mine: boolean; open: boolean; flag: boolean; n: number };
type Status = "ready" | "playing" | "won" | "lost";

const NUM_COLORS = [
  "",
  "text-ciruela",
  "text-[#7dd3fc]",
  "text-[#e46e78]",
  "text-[#c084fc]",
  "text-[#fbbf24]",
  "text-[#34d399]",
  "text-white",
  "text-gris",
];

function emptyBoard(): Cell[][] {
  return Array.from({ length: N }, () =>
    Array.from({ length: N }, () => ({ mine: false, open: false, flag: false, n: 0 }))
  );
}

function around(r: number, c: number): [number, number][] {
  const out: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < N && nc >= 0 && nc < N) out.push([nr, nc]);
    }
  }
  return out;
}

function build(safeR: number, safeC: number, flags: boolean[][]): Cell[][] {
  const b = emptyBoard();
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * N);
    const c = Math.floor(Math.random() * N);
    if ((r === safeR && c === safeC) || b[r][c].mine) continue;
    b[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      b[r][c].n = around(r, c).filter(([y, x]) => b[y][x].mine).length;
      b[r][c].flag = flags[r][c];
    }
  }
  return b;
}

function reveal(board: Cell[][], r: number, c: number): Cell[][] {
  const g = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [y, x] = stack.pop() as [number, number];
    const cell = g[y][x];
    if (cell.open || cell.flag) continue;
    cell.open = true;
    if (cell.n === 0 && !cell.mine) {
      for (const [ny, nx] of around(y, x)) {
        if (!g[ny][nx].open) stack.push([ny, nx]);
      }
    }
  }
  return g;
}

export default function MinesweeperApp() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [status, setStatus] = useState<Status>("ready");
  const [flagMode, setFlagMode] = useState(false);

  const finished = status === "won" || status === "lost";

  const reset = () => {
    setBoard(emptyBoard());
    setStatus("ready");
  };

  const toggleFlag = (r: number, c: number) => {
    if (finished || board[r][c].open) return;
    setBoard((prev) =>
      prev.map((row, y) => row.map((cell, x) => (y === r && x === c ? { ...cell, flag: !cell.flag } : cell)))
    );
  };

  const open = (r: number, c: number) => {
    if (finished) return;
    if (flagMode) {
      toggleFlag(r, c);
      return;
    }
    if (board[r][c].open || board[r][c].flag) return;

    let current = board;
    if (status === "ready") {
      const flags = board.map((row) => row.map((cell) => cell.flag));
      current = build(r, c, flags);
    }

    if (current[r][c].mine) {
      const exploded = current.map((row) => row.map((cell) => (cell.mine ? { ...cell, open: true } : cell)));
      setBoard(exploded);
      setStatus("lost");
      return;
    }

    const next = reveal(current, r, c);
    const won = next.every((row) => row.every((cell) => cell.mine || cell.open));
    setBoard(next);
    setStatus(won ? "won" : "playing");
  };

  const minesLeft = MINES - board.flat().filter((cell) => cell.flag).length;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="mono flex w-full items-center justify-between text-xs">
        <span className="rounded-sm bg-black/40 px-2 py-1 text-ciruela">{String(minesLeft).padStart(2, "0")}</span>
        <button
          type="button"
          onClick={reset}
          className="rounded-sm border border-white/20 px-2 py-1 text-text hover:border-white/40"
        >
          {status === "won" ? "Ganaste" : status === "lost" ? "Perdiste" : "Nueva"}
        </button>
        <button
          type="button"
          onClick={() => setFlagMode((v) => !v)}
          aria-pressed={flagMode}
          className={`rounded-sm px-2 py-1 ${flagMode ? "bg-odoo text-white" : "border border-white/20 text-text"}`}
        >
          Bandera {flagMode ? "on" : "off"}
        </button>
      </div>

      <div className="grid select-none grid-cols-9 gap-[2px] rounded-sm bg-white/10 p-[2px]">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const label = cell.open
              ? cell.mine
                ? "✱"
                : cell.n > 0
                  ? String(cell.n)
                  : ""
              : cell.flag
                ? "⚑"
                : "";
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                aria-label={`Celda ${r + 1},${c + 1}`}
                onClick={() => open(r, c)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFlag(r, c);
                }}
                className={`mono grid h-7 w-7 place-items-center rounded-[2px] text-xs font-bold ${
                  cell.open
                    ? `bg-[#1b1421] ${cell.mine ? "text-[#e46e78]" : NUM_COLORS[cell.n]}`
                    : "bg-[#3a2d44] text-[#e46e78] hover:bg-[#4a3a57]"
                }`}
              >
                {label}
              </button>
            );
          })
        )}
      </div>

      <p className="mono h-4 text-[11px] text-gris">
        {status === "won" && "Limpiaste el tablero."}
        {status === "lost" && "Boom. Probá otra vez."}
        {!finished && "Click para abrir · clic derecho para marcar"}
      </p>
    </div>
  );
}
