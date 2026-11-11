import Link from "next/link";
import "./classic.css";
import Header from "@/components/classic/Header";
import Hero from "@/components/classic/Hero";
import About from "@/components/classic/About";
import Projects from "@/components/classic/Projects";
import Skills from "@/components/classic/Skills";
import Contact from "@/components/classic/Contact";
import Footer from "@/components/classic/Footer";

export const metadata = {
  title: "Versión clásica | Alejandro Vázquez",
  description: "Versión anterior del portfolio de Alejandro Vázquez.",
};

export default function ClasicoPage() {
  return (
    <div className="c-root">
      <Link
        href="/"
        className="fixed right-4 top-4 z-[60] rounded-full border border-white/15 bg-black/60 px-3 py-1.5 font-mono text-xs text-white backdrop-blur hover:border-white/40"
      >
        ← Versión nueva
      </Link>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
