"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  siDocker,
  siFastify,
  siGithubactions,
  siHetzner,
  siJsonwebtokens,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPrisma,
  siPostgresql,
  siRedis,
  siTailwindcss,
  siTypescript,
  siZod,
} from "simple-icons";

type Project = {
  name: string;
  summary: string;
  category: "Web App" | "Backend" | "AI Tool";
  technologies: string[];
};

type Technology = {
  name: string;
  iconPath: string;
  brand: string;
  tone: string;
};

type TechCategory = {
  name: "Backend" | "Frontend" | "DevOps";
  items: Technology[];
};

const technologyCategories: TechCategory[] = [
  {
    name: "Backend",
    items: [
      {
        name: "Node.js (LTS)",
        iconPath: siNodedotjs.path,
        brand: "#5fa04e",
        tone: "rgb(95 160 78 / 0.14)",
      },
      {
        name: "Fastify",
        iconPath: siFastify.path,
        brand: "#ffffff",
        tone: "rgb(140 99 255 / 0.16)",
      },
      {
        name: "TypeScript",
        iconPath: siTypescript.path,
        brand: "#3178c6",
        tone: "rgb(49 120 198 / 0.16)",
      },
      {
        name: "PostgreSQL",
        iconPath: siPostgresql.path,
        brand: "#4169e1",
        tone: "rgb(65 105 225 / 0.15)",
      },
      {
        name: "Prisma",
        iconPath: siPrisma.path,
        brand: "#2d3748",
        tone: "rgb(45 55 72 / 0.2)",
      },
      {
        name: "Redis",
        iconPath: siRedis.path,
        brand: "#dc382d",
        tone: "rgb(220 56 45 / 0.16)",
      },
      {
        name: "Zod (validation)",
        iconPath: siZod.path,
        brand: "#3e67b1",
        tone: "rgb(62 103 177 / 0.15)",
      },
      {
        name: "JWT (auth)",
        iconPath: siJsonwebtokens.path,
        brand: "#d63aff",
        tone: "rgb(214 58 255 / 0.16)",
      },
    ],
  },
  {
    name: "Frontend",
    items: [
      {
        name: "Next.js",
        iconPath: siNextdotjs.path,
        brand: "#ffffff",
        tone: "rgb(91 124 255 / 0.15)",
      },
      {
        name: "TypeScript",
        iconPath: siTypescript.path,
        brand: "#3178c6",
        tone: "rgb(49 120 198 / 0.16)",
      },
      {
        name: "TailwindCSS",
        iconPath: siTailwindcss.path,
        brand: "#06b6d4",
        tone: "rgb(6 182 212 / 0.16)",
      },
    ],
  },
  {
    name: "DevOps",
    items: [
      {
        name: "Docker",
        iconPath: siDocker.path,
        brand: "#2496ed",
        tone: "rgb(36 150 237 / 0.16)",
      },
      {
        name: "GitHub Actions",
        iconPath: siGithubactions.path,
        brand: "#2088ff",
        tone: "rgb(32 136 255 / 0.16)",
      },
      {
        name: "Nginx",
        iconPath: siNginx.path,
        brand: "#009639",
        tone: "rgb(0 150 57 / 0.16)",
      },
      {
        name: "VPS (Hetzner / DigitalOcean)",
        iconPath: siHetzner.path,
        brand: "#d50c2d",
        tone: "rgb(213 12 45 / 0.16)",
      },
    ],
  },
];

const projects: Project[] = [
  {
    name: "PulseBoard",
    summary: "Monitoring dashboard for incidents and deployment health.",
    category: "Web App",
    technologies: ["Next.js", "React.js", "PostgreSQL"],
  },
  {
    name: "QueueForge API",
    summary: "High-throughput job processing API with retries and observability.",
    category: "Backend",
    technologies: ["Node.js", "Fastify", "Redis"],
  },
  {
    name: "DraftPilot",
    summary: "AI-assisted writing workflow from idea to publish-ready copy.",
    category: "AI Tool",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    name: "Storefront Core",
    summary: "Composable commerce frontend focused on speed and conversion.",
    category: "Web App",
    technologies: ["React.js", "TypeScript", "Redis"],
  },
];

