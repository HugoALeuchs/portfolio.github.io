"use client";
import styles from "./page.module.css";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const EXPERIENCE = [
  {
    company: "Rebind.ai",
    role: "Frontend Engineer",
    period: "Jan 2024 – Present",
    color: "#00c8ff",
    bullets: [
      "Led migration of company website to static architecture (Hugo + Decap CMS)",
      "Designed Mixpanel analytics & event tracking across 3 company websites",
      "Maintained Google PageSpeed scores above 90",
      "Built SEO-optimised landing pages in collaboration with marketing teams",
      "Integrated Shopify checkout for AI-powered reading services",
    ],
  },
  {
    company: "Loadsmart",
    role: "Frontend Engineer",
    period: "Apr 2022 – Nov 2023",
    color: "#22c55e",
    bullets: [
      "Built marketing pages and website features with Next.js & Styled Components",
      "Developed landing page automation using the HubSpot CMS API",
      "Collaborated with cross-functional teams to launch marketing campaigns",
      "Improved SEO and site performance across the marketing website",
    ],
  },
  {
    company: "Novovarejo",
    role: "Junior Frontend Developer",
    period: "Aug 2021 – Apr 2022",
    color: "#f59e0b",
    bullets: [
      "Developed components in a micro-frontend architecture with React & GraphQL",
      "Contributed to an eCommerce platform specialising in automotive parts",
      "Improved UI consistency and component scalability",
    ],
  },
  {
    company: "Biopark",
    role: "IT Assistant",
    period: "Oct 2020 – May 2021",
    color: "#a855f7",
    bullets: [
      "Developed landing pages using PHP, HTML, SCSS and JavaScript",
      "Built the company website with React and integrated Strapi CMS",
      "Led migration from WordPress to Next.js for performance & scalability",
    ],
  },
];

const WORK = [
  {
    src: "images/RebindClassics.png",
    company: "Rebind Classics",
    href: "https://classics.rebindapp.com",
  },
  {
    src: "images/RebindBible.png",
    company: "Rebind Study Bible",
    href: "https://bible.rebindapp.com",
  },
  {
    src: "images/LoadsmartHomePage.png",
    company: "Loadsmart",
    href: "https://loadsmart.com",
  },
  {
    src: "images/LoadsmartShipperGuide.png",
    company: "Loadsmart ShipperGuide",
    href: "https://loadsmart.com/shipper/shipperguide/",
  },
  {
    src: "images/NovoVarejo.png",
    company: "Novovarejo E-Commerce",
    href: "https://loja.bariguiseminovos.com.br/",
  },
  {
    src: "images/Biopark.png",
    company: "Biopark",
    href: "https://biopark.com.br",
  },
];

const PROJECTS = [
  {
    title: "Court of Shadows",
    description:
      "Online multiplayer social deduction card game with real-time gameplay, matchmaking, and live game state synchronisation.",
    tags: ["React", "Next.js", "Socket.io", "Real-time"],
    href: "https://court-of-shadows.com",
    accent: "#7b2fff",
    accentRgb: "123,47,255",
  },
  {
    title: "Search Gift Ideas",
    description:
      "AI-powered gift recommendation platform generating personalised ideas via Llama 3.1 & Google Gemini, with Stripe subscriptions and Amazon Affiliate monetisation.",
    tags: ["Next.js", "TypeScript", "Llama 3.1", "Gemini", "Stripe"],
    href: "https://searchgiftideas.com",
    accent: "#00c8ff",
    accentRgb: "0,200,255",
  },
];

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue 3", "Nuxt.js", "TypeScript", "JavaScript", "HTML / CSS"],
  },
  {
    category: "Performance & SEO",
    items: ["Core Web Vitals", "PageSpeed Optimisation", "SEO", "Web Analytics"],
  },
  {
    category: "CMS & Platforms",
    items: ["Shopify", "HubSpot CMS", "Strapi", "Decap CMS", "WordPress"],
  },
  {
    category: "Data & Integrations",
    items: ["GraphQL", "REST APIs", "Mixpanel", "Google Tag Manager"],
  },
  {
    category: "Tooling",
    items: ["Git", "Node.js"],
  },
];

