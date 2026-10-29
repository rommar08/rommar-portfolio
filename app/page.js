"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/* ---------- content & assets (edit here) ---------- */
const SPOTIFY = "https://open.spotify.com/playlist/6HrWwuC0oni3Nfs6o9Nj8s?si=3m_3Wd1ATAq9UBg9s-q-iw";
const EMAIL = "rommarsamonte08@gmail.com";
const WEB3KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "d7d9380b-13c5-4334-aa0e-18b4667702b1";
const pfpSrc = "/images/pfp.png"; // replace with your own background-removed PNG
const svpiLogo = "/images/svpi-logo.jpg";
const froilanLogo = "/images/froilan-logo.jpg";
const aclcLogo = "/images/aclc-logo.jpg";
const ucnLogo = "/images/ucn-logo.jpg";
const CERT = "/images/certificate.jpg";
const RESUME = "/Rommar_Samonte_Resume.pdf";
const AWARDS = []; // e.g. ["/images/award1.jpg", "/images/award2.jpg"]
const EASE = [0.2, 0.8, 0.2, 1];

const EDU = [
  [svpiLogo, "San Vicente Parochial Inc.", "Junior High School", "2020 - 2022"],
  [froilanLogo, "Froilan D. Lopez High School", "Junior High School", "2022 - 2024"],
  [aclcLogo, "ACLC College of Daet", "Senior High School - TVL CSS Strand", "2024 - 2026"],
  [ucnLogo, "University Of Camarines Norte", "Bachelor of Science in Information Technology", "Current"],
];
const TRACKS = [["It’s Me","ILLIT"],["Magnetic","ILLIT"],["Psycho","BABYMONSTER"],["Drip","BABYMONSTER"],["GO!","CORTIS"],["REDRED","CORTIS"],["FaSHioN","CORTIS"],["DAM","SB19"],["VISA","SB19"],["DUNGKA!","SB19"]];
const TABS = ["Projects", "Certificates", "Achievements", "Knowledge in Tech"];

const P = {
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v6h6M12 18v-6m-3 3 3 3 3-3"/>',
  arrow: '<path d="m9 18 6-6-6-6"/>',
  ig: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  spotify: '<circle cx="12" cy="12" r="10"/><path d="M7 9.5c3.5-1 7-.7 10 1M7.5 12.5c3-.8 6-.5 8.5.9M8 15.3c2.5-.6 5-.3 7 .8"/>',
  play: '<path d="m6 4 14 8-14 8z" fill="currentColor"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  dl: '<path d="M12 3v12m-4-4 4 4 4-4M4 21h16"/>',
  full: '<path d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5"/>',
  gh: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  trophy: '<path d="M20 8h24v14a12 12 0 0 1-24 0zM20 12h-8c0 8 3 12 9 13M44 12h8c0 8-3 12-9 13M32 34v10M22 56h20M26 44h12v12H26z"/>',
};
const Icon = ({ n, s = 24 }) => (
  <svg width={s} height={s} viewBox={n === "trophy" ? "0 0 64 64" : "0 0 24 24"} fill="none" stroke="currentColor" strokeWidth={n === "trophy" ? 1.5 : 1.6} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: P[n] }} />
);
const JAVA = '<svg viewBox="0 0 48 48" width="SZ" height="SZ" fill="none" stroke="#F89820" stroke-width="3" stroke-linecap="round"><path d="M10 24h22v8a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8z"/><path d="M32 26h3a4 4 0 0 1 0 8h-3"/><path d="M18 8c4 3-4 5 0 9M25 8c4 3-4 5 0 9"/></svg>';
const TECH = [
  ["Java", "#F89820", JAVA.replace(/SZ/g, "50")],
  ["JavaScript", "#F7DF1E", '<svg viewBox="0 0 48 48" width="50" height="50"><rect width="48" height="48" rx="6" fill="#F7DF1E"/><text x="43" y="43" font-size="22" font-weight="800" font-family="Arial" text-anchor="end" fill="#000">JS</text></svg>'],
  ["CSS", "#2965F1", '<svg viewBox="0 0 48 48" width="50" height="50"><path d="M7 4h34l-3 34-14 6-14-6z" fill="#2965F1"/><text x="24" y="30" font-size="14" font-weight="700" font-family="Arial" text-anchor="middle" fill="#fff">CSS</text></svg>'],
  ["HTML", "#E34F26", '<svg viewBox="0 0 48 48" width="50" height="50"><path d="M7 4h34l-3 34-14 6-14-6z" fill="#E34F26"/><text x="24" y="30" font-size="13" font-weight="700" font-family="Arial" text-anchor="middle" fill="#fff">HTML</text></svg>'],
  ["GitHub", "#b9aef0", `<svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${P.gh}</svg>`],
  ["Vercel", "#b9aef0", '<svg viewBox="0 0 48 48" width="50" height="50"><path d="M24 8 42 40H6z" fill="currentColor"/></svg>'],
  ["Gemini", "#8AB4F8", '<svg viewBox="0 0 48 48" width="50" height="50"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset="1" stop-color="#C084FC"/></linearGradient></defs><path d="M24 2C25 14 34 23 46 24 34 25 25 34 24 46 23 34 14 25 2 24 14 23 23 14 24 2Z" fill="url(#gg)"/></svg>'],
  ["Claude", "#D97757", '<svg viewBox="0 0 48 48" width="50" height="50" stroke="#D97757" stroke-width="5" stroke-linecap="round"><path d="M24 5v38M5 24h38M10.5 10.5l27 27M37.5 10.5l-27 27M15 6.5l18 35M33 6.5l-18 35M6.5 15l35 18M6.5 33l35-18"/></svg>'],
];