const blogPosts = [
  {
    title: "How I structure scalable Next.js projects",
    date: "February 2026",
  },
  {
    title: "Fastify + Redis patterns I use in production",
    date: "January 2026",
  },
  {
    title: "Choosing between Postgres and Redis per workload",
    date: "December 2025",
  },
];

type NavItem = {
  id: "about" | "tech" | "projects" | "contact" | "blog";
  label: string;
  href?: string;
};

const navItems: NavItem[] = [
  { id: "about", label: "About", href: "#top" },
  { id: "tech", label: "Tech I love" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog" },
];

export default function Home() {
  const [sortBy, setSortBy] = useState<"category" | "technology">("category");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [techFilter, setTechFilter] = useState<string>("All");
  const [activeSection, setActiveSection] = useState<NavItem["id"]>("about");

  const categoryOptions = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );
  const techOptions = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((p) => p.technologies)))],
    [],
  );

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesCategory =
        categoryFilter === "All" || project.category === categoryFilter;
      const matchesTech =
        techFilter === "All" || project.technologies.includes(techFilter);
      return matchesCategory && matchesTech;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "category") {
        return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      }
      const techA = a.technologies[0] ?? "";
      const techB = b.technologies[0] ?? "";
      return techA.localeCompare(techB) || a.name.localeCompare(b.name);
    });
  }, [categoryFilter, sortBy, techFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id as NavItem["id"]);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -45% 0px",
      },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="portfolio-root" id="top">
      <div className="aura aura-navy" />
      <div className="aura aura-pink" />

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="ciorhan.dev">
          ciorhan.dev
        </a>

        <nav
          id="main-nav"
          aria-label="Main navigation"
          className="menu-wrap"
        >
          <ul className="menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href ?? `#${item.id}`}
                  className={activeSection === item.id ? "is-active" : ""}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="hero" id="about">
        <div className="hero-copy">
          <p className="kicker">Hello, I&apos;m Ciorhan</p>
          <h1>I build fast, reliable web products with clean user experiences.</h1>
          <p>
            Fullstack developer focused on modern JavaScript systems, scalable
            backend architecture, and sharp frontend execution.
          </p>
        </div>
        <div className="hero-illustration" aria-hidden="true">
          <div className="ring ring-a" />
          <div className="ring ring-b" />
          <div className="ring ring-c" />
          <div className="node node-a" />
          <div className="node node-b" />
          <div className="node node-c" />
          <div className="trace trace-a" />
          <div className="trace trace-b" />
          <div className="trace trace-c" />
          <p className="chip-float">NEXT + NODE + REDIS</p>
        </div>
      </section>

      <section className="section" id="tech">
        <div className="section-head">
          <h2>Technologies I use and love</h2>
        </div>
        <div className="tech-groups">
          {technologyCategories.map((group) => (
            <article className="tech-group" key={group.name}>
              <h3>{group.name}</h3>
              <div className="chip-list">
                {group.items.map((tech) => (
                  <span
                    key={`${group.name}-${tech.name}`}
                    className="chip brand-chip"
                    style={
                      {
                        "--chip-brand": tech.brand,
                        "--chip-tone": tech.tone,
                      } as CSSProperties
                    }
                  >
                    <svg
                      aria-hidden="true"
                      className="chip-logo"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={tech.iconPath} />
                    </svg>
                    {tech.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-head">
          <h2>Projects</h2>
        </div>

        <div className="project-controls">
          <label>
            Sort by
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "category" | "technology")}
            >
              <option value="category">Category</option>
              <option value="technology">Technology</option>
            </select>
          </label>

          <label>
            Category
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Technology
            <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)}>
              {techOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.name}>
              <p className="meta">{project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="tag-list">
                {project.technologies.map((tech) => (
                  <span key={`${project.name}-${tech}`}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-col" id="contact">
        <article>
          <div className="section-head">
            <h2>Contact me</h2>
          </div>
          <p className="contact-copy">
            Open to freelance, contract, and full-time opportunities.
          </p>
          <a className="contact-link" href="mailto:hello@ciorhan.dev">
            hello@ciorhan.dev
          </a>
        </article>

        <article id="blog">
          <div className="section-head">
            <h2>Latest blog articles</h2>
          </div>
          <ul className="blog-list">
            {blogPosts.map((post) => (
              <li key={post.title}>
                <span>{post.date}</span>
                <p>{post.title}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
