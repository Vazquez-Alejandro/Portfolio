"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="wrap px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="mono text-gris">
          © {new Date().getFullYear()} Alejandro Vázquez · Buenos Aires, Argentina
        </p>
        <div className="flex items-center gap-5">
          <Link href="/clasico" className="text-gris hover:text-text transition-colors mono">
            Versión clásica
          </Link>
          <a
            href="https://github.com/Vazquez-Alejandro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gris hover:text-text transition-colors mono"
          >
            GitHub
          </a>
          <a
            href="mailto:vazquezale82@gmail.com"
            className="text-gris hover:text-text transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://wa.me/5491158210746"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gris hover:text-text transition-colors mono"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