const NAV = ["about", "experience", "work", "projects", "skills", "contact"];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineReady, setSplineReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mount Spline only after first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => setSplineReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Cursor — only show after first mouse move to avoid (0,0) flash
  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
      if (!cursorVisible) setCursorVisible(true);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorVisible]);

  // Scroll reveal + active nav section
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.visible); }),
      { threshold: 0.12 }
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -50% 0px" }
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => revealObserver.observe(el));
    document.querySelectorAll("section[id]").forEach((el) => sectionObserver.observe(el));

    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={styles.cursor}
        style={{ opacity: cursorVisible ? 0.85 : 0 }}
        aria-hidden="true"
      />

      {/* Nav */}
      <nav className={`${styles.nav} ${scrollY > 60 ? styles.navScrolled : ""}`}>
        {scrollY > 60 && (
          <button className={styles.navLogo} onClick={() => scrollTo("hero")} aria-label="Go to top">
            ↑
          </button>
        )}
        <ul className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV.map((item) => (
            <li key={item}>
              <button
                className={`${styles.navLink} ${activeSection === item ? styles.navLinkActive : ""}`}
                onClick={() => scrollTo(item)}
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <a
              href="/Hugo_Leuchs_Frontend_Engineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navResume}
            >
              Resume ↗
            </a>
          </li>
        </ul>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ""}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ""}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ""}`} />
        </button>
      </nav>

      <main className={styles.main}>
        {/* ── HERO ─────────────────────────────── */}
        <section id="hero" className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true">
            <div className={styles.orb1} />
            <div className={styles.orb2} />
            <div className={styles.orb3} />
            <div className={styles.heroGrid} />
          </div>
          <div className={styles.heroNoise} aria-hidden="true" />

          {/* Spline full-bleed */}
          <div
            className={styles.heroSpline}
            style={{ transform: `translateY(${scrollY * 0.18}px)` }}
            aria-hidden="true"
          >
            {!splineLoaded && (
              <div className={styles.splineSkeleton}>
                <div className={styles.skeletonPulse} />
                <div className={styles.skeletonDots}>
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div className={`${styles.splineScene} ${splineLoaded ? styles.splineVisible : ""}`}>
              {splineReady && (
                <Spline
                  scene="https://prod.spline.design/3y2cbA4TrOjBFPEX/scene.splinecode"
                  onLoad={() => setSplineLoaded(true)}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>

          {/* Left gradient — ensures text legibility over Spline */}
          <div className={styles.heroReadabilityMask} aria-hidden="true" />

          {/* Text */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Available for new opportunities
            </div>
            <p className={styles.heroEyebrow}>Frontend Engineer · Toledo, Brazil</p>
            <h1 className={styles.heroTitle}>
              Hugo<br />Leuchs
            </h1>
            <div className={styles.heroSub}>
              <TypeAnimation
                sequence={[
                  "Building high-performance web platforms.",
                  2200,
                  "Crafting SEO-optimised experiences.",
                  2200,
                  "Obsessed with Core Web Vitals.",
                  2200,
                  "React · Next.js · TypeScript.",
                  2200,
                ]}
                repeat={Infinity}
                speed={65}
              />
            </div>
            <div className={styles.heroActions}>
              <button className={styles.btnPrimary} onClick={() => scrollTo("work")}>
                View my work
              </button>
              <a
                href="Hugo_Leuchs_Frontend_Engineer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                Download CV
              </a>
            </div>
          </div>

          <div className={styles.heroScroll} aria-hidden="true">
            <span>scroll</span>
            <div className={styles.scrollLine} />
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────── */}
        <section id="about" className={styles.section} data-section="about">
          <div className={styles.container}>
            <header className={`${styles.sectionHeader} ${styles.reveal}`}>
              <span className={styles.sectionNum}>01</span>
              <h2 className={styles.sectionTitle}>About</h2>
            </header>
            <div className={styles.aboutGrid}>
              <div className={`${styles.aboutText} ${styles.reveal}`}>
                <p className={styles.aboutLead}>
                  Frontend Engineer specialising in{" "}
                  <em>high-performance web platforms</em> and marketing websites.
                </p>
                <p>
                  I build scalable applications with React, Next.js, Vue and Nuxt —
                  collaborating closely with product and marketing teams to deliver
                  SEO-optimised experiences that drive traffic and conversions.
                </p>
                <p>
                  Proven track record leading website migrations, implementing
                  analytics infrastructure, and optimising web performance across
                  production environments.
                </p>
                <p className={styles.aboutEdu}>
                  Bachelor of Engineering — Universidade Tecnológica Federal do Paraná (2015–2022)
                </p>
              </div>
              <div className={`${styles.statsGrid} ${styles.reveal}`}>
                {[
                  { n: "5+", l: "Years experience" },
                  { n: "90+", l: "PageSpeed score" },
                  { n: "4", l: "Companies" },
                  { n: "2", l: "Live projects" },
                ].map(({ n, l }) => (
                  <div key={l} className={styles.stat}>
                    <span className={styles.statN}>{n}</span>
                    <span className={styles.statL}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────── */}
        <section id="experience" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <header className={`${styles.sectionHeader} ${styles.reveal}`}>
              <span className={styles.sectionNum}>02</span>
              <h2 className={styles.sectionTitle}>Experience</h2>
            </header>
            <div className={styles.timeline}>
              {EXPERIENCE.map((job, i) => (
                <div
                  key={i}
                  className={`${styles.timelineItem} ${styles.reveal}`}
                  style={{ "--accent": job.color }}
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineBody}>
                    <div className={styles.timelineTop}>
                      <h3 className={styles.timelineCo}>{job.company}</h3>
                      <span className={styles.timelinePeriod}>{job.period}</span>
                    </div>
                    <p className={styles.timelineRole}>{job.role}</p>
                    <ul className={styles.timelineBullets}>
                      {job.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORK ─────────────────────────────── */}
        <section id="work" className={styles.section}>
          <div className={styles.container}>
            <header className={`${styles.sectionHeader} ${styles.reveal}`}>
              <span className={styles.sectionNum}>03</span>
              <h2 className={styles.sectionTitle}>Work</h2>
            </header>
            <div className={styles.workGrid}>
              {WORK.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.workCard} ${styles.reveal}`}
                >
                  <Image src={item.src} alt={item.company} fill className={styles.workCardImg} />
                  <div className={styles.workCardFooter}>
                    <span className={styles.workCardName}>{item.company}</span>
                    <span className={styles.workCardArrow}>↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────── */}
        <section id="projects" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <header className={`${styles.sectionHeader} ${styles.reveal}`}>
              <span className={styles.sectionNum}>04</span>
              <h2 className={styles.sectionTitle}>Projects</h2>
            </header>
            <div className={styles.projectsGrid}>
              {PROJECTS.map((p, i) => (
                <a
                  key={i}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.projectCard} ${styles.reveal}`}
                  style={{ "--pa": p.accent, "--pa-rgb": p.accentRgb }}
                >
                  <div className={styles.projectGlow} aria-hidden="true" />
                  <div className={styles.projectInner}>
                    <span className={styles.projectNum}>0{i + 1}</span>
                    <h3 className={styles.projectTitle}>{p.title}</h3>
                    <p className={styles.projectDesc}>{p.description}</p>
                    <div className={styles.projectTags}>
                      {p.tags.map((t) => (
                        <span key={t} className={styles.projectTag}>{t}</span>
                      ))}
                    </div>
                    <span className={styles.projectCta}>Visit site ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────── */}
        <section id="skills" className={styles.section}>
          <div className={styles.container}>
            <header className={`${styles.sectionHeader} ${styles.reveal}`}>
              <span className={styles.sectionNum}>05</span>
              <h2 className={styles.sectionTitle}>Skills</h2>
            </header>
            <div className={styles.skillsCategories}>
              {SKILLS.map((group) => (
                <div key={group.category} className={`${styles.skillGroup} ${styles.reveal}`}>
                  <p className={styles.skillGroupLabel}>{group.category}</p>
                  <div className={styles.skillTags}>
                    {group.items.map((s) => (
                      <span key={s} className={styles.skillTag}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────── */}
        <section id="contact" className={`${styles.section} ${styles.sectionContact}`}>
          <div className={styles.container}>
            <div className={`${styles.contactWrap} ${styles.reveal}`}>
              <span className={styles.sectionNum}>06</span>
              <h2 className={styles.contactTitle}>
                Let&apos;s build<br />something great.
              </h2>
              <p className={styles.contactSub}>Open to new opportunities and interesting projects.</p>
              <div className={styles.contactLinks}>
                <a href="mailto:hugoandradeleuchs@hotmail.com" className={styles.contactLink}>
                  hugoandradeleuchs@hotmail.com
                </a>
                <a
                  href="https://api.whatsapp.com/send?l=pt_br&phone=5544998896630"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  +55 (44) 9 9889-6630
                </a>
              </div>
              <div className={styles.contactSocials}>
                <a href="https://github.com/HugoALeuchs" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  GitHub
                </a>
                <span className={styles.socialDivider} />
                <a href="https://www.linkedin.com/in/hugo-leuchs/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  LinkedIn
                </a>
                <span className={styles.socialDivider} />
                <a href="/Hugo_Leuchs_Frontend_Engineer_Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  Resume PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© {new Date().getFullYear()} Hugo Leuchs</span>
          <span className={styles.footerRight}>Designed & built by Hugo Leuchs</span>
        </div>
      </footer>
    </>
  );
}
