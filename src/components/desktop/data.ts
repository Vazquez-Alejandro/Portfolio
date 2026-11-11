export type Project = {
  slug: string;
  title: string;
  description: string;
  logo: string;
  tags: string[];
  live: string;
  liveLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "blickapp",
    title: "Blickapp",
    description:
      "Sistema de gestión gastronómica para cadenas de locales. POS propio, ventas y tickets, inventarios con recetas y CMV, mermas, liquidación de mano de obra con F.931 y Estado de Resultados de 19 líneas.",
    logo: "/logos/blickapp.png",
    tags: ["Go", "React", "TypeScript", "PostgreSQL", "Tailwind"],
    live: "https://blickapp.vercel.app",
  },
  {
    slug: "nivela",
    title: "Nivela",
    description:
      "Software de gestión de auditorías, controles y planes de acción. Dashboard web y app móvil con Capacitor, detección automática de KO, evidencia multimedia, modo offline y reportes PDF.",
    logo: "/logos/nivela.png",
    tags: ["Python", "FastAPI", "PostgreSQL", "React", "Capacitor"],
    live: "https://getnivela.vercel.app",
  },
  {
    slug: "revendr",
    title: "Revendr",
    description:
      "Plataforma de automatización de ventas. Scraping de leads, demos personalizadas con IA, campañas multicanal (WhatsApp + Email), cobros con Stripe/Mercado Pago y pipeline en tiempo real.",
    logo: "/logos/revendr.png",
    tags: ["React", "Firebase", "Node.js", "WhatsApp API", "Stripe"],
    live: "https://revendr.com.ar",
  },
  {
    slug: "priceanchor",
    title: "PriceAnchor",
    description:
      "Monitoreo de precios para marcas. Detección automática de violaciones MAP, alertas en tiempo real por WhatsApp/Telegram, reportes PDF, captura de evidencia y dashboard con KPIs.",
    logo: "/logos/priceanchor.png",
    tags: ["React", "Vite", "Node.js", "Playwright", "Telegram"],
    live: "https://priceanchor.vercel.app",
  },
  {
    slug: "traceless",
    title: "TraceLess",
    description:
      "Facturación electrónica por WhatsApp para monotributistas y pequeños negocios. El bot genera la factura con CAE de ARCA al instante, con link de pago y recordatorios de cobranza automáticos.",
    logo: "/logos/traceless.png",
    tags: ["Python", "FastAPI", "React", "Supabase", "MercadoPago"],
    live: "https://www.traceless.com.ar",
    liveLabel: "traceless.com.ar",
  },
  {
    slug: "howlify",
    title: "Howlify",
    description:
      "Cazador automático de vuelos baratos, hoteles y paquetes para Latinoamérica. Motor de vigilancia 24/7 con Duffel API, alertas por Telegram/WhatsApp/Email, historial y predicción de precios.",
    logo: "/logos/howlify.png",
    tags: ["Python", "FastAPI", "Celery", "Supabase", "React"],
    live: "https://howlify.vercel.app",
  },
];

export const timeline = [
  {
    when: "Formación",
    title: "Desarrollador de Software",
    org: "IFTS n° 16",
    text: "Formación full-stack con base en programación, bases de datos y desarrollo de aplicaciones.",
  },
  {
    when: "Curso",
    title: "Java (2 stacks)",
    org: "Formación complementaria",
    text: "Programación orientada a objetos, backend y desarrollo de aplicaciones con Java.",
  },
  {
    when: "Curso",
    title: "React.js",
    org: "Formación complementaria",
    text: "Desarrollo de interfaces modernas, componentes, estado y consumo de APIs.",
  },
  {
    when: "Curso completado",
    title: "Desarrollo de Videojuegos",
    org: "Unity + C#",
    text: "Diseño y programación de videojuegos con C#, lógica de gameplay y desarrollo en Unity.",
  },
  {
    when: "Hoy",
    title: "Productos y proyectos reales",
    org: "Freelance / productos propios",
    text: "Construyo y mantengo aplicaciones web completas, desde el backend hasta la interfaz y el deploy.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "Java", "WebSockets", "REST APIs"],
  },
  {
    title: "Bases de datos",
    skills: ["PostgreSQL", "Supabase", "SQLite", "MySQL", "SQLAlchemy"],
  },
  {
    title: "Herramientas",
    skills: ["Git & GitHub", "Docker", "Vite", "Playwright", "Streamlit", "Vercel/Render"],
  },
];

export const contact = {
  email: "vazquezale82@gmail.com",
  github: "https://github.com/Vazquez-Alejandro",
  whatsapp: "https://wa.me/5491158210746",
};