/* ---------- small building blocks ---------- */
const glow = (e) => {
  const b = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", e.clientX - b.left + "px");
  e.currentTarget.style.setProperty("--my", e.clientY - b.top + "px");
};
const Card = ({ as: T = "div", className = "", children, ...p }) => (
  <T className={"card " + className} onPointerMove={glow} {...p}>{children}</T>
);
const Reveal = ({ children, className = "", delay = 0, as: T = motion.div }) => (
  <T className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1, ease: EASE, delay }}>{children}</T>
);
/* mask reveal: each word slides up out of its own clipping box, staggered.
   The visibility check runs on the (never clipped) wrapper, not on the hidden word. */
function Word({ w, grad, delay }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.1 });
  return (
    <span ref={ref} className="w">
      <motion.span className={grad ? "gr" : ""} style={{ display: "inline-block" }} initial={false} animate={{ y: seen ? 0 : "112%" }} transition={{ duration: 1, ease: EASE, delay }}>{w}</motion.span>
    </span>
  );
}
const Split = ({ text, grad = false, delay = 0 }) =>
  text.split(" ").map((w, i) => (
    <Fragment key={i}><Word w={w} grad={grad} delay={delay + i * 0.07} />{" "}</Fragment>
  ));
function Magnetic({ children }) {
  const x = useSpring(0, { stiffness: 220, damping: 16 }), y = useSpring(0, { stiffness: 220, damping: 16 });
  return (
    <motion.div className="inline-block" style={{ x, y }}
      onPointerMove={(e) => { if (e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.4); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}
function Tilt({ children }) {
  const rx = useSpring(0, { stiffness: 80, damping: 16 }), ry = useSpring(0, { stiffness: 80, damping: 16 });
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = (e) => {
      ry.set((e.clientX / innerWidth - 0.5) * 36); rx.set(-(e.clientY / innerHeight - 0.5) * 28);
      document.documentElement.style.setProperty("--ax", e.clientX + "px"); document.documentElement.style.setProperty("--ay", e.clientY + "px");
    };
    addEventListener("pointermove", f); return () => removeEventListener("pointermove", f);
  }, [rx, ry]);
  return <div style={{ perspective: 1200 }} className="grid place-items-center"><motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative w-[min(70vw,17rem)] lg:w-[20rem]">{children}</motion.div></div>;
}
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    document.body.classList.add("cc");
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const mv = (e) => { mx = e.clientX; my = e.clientY; dot.current.style.transform = `translate(${mx}px,${my}px)`; ring.current.classList.toggle("big", !!e.target.closest("a,button,input,textarea,label")); };
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.current.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    addEventListener("pointermove", mv); loop();
    return () => { removeEventListener("pointermove", mv); cancelAnimationFrame(raf); document.body.classList.remove("cc"); };
  }, []);
  return <><div id="cur" ref={dot} /><div id="ring" ref={ring} /></>;
}
const Pill = ({ children, ...p }) => <Card as="button" className="px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2" {...p}>{children}</Card>;

/* ---------- page ---------- */
export default function Page() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(null); // "cert" | "awards" | null
  const [autoFs, setAutoFs] = useState(false);
  const [statMsg, setStatMsg] = useState("");
  const [status, setStatus] = useState("");
  const imgRef = useRef(null);

  useEffect(() => { try { const s = localStorage.getItem("theme"); if (s) setDark(s === "d"); } catch (e) {} }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  const toggle = () => { const t = !dark; setDark(t); try { localStorage.setItem("theme", t ? "d" : "l"); } catch (e) {} };
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    const k = (e) => e.key === "Escape" && setModal(null);
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [modal]);
  const fullscreen = () => { const i = imgRef.current; if (!i) return; (i.requestFullscreen || i.webkitRequestFullscreen)?.call(i); };
  useEffect(() => { if (modal === "cert" && autoFs) { fullscreen(); setAutoFs(false); } }, [modal, autoFs]);
  const openCert = (fs = false) => { setAutoFs(fs); setModal("cert"); };

  async function send(e) {
    e.preventDefault();
    const f = e.currentTarget, d = Object.fromEntries(new FormData(f));
    if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.message.trim()) return setStatus("Please fill in your name, a valid email and a message.");
    const mail = () => { location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + d.name)}&body=${encodeURIComponent(d.message + "\n\n" + d.name + " (" + d.email + ")")}`; setStatus("Opening your email app to send…"); };
    if (!WEB3KEY) return mail();
    setStatus("Sending…");
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: WEB3KEY, name: d.name, email: d.email, message: d.message, subject: "Portfolio message from " + d.name }) });
      const j = await r.json(); if (!j.success) throw new Error(); setStatus("Message sent. Thank you!"); f.reset();
    } catch (x) { mail(); }
  }

  const nav = "px-2.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13px] hover:opacity-60 transition whitespace-nowrap";
  const sec = "max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28";
  return (
    <main>
      <div className="amb" /><div className="grain" /><Cursor />

      <nav className="card fixed left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 rounded-full px-1.5 py-1 max-w-[calc(100vw-1rem)]" style={{ top: "calc(env(safe-area-inset-top,0px) + 10px)" }}>
        <a href="#home" className={nav}>Home</a><a href="#about" className={nav}>About Me</a><a href="#portfolio" className={nav}>Portfolio</a><a href="#contact" className={nav}>Contact</a>
        <button onClick={toggle} aria-label="Toggle dark and light mode" className="w-9 h-9 grid place-items-center rounded-full hover:opacity-60 transition shrink-0"><Icon n={dark ? "sun" : "moon"} s={20} /></button>
      </nav>

      {/* HOME */}
      <header id="home" className="min-h-screen max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 min-w-0">
          <h1 className="d font-bold text-4xl md:text-6xl"><Split text="Rommar" /><Split text="Talento" grad delay={0.07} /><Split text="Samonte" delay={0.14} /></h1>
          <Reveal className="mt-8 text-lg sm:text-2xl mut font-light tracking-wide" delay={0.3}>Aspiring Back End Developer</Reveal>
          <Reveal className="mt-4 inline-flex items-center gap-2 mut text-sm" delay={0.4}><Icon n="pin" s={18} />Daet, Camarines Norte, Philippines</Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-3 sm:gap-4" delay={0.5}>
            <Magnetic><a href={RESUME} download="Rommar_Samonte_Resume.pdf" className="btn b1">Get Resume</a></Magnetic>
            <Magnetic><a href="#contact" className="btn b2">Email Me</a></Magnetic>
          </Reveal>
        </div>
        <Reveal className="md:col-span-5 py-6">
          <Tilt>
            <div className="fl" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute inset-[8%] rounded-full blur-3xl opacity-70" style={{ background: "radial-gradient(circle,rgba(150,120,240,.55),rgba(100,150,230,.2) 60%,transparent 75%)", transform: "translateZ(-40px)" }} />
              <img src={pfpSrc} alt="Rommar T. Samonte" className="relative w-full block bg-transparent" style={{ WebkitMaskImage: "linear-gradient(#000 80%,transparent)", maskImage: "linear-gradient(#000 80%,transparent)", transform: "translateZ(30px)", filter: "drop-shadow(0 20px 30px rgba(0,0,0,.35))" }} />
              <Card className="absolute left-0 top-[14%] p-2.5 rounded-xl" style={{ transform: "translateZ(90px)" }} title="Java"><span dangerouslySetInnerHTML={{ __html: JAVA.replace(/SZ/g, "30") }} /></Card>
              <Card className="absolute right-0 bottom-[22%] p-2.5 rounded-xl" style={{ transform: "translateZ(120px)" }} title="GitHub"><Icon n="gh" s={30} /></Card>
            </div>
          </Tilt>
        </Reveal>
      </header>
      <hr className="hair max-w-7xl mx-auto" />

      {/* ABOUT ME */}
      <section id="about" className={sec}>
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-5 min-w-0">
            <Reveal><p className="eyebrow mb-6">About Me</p></Reveal>
            <h2 className="d font-bold text-3xl md:text-4xl lg:text-5xl"><Split text="Hi, I’m Rommar T. Samonte" /></h2>
            <Reveal className="inline-block mt-8"><Magnetic><Card as="a" href={RESUME} download="Rommar_Samonte_Resume.pdf" aria-label="Download resume" title="Download resume" className="w-14 h-14 grid place-items-center rounded-full"><Icon n="file" /></Card></Magnetic></Reveal>
          </div>
          <Reveal className="md:col-span-3">
            <div className="mx-auto w-48 sm:w-56 md:w-full max-w-[16rem] relative">
              <div className="absolute inset-0 blur-3xl opacity-40" style={{ background: "radial-gradient(circle,rgba(150,120,240,.6),transparent 70%)" }} />
              <img src={pfpSrc} alt="Rommar T. Samonte profile photo" className="relative w-full block bg-transparent" style={{ WebkitMaskImage: "linear-gradient(#000 82%,transparent)", maskImage: "linear-gradient(#000 82%,transparent)" }} />
            </div>
          </Reveal>
          <Reveal as={motion.p} className="md:col-span-4 mut leading-[1.9] text-[15px]">I’m a 1st-year Bachelor of Science in Information Technology (BSIT) student and an aspiring professional in the IT field, based in Daet, Camarines Norte. I’m building a strong foundation in programming with a focus on back-end development, and I enjoy learning new tools and turning ideas into working software.</Reveal>
        </div>

        <div className="mt-20 md:mt-28 md:ml-[8%] max-w-4xl">
          <Reveal><p className="eyebrow mb-8">Education</p></Reveal>
          <Reveal as={motion.ol} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EDU.map((e) => (
              <Card as="li" key={e[1]} className="flex items-center gap-3 p-3">
                <span className="shrink-0 w-12 h-12 rounded-lg overflow-hidden grid place-items-center bg-white"><img src={e[0]} alt={e[1] + " logo"} className="w-full h-full object-contain" /></span>
                <span className="min-w-0"><span className="block font-medium">{e[1]}</span><span className="block text-sm mut">{e[2]}</span><span className="block eyebrow !text-[.62rem] mt-1">{e[3]}</span></span>
              </Card>
            ))}
          </Reveal>
          <Reveal className="grid grid-cols-3 gap-3 sm:gap-4 mt-10">
            {[["0", "Projects", () => setStatMsg("in the process of creating something")], ["1", "Certificates", () => { setStatMsg(""); openCert(); }], ["2", "Awards", () => { setStatMsg(""); setModal("awards"); }]].map(([n, l, fn]) => (
              <Card as="button" key={l} onClick={fn} className="p-4 sm:p-6 text-left"><div className="d text-4xl sm:text-5xl font-bold gt">{n}</div><div className="mt-3 eyebrow !tracking-[.18em] !text-[.62rem]">{l}</div></Card>
            ))}
          </Reveal>
          <p className="mt-5 min-h-6 mut" aria-live="polite">{statMsg}</p>
        </div>
      </section>
      <hr className="hair max-w-7xl mx-auto" />

      {/* HOBBIES */}
      <section className={sec + " grid md:grid-cols-12 gap-12 items-end"}>
        <div className="md:col-span-7 min-w-0">
          <h2 className="d font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl"><Split text="A little music." /><br /><Split text="A lot of ideas." grad delay={0.2} /></h2>
          <Magnetic><a href={SPOTIFY} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 group">
            <span className="text-[#1DB954]"><Icon n="spotify" s={30} /></span><span className="eyebrow !text-[var(--fg)]">My Daily Rotation on Spotify</span><span className="group-hover:translate-x-1.5 transition"><Icon n="arrow" s={18} /></span>
          </a></Magnetic>
        </div>
        <Reveal className="md:col-span-5">
          <Card className="p-3 sm:p-4">
            <a href={SPOTIFY} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 pb-3 mb-1 border-b" style={{ borderColor: "var(--line)" }}><span className="text-[#1DB954]"><Icon n="spotify" s={30} /></span><span className="font-medium">My Daily Rotation</span></a>
            <ul className="max-h-80 overflow-y-auto">
              {TRACKS.map((t, i) => (
                <li key={t[0] + i}><a href={SPOTIFY} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-[rgba(170,150,255,.1)] transition">
                  <span className="w-5 text-right text-xs mut group-hover:hidden">{i + 1}</span><span className="w-5 hidden group-hover:block text-[#1DB954]"><Icon n="play" s={14} /></span>
                  <span className="min-w-0"><span className="block font-medium">{t[0]}</span><span className="text-sm mut">{t[1]}</span></span></a></li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </section>
      <hr className="hair max-w-7xl mx-auto" />

      {/* PORTFOLIO */}
      <section id="portfolio" className={sec}>
        <Reveal><p className="eyebrow mb-6">Portfolio</p></Reveal>
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t, j) => <button key={t} onClick={() => setTab(j)} className={`btn !py-2.5 !px-5 !text-[.68rem] ${j === tab ? "b1" : "b2"}`}>{t}</button>)}
        </div>
        <Card className="p-5 sm:p-8 min-h-48">
          {tab === 0 && <p className="mut">Nothing to display yet</p>}
          {tab === 2 && <p className="mut">Nothing to show up yet</p>}
          {tab === 1 && (
            <div className="max-w-md">
              <Card as="button" onClick={() => openCert()} aria-label="View certificate full screen" className="block w-full"><img src={CERT} alt="Certificate of Attendance - Basic Java Programming" className="w-full block" /></Card>
              <div className="mt-4 flex flex-wrap gap-3">
                <Pill onClick={() => openCert(true)}><Icon n="full" s={16} />View full screen</Pill>
                <Card as="a" href={CERT} download="Rommar_Samonte_Certificate.jpg" className="px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"><Icon n="dl" s={16} />Download</Card>
              </div>
            </div>
          )}
          {tab === 3 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {TECH.map((t) => (
                <Card key={t[0]} className="tech flex flex-col items-center gap-4 p-5 sm:p-7" style={{ "--c": t[1] }}>
                  <span style={{ color: t[1] }} dangerouslySetInnerHTML={{ __html: t[2] }} /><span className="text-sm font-medium">{t[0]}</span>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </section>
      <hr className="hair max-w-7xl mx-auto" />

      {/* CONTACT */}
      <section id="contact" className={sec}>
        <Reveal><p className="eyebrow mb-6">Contact</p></Reveal>
        <div className="grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <Card as="div" className="p-6 sm:p-10">
              <form onSubmit={send} noValidate className="space-y-6">
                <label><span className="eyebrow">Name</span><input name="name" required autoComplete="name" /></label>
                <label><span className="eyebrow">Email</span><input name="email" type="email" required autoComplete="email" /></label>
                <label><span className="eyebrow">Message</span><textarea name="message" rows={5} required /></label>
                <div className="flex flex-wrap items-center gap-4"><Magnetic><button type="submit" className="btn b1">Send Message</button></Magnetic><p className="text-sm mut" aria-live="polite">{status}</p></div>
              </form>
            </Card>
          </Reveal>
          <div className="md:col-span-5 space-y-4 md:mt-16">
            <Reveal><Card as="a" href="https://www.instagram.com/rommarsamonte" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-6"><span className="text-[#E4405F] shrink-0"><Icon n="ig" s={34} /></span><span className="min-w-0"><span className="block font-medium">Instagram</span><span className="text-sm mut">@rommarsamonte</span></span></Card></Reveal>
            <Reveal><Card as="a" href="https://www.facebook.com/SamonteMar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-6"><span className="text-[#1877F2] shrink-0"><Icon n="fb" s={34} /></span><span className="min-w-0"><span className="block font-medium">Facebook</span><span className="text-sm mut">Rommar Samonte</span></span></Card></Reveal>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-[60] p-4 overflow-y-auto" style={{ background: "rgba(5,5,8,.85)", backdropFilter: "blur(10px)" }} role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <button onClick={() => setModal(null)} aria-label="Close" className="card fixed right-4 w-10 h-10 rounded-full text-2xl leading-none" style={{ top: "calc(env(safe-area-inset-top,0px) + 16px)", color: "#fff" }}>×</button>
          <div className="max-w-3xl mx-auto mt-16 space-y-5" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
            {modal === "cert" ? (
              <>
                <img ref={imgRef} src={CERT} alt="Certificate of Attendance" className="w-full rounded-2xl" />
                <div className="flex flex-wrap gap-3 justify-center text-white">
                  <Pill onClick={fullscreen}><Icon n="full" s={16} />Full screen</Pill>
                  <Card as="a" href={CERT} download="Rommar_Samonte_Certificate.jpg" className="px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"><Icon n="dl" s={16} />Download</Card>
                </div>
              </>
            ) : AWARDS.length ? AWARDS.map((s, i) => <img key={s} src={s} alt={`Award ${i + 1}`} className="w-full rounded-2xl" />) : [1, 2].map((n) => (
              <Card key={n} className="relative">
                <div className="sh absolute inset-0" />
                <div className="aspect-[4/3] grid place-items-center text-[#b9aef0] opacity-70"><Icon n="trophy" s={96} /></div>
                <div className="relative text-center pb-4 eyebrow !text-[.62rem]">Award {n} · photo coming soon</div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
