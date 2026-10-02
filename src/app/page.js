"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { fetchData } from "./utils/fetchData";

const Icons = { ...FaIcons, ...SiIcons };
const G = [
  ["#ffd3e4", "#e9d8ff"], ["#cde7ff", "#d8f7e8"], ["#fff3bf", "#ffd9e6"],
  ["#d8f7e8", "#cde7ff"], ["#e0d4ff", "#ffe2cc"], ["#ffe2cc", "#fff3bf"],
];
const grad = (i) => `linear-gradient(135deg, ${G[i % G.length][0]}, ${G[i % G.length][1]})`;
const TABS = [
  { id: "home", label: "Home", icon: "FaTicketAlt" },
  { id: "projects", label: "Projects", icon: "FaDharmachakra" },
  { id: "experience", label: "Education & Exp.", icon: "FaBriefcase" },
  { id: "skills", label: "Skills", icon: "FaHorse" },
];
const SOCIAL = [
  ["FaGithub", "https://github.com/sygoh0909"],
  ["FaLinkedin", "https://www.linkedin.com/in/shu-yi-goh-384021346/"],
  ["FaInstagram", "https://www.instagram.com/shu_yi_0909"],
];
const catTitle = { languages: "Languages", frameworks: "Frameworks & Libraries", databases: "Databases & Tools", platforms: "Software & Platforms", otherSkills: "Other Skills" };

// ───────────── Shared bits ─────────────
// stretches to 100% of the parent and ends up hidden/offset — so derive it from the width.
const Balloon = ({ className = "" }) => (
  <svg viewBox="0 0 100 140" className={className}>
    <path d="M30 90L42 120M70 90L58 120" stroke="#d9c6ff" strokeWidth="3" />
    <ellipse cx="50" cy="50" rx="40" ry="46" fill="#ffc2da" /><ellipse cx="50" cy="50" rx="24" ry="46" fill="#fff3bf" /><ellipse cx="50" cy="50" rx="10" ry="46" fill="#cde7ff" />
    <rect x="38" y="118" width="24" height="18" rx="5" fill="#f3c7a3" />
  </svg>
);
const ICONS = ["FaBook","FaGamepad","FaGlobe","FaCarrot","FaLaptopCode","FaProjectDiagram","FaHome","FaBalanceScale","FaSeedling","FaFileAlt","FaChartLine","FaTshirt","FaWallet","FaHeart","FaBell"];
const THEMES = [
  { bg: "radial-gradient(#fff9 2px,transparent 2.5px) 0 0/18px 18px, linear-gradient(135deg,#ffd3e4,#e9d8ff)" },
  { bg: "linear-gradient(#fff7 1px,transparent 1px) 0 0/20px 20px, linear-gradient(90deg,#fff7 1px,transparent 1px) 0 0/20px 20px, linear-gradient(135deg,#cde7ff,#d8f7e8)" },
  { bg: "repeating-linear-gradient(45deg,#fff6 0 10px,transparent 10px 20px), linear-gradient(135deg,#fff3bf,#ffd9e6)" },
  { bg: "radial-gradient(circle at 50% 100%,transparent 11px,#fff7 12px 14px,transparent 15px) 0 0/28px 16px, linear-gradient(160deg,#d8f7e8,#cde7ff)" },
  { bg: "conic-gradient(#fff5 25%,transparent 0 50%,#fff5 0 75%,transparent 0) 0 0/24px 24px, linear-gradient(135deg,#e0d4ff,#ffe2cc)" },
  { bg: "radial-gradient(circle at 80% 20%,#fff9 0,transparent 40%), linear-gradient(160deg,#ffe2cc,#ffc2da)" },
  { bg: "radial-gradient(circle at 20% 80%,#fff9 0,transparent 45%), linear-gradient(135deg,#d8f7e8,#fff3bf)" },
  { bg: "radial-gradient(circle at 10% 10%,#fffa 0,transparent 40%), linear-gradient(135deg,#bfe0ff,#e0d4ff 60%,#ffd3e4)" },
];
const theme = (i) => THEMES[i % THEMES.length];
const ProjIcon = ({ i, className }) => { const I = Icons[ICONS[i % ICONS.length]]; return <I className={className} />; };

// ───────────── Welcome room ─────────────
const Obj = ({ to, label, sub, cx, cy, lx, ly, go, children }) => (
  <g className="obj" role="button" tabIndex={0} aria-label={label} onClick={(e) => go(to, e.currentTarget)} onKeyDown={(e) => e.key === "Enter" && go(to, e.currentTarget)}>
    {children}
    <g transform={`translate(${lx} ${ly})`}>
      <rect x={-(label.length * 7 + 22)} y="-20" width={label.length * 14 + 44} height="38" rx="19" fill="#fff" stroke="#e7d9ff" strokeWidth="3" />
      <text textAnchor="middle" y="7" className="hand" fontSize="26" fill="#5b4a6b">{label}</text>
      {sub && <text textAnchor="middle" y="42" fontSize="15" fontWeight="700" fill="#8d7ba0">{sub}</text>}
    </g>
  </g>
);

const Horse = ({ x, y, c, mane = "#e0d4ff", k = 0.72 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`} stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
    <path d="M-16 8v18M-6 10v16M10 10v16M20 8v18" stroke={c} strokeWidth="6" />
    <path d="M-24 -8Q-40 -4 -34 16" stroke={mane} strokeWidth="6" fill="none" />
    <path d="M-24 -4Q-26 -18 -10 -18H14Q26 -18 26 -6Q26 8 14 10H-10Q-24 10 -24 -4Z" fill={c} />
    <path d="M16 -14L22 -36Q24 -44 34 -42L46 -30Q50 -24 42 -22L32 -20L28 -6Z" fill={c} />
    <path d="M22 -38L24 -48L30 -42Z" fill={c} />
    <path d="M18 -16Q10 -30 18 -42" stroke={mane} strokeWidth="6" fill="none" />
    <rect x="-8" y="-21" width="20" height="8" rx="4" fill="#fff3bf" />
    <circle cx="35" cy="-33" r="2" fill="#5b4a6b" stroke="none" />
  </g>
);

const Desk = ({ onOpen }) => {
  const narrow = useNarrow();
  const T = (t) => (narrow ? t : undefined);
  const [zoom, setZoom] = useState(null);
  const [fly, setFly] = useState(false);
  const go = (to, el) => { if (to === "experience") { if (!fly) { setFly(true); setTimeout(() => onOpen("experience"), 1600); } return; } if (!el) return setZoom({ to, o: "50% 50%" }); const r = el.getBoundingClientRect(); setZoom({ to, o: `${r.left + r.width / 2}px ${r.top + r.height / 2}px` }); };
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 });
  const far = useTransform(sx, [-1, 1], [10, -10]), mid = useTransform(sx, [-1, 1], [-8, 8]), near = useTransform(sx, [-1, 1], [-26, 26]);
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 2 - 1); my.set(((e.clientY - r.top) / r.height) * 2 - 1); };
  const leave = () => { mx.set(0); my.set(0); };
  const cab = ["#ffc2da", "#cde7ff", "#fff3bf", "#d8f7e8", "#e0d4ff", "#ffe2cc", "#ffc2da", "#cde7ff"];
  const horseC = ["#ffc2da", "#cde7ff", "#fff3bf", "#d8f7e8", "#e0d4ff"];
  return (
    <motion.div className="fixed inset-0 overflow-hidden" exit={{ opacity: 0 }}>
      {fly && <motion.div className="absolute inset-0 z-20 grid place-items-center pointer-events-none" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><span className="hand text-5xl sm:text-6xl font-bold glass rounded-full px-8 py-3">Bringing you up to my journey…</span></motion.div>}
      <div className="absolute top-4 left-4 z-10 glass rounded-full pl-3 pr-5 py-1.5 flex items-center gap-2">
        <span className="hand text-2xl font-bold leading-none">Shu Yi&apos;s Playground</span>
        <span className="hidden sm:inline text-xs font-bold text-[color:var(--ink-soft)]">· tap a ride to explore</span>
      </div>
      <motion.div className="absolute inset-0" onMouseMove={move} onMouseLeave={leave} animate={zoom ? { scale: 2.6, opacity: 0 } : { scale: 1, opacity: 1 }} style={{ transformOrigin: zoom?.o }} transition={{ duration: 0.75, ease: [0.5, 0, 0.75, 0] }} onAnimationComplete={() => zoom && onOpen(zoom.to)}>
        <svg viewBox={narrow ? "0 0 600 1300" : "0 0 1100 740"} preserveAspectRatio="xMidYMid meet" className="w-full h-full block">
          <defs>
            <linearGradient id="pskyg" x1="0" y1="0" x2="0" y2={narrow ? 900 : 740} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#bfe0ff" /><stop offset=".7" stopColor="#ffe9f3" /><stop offset="1" stopColor="#fff6dc" /></linearGradient>
            <linearGradient id="coverg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffc2da" /><stop offset=".55" stopColor="#d9c6ff" /><stop offset="1" stopColor="#bfe0ff" /></linearGradient>
          </defs>
          <rect x="-3000" y="-2000" width="7000" height="5000" fill="url(#pskyg)" />
          {/* far layer: sun, clouds, balloons, far hills */}
          <motion.g style={{ x: far }} animate={{ y: fly ? 260 : 0 }} transition={{ duration: 1.6, ease: "easeIn" }}>
            <circle cx={narrow ? 510 : 930} cy={narrow ? 110 : 130} r="48" fill="#fff3bf" /><circle cx={narrow ? 510 : 930} cy={narrow ? 110 : 130} r="66" fill="#fff3bf" opacity=".4" />
            {(narrow ? [[100, 170, 1], [330, 60, 0.8], [540, 290, 0.6]] : [[170, 120, 1], [560, 90, 0.8], [820, 210, 0.7]]).map(([x, y, k], i) => (
              <g key={i} className="drift" style={{ animationDelay: `${-i * 7}s` }} fill="#fff"><ellipse cx={x} cy={y} rx={60 * k} ry={20 * k} /><ellipse cx={x - 30 * k} cy={y + 6} rx={34 * k} ry={16 * k} /><ellipse cx={x + 32 * k} cy={y + 6} rx={38 * k} ry={17 * k} /></g>
            ))}
            
            <path d="M-3000 470H-100Q150 400 400 460T900 450T1300 440H4000V3000H-3000Z" fill="#d6f2e3" transform={T("translate(0 330)")} />
          </motion.g>

          <motion.g style={{ x: mid }} animate={{ y: fly ? 480 : 0 }} transition={{ duration: 1.6, ease: "easeIn" }}><path d="M-3000 520H-100Q250 470 560 520T1300 510H4000V3000H-3000Z" fill="#bfe9cf" transform={T("translate(0 330)")} /></motion.g>
          {/* near layer: front grass, pond + trees */}
          <motion.g style={{ x: near }} animate={{ y: fly ? 800 : 0 }} transition={{ duration: 1.6, ease: "easeIn" }}>
            <path d="M-3000 590H-100Q300 560 600 595T1300 585H4000V3000H-3000Z" fill="#a8e0bf" transform={T("translate(0 330)")} />
            {!narrow && <path d="M395 740L492 628H548L645 740Z" fill="#ffe4d2" />}
            {(narrow ? [[580, 800], [-10, 1200]] : [[-10, 560], [1090, 575]]).map(([x, y], i) => <g key={i}><rect x={x - 6} y={y} width="12" height="50" rx="5" fill="#f3c7a3" /><circle cx={x} cy={y - 8} r="38" fill="#9edcb8" stroke="#fff" strokeWidth="3" /><circle cx={x - 12} cy={y - 14} r="6" fill="#ffc2da" /><circle cx={x + 14} cy={y} r="6" fill="#fff3bf" /></g>)}
          </motion.g>
          {/* mid layer: attractions */}
          <motion.g style={{ x: mid }} animate={{ y: fly ? 480 : 0 }} transition={{ duration: 1.6, ease: "easeIn" }}>
            {/* ferris wheel → projects */}
            <g transform={T("translate(-54.5 220) scale(1.15)")}><Obj to="projects" label="Projects" cx={230} cy={320} lx={230} ly={568} go={go}><g transform="translate(-70 0)">
              <path d="M300 320L236 525M300 320L364 525M215 525h170" stroke="#d9c6ff" strokeWidth="12" strokeLinecap="round" fill="none" />
              <g className="spin">
                <circle cx="300" cy="320" r="178" fill="none" />
                <circle cx="300" cy="320" r="140" fill="none" stroke="#fff" strokeWidth="9" />
                <circle cx="300" cy="320" r="96" fill="none" stroke="#ffd3e4" strokeWidth="5" />
                {cab.map((c, k) => { const a = (k / 8) * Math.PI * 2, x = 300 + 140 * Math.cos(a), y = 320 + 140 * Math.sin(a); return (
                  <g key={k}><path d={`M300 320L${x} ${y}`} stroke="#fff" strokeWidth="4" />
                    <g className="spin-rev"><path d={`M${x} ${y}v12`} stroke="#fff" strokeWidth="3" /><rect x={x - 19} y={y + 12} width="38" height="28" rx="9" fill={c} stroke="#fff" strokeWidth="3" /><rect x={x - 12} y={y + 18} width="24" height="10" rx="4" fill="#fff" opacity=".7" /></g></g>
                ); })}
              </g>
              <circle cx="300" cy="320" r="16" fill="#ffc2da" stroke="#fff" strokeWidth="4" />
            </g></Obj></g>
            {/* carousel → skills */}
            <g transform={T("translate(-435 550) scale(1.1)")}><Obj to="skills" label="Skills" cx={770} cy={430} lx={770} ly={568} go={go}><g transform="translate(30 0)">
              <rect x="590" y="498" width="300" height="24" rx="12" fill="#ffd9e6" stroke="#fff" strokeWidth="3" /><ellipse cx="740" cy="498" rx="150" ry="14" fill="#fff3bf" stroke="#fff" strokeWidth="3" />
              {[620, 680, 740, 800, 860].map((x) => <path key={x} d={`M${x} 498V382`} stroke="#fff" strokeWidth="6" strokeLinecap="round" />)}
              {[620, 680, 800, 860, 740].map((x, i) => (
                <g key={x} className="horse" style={{ animationDelay: `${-i * 0.5}s` }}><Horse x={x} y={466} c={horseC[i]} mane={horseC[(i + 2) % 5]} /></g>
              ))}
              {Array.from({ length: 6 }).map((_, k) => <polygon key={k} points={`740,290 ${580 + k * 53.4},384 ${580 + (k + 1) * 53.4},384`} fill={k % 2 ? "#fff" : "#ffc2da"} stroke="#fff" strokeWidth="2" />)}
              <rect x="574" y="380" width="332" height="14" rx="7" fill="#fff" />
            </g></Obj></g>
            {/* ticket booth → experience */}
            <g transform={T("translate(-500 440) scale(1.2)")}><Obj to="home" label="Portfolio" cx={520} cy={575} lx={520} ly={692} go={go}><g transform="translate(520 640) scale(1.15) translate(-985 -522)">
              <rect x="935" y="430" width="100" height="92" rx="8" fill="#fff3bf" stroke="#fff" strokeWidth="4" />
              <rect x="955" y="458" width="60" height="38" rx="6" fill="#cde7ff" stroke="#fff" strokeWidth="3" /><text x="985" y="450" textAnchor="middle" className="hand" fontSize="17" fontWeight="700" fill="#5b4a6b">portfolio</text>
              {Array.from({ length: 5 }).map((_, k) => <polygon key={k} points={`${925 + k * 24},402 ${949 + k * 24},402 ${953 + k * 24},434 ${921 + k * 24},434`} fill={k % 2 ? "#fff" : "#a98bff"} stroke="#fff" strokeWidth="2" />)}
              <rect x="921" y="428" width="128" height="8" rx="4" fill="#e0d4ff" />
            </g></Obj></g>
            {/* hot-air balloon → experience */}
            <g transform={T("translate(-210 -137.5) scale(1.25)")}><Obj to="experience" label="Experience" cx={500} cy={250} lx={500} ly={420} go={go}>
              <motion.g animate={{ y: fly ? -1500 : 0 }} transition={{ duration: 1.6, ease: [0.4, 0, 0.9, 0.6] }}><g className="bob">
                <path d="M474 316L490 352M526 316L510 352" stroke="#fff" strokeWidth="3" />
                <ellipse cx="500" cy="250" rx="64" ry="74" fill="#ffc2da" stroke="#fff" strokeWidth="4" />
                <ellipse cx="500" cy="250" rx="40" ry="74" fill="#fff3bf" /><ellipse cx="500" cy="250" rx="17" ry="74" fill="#cde7ff" />
                <ellipse cx="500" cy="250" rx="64" ry="74" fill="none" stroke="#fff" strokeWidth="4" />
                <rect x="482" y="350" width="36" height="26" rx="7" fill="#f3c7a3" stroke="#fff" strokeWidth="3" />
              </g></motion.g>
            </Obj></g>
          </motion.g>

          
        </svg>
      </motion.div>
    </motion.div>
  );
};

// ───────────── Journal pages ─────────────
const Heading = ({ children, sub, flat }) => (
  <div className={`mb-8 ${flat ? "sm:pl-6" : "pl-16"}`}>
    <h2 className="hand text-5xl sm:text-6xl font-bold leading-none">{children}</h2>
    {sub && <p className="text-sm text-[color:var(--ink-soft)] mt-2">{sub}</p>}
  </div>
);

const Home = ({ data, go }) => (
  <div>
  <div className="awning -mt-8 sm:-mt-10 -ml-3 sm:-ml-6 -mr-3 sm:-mr-10 mb-12" />
  <div className="sm:pl-6 sm:pr-2 relative">
    <Balloon className="bob hidden md:block absolute right-6 top-0 w-32" />
    <h1 className="hand text-6xl sm:text-8xl font-bold leading-none my-2">
      I&apos;m <span className="inline-block px-2 pt-4 pb-3 -my-4" style={{ background: "linear-gradient(90deg,#ff8fb8,#a98bff,#6fb7ff)", WebkitBackgroundClip: "text", color: "transparent" }}>Shu Yi</span>
    </h1>
    <p className="text-lg font-bold mb-3">Software Engineering Student &amp; Developer</p>
    <p className="max-w-xl leading-8">
      Welcome in! I build full-stack web apps, mobile apps and AI-powered tools, and I treat every project like a ride worth building.
      Hop on the Ferris wheel for my projects, spin the carousel for my skills, or float up in the balloon to see where I&apos;ve studied and worked.
    </p>
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 mt-8">
      {[
        { v: `${data.projects.length}`, l: "projects", c: 0 },
        { v: "3.79", l: "degree CGPA", c: 1 },
        { v: "Dean's", l: "list award", c: 2 },
        { v: `${data.otherExperiences.length}`, l: "stage gigs", c: 4 },
      ].map((s, i) => (
        <motion.div key={s.l} className="sticker rounded-2xl px-5 py-3 text-center" style={{ background: grad(s.c), rotate: (i % 2 ? 3 : -3) }} whileHover={{ rotate: 0, scale: 1.08 }}>
          <div className="hand text-4xl font-bold leading-none">{s.v}</div>
          <div className="text-[10px] uppercase tracking-widest font-bold opacity-70">{s.l}</div>
        </motion.div>
      ))}
    </div>
    <div className="flex flex-wrap gap-3 mt-8 items-center">
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="sticker rounded-full px-6 py-2.5 font-extrabold hover:-translate-y-1 transition" style={{ background: grad(0) }}>
        Resume
      </a>
      <button onClick={() => go("projects")} className="sticker rounded-full px-6 py-2.5 font-extrabold hover:-translate-y-1 transition" style={{ background: grad(1) }}>
        See projects →
      </button>
      <div className="flex gap-3 text-2xl ml-2">
        {SOCIAL.map(([i, u]) => { const I = Icons[i]; return <a key={i} href={u} target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:-rotate-6 transition"><I /></a>; })}
      </div>
    </div>
  </div>
  </div>
);

const useNarrow = (px = 640) => {
  const [n, setN] = useState(false);
  useEffect(() => { const f = () => setN(window.innerWidth < px); f(); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, [px]);
  return n;
};

const FEATURED = ["12", "7", "13"];
const Projects = ({ projects, onPick }) => {
  const [hov, setHov] = useState(null);
  const narrow = useNarrow(), q = narrow ? 1.25 : 1;
  const n = projects.length, R = 235, cx = 400, cy = 290, shown = hov !== null ? projects[hov] : null;
  const D = { animationDuration: "160s" };
  const featured = FEATURED.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
  const clamp = { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" };
  return (
    <div>
      <Heading flat sub="Start with the featured ones, or ride the wheel and explore them all">My Projects</Heading>
      <div className="sm:pl-6 sm:pr-2">
        <div>
        <h3 className="hand text-3xl font-bold mb-3">Featured</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, k) => (
            <motion.button key={p.id} onClick={() => onPick(p)} whileHover={{ y: -6 }} className="text-left rounded-3xl p-4 sticker flex flex-col" style={{ background: theme(p.id - 1).bg }}>
              <div className="bg-white/85 rounded-2xl p-4 flex-1 flex flex-col">
                <h4 className="hand text-3xl font-bold leading-7">{p.name}</h4>
                <p className="text-sm leading-6 mt-2 opacity-80" style={clamp}>{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">{p.skills.slice(0, 3).map((t, i) => <span key={t} className="tag" style={{ background: grad(i + k) }}>{t}</span>)}</div>
                <span className="mt-4 text-sm font-extrabold">View details →</span>
              </div>
            </motion.button>
          ))}
        </div></div>

        <div>
        <h3 className="hand text-3xl font-bold mt-12 mb-1">All {n} projects</h3>
        <motion.p animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-bold mb-2">
          Click each cabin to see more
        </motion.p>
        <div className="wheel -mx-2 sm:mx-0">
          <svg viewBox="105 35 590 595" className="w-full max-w-2xl mx-auto block">
            <path d="M400 290L290 612M400 290L510 612M250 612h300" stroke="#d9c6ff" strokeWidth="14" strokeLinecap="round" fill="none" />
            <g className="spin" style={D}>
              <circle cx={cx} cy={cy} r={R + 70} fill="none" />
              <circle cx={cx} cy={cy} r={R} fill="none" stroke="#fff" strokeWidth="10" />
              <circle cx={cx} cy={cy} r={R * 0.6} fill="none" stroke="#ffd3e4" strokeWidth="6" />
              {projects.map((p, i) => {
                const t = (i / n) * Math.PI * 2 - Math.PI / 2, x = cx + R * Math.cos(t), y = cy + R * Math.sin(t);
                const open = () => onPick(p);
                return (
                  <g key={p.id}>
                    <path d={`M${cx} ${cy}L${x} ${y}`} stroke="#fff" strokeWidth="4" />
                    <g className="spin-rev" style={D}>
                      <path d={`M${x} ${y}v14`} stroke="#fff" strokeWidth="4" />
                      <g className="pop" role="button" tabIndex={0} aria-label={p.name} onClick={open} onKeyDown={(e) => e.key === "Enter" && open()} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
                        <rect x={x - 32 * q} y={y + 14} width={64 * q} height={50 * q} rx={13 * q} fill={G[i % 6][0]} stroke={hov === i ? "#a98bff" : "#fff"} strokeWidth="4" />
                        <rect x={x - 23 * q} y={y + 22} width={46 * q} height={12 * q} rx={5 * q} fill="#fff" opacity=".75" />
                        <text x={x} y={y + 14 + 42 * q} textAnchor="middle" className="hand" fontSize={22 * q} fontWeight="700" fill="#5b4a6b">{p.id}</text>
                      </g>
                    </g>
                  </g>
                );
              })}
            </g>
            <circle cx={cx} cy={cy} r="24" fill="#ffc2da" stroke="#fff" strokeWidth="6" />
          </svg>
          <div className="text-center min-h-[72px]">
            {shown ? (<>
              <p className="hand text-4xl font-bold leading-none">#{shown.id} {shown.name}</p>
              <p className="text-xs font-bold text-[color:var(--ink-soft)] mt-1">click to open</p>
            </>) : <p className="hand text-3xl text-[color:var(--ink-soft)]"><span className="hidden sm:inline">hover a cabin to peek, click to open</span><span className="sm:hidden">tap a cabin to open</span></p>}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, close }) => {
  const [demo, setDemo] = useState(false);
  useEffect(() => setDemo(false), [project]);
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#5b4a6b]/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl p-3 shadow-2xl" style={{ background: theme(project.id - 1).bg }}
            initial={{ rotateX: -70, y: 60, opacity: 0 }} animate={{ rotateX: 0, y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }} onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/80 backdrop-blur rounded-2xl p-7 relative">
            <button onClick={close} aria-label="Close" className="absolute top-4 right-5 text-xl hover:rotate-90 transition"><Icons.FaTimes /></button>
            <h2 className="hand text-5xl font-bold">{project.name}</h2>
            <p className="leading-8 mt-3 text-[15px]">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-5">{project.skills.map((s, k) => <span key={s} className="tag sticker" style={{ background: grad(k) }}>{s}</span>)}</div>
            <div className="flex flex-wrap gap-3 mt-6">
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="sticker rounded-full px-5 py-2 font-bold hover:-translate-y-1 transition inline-flex items-center gap-2" style={{ background: grad(1) }}><Icons.FaGithub />Source code</a>}
              {project.demo && <button onClick={() => setDemo(!demo)} className="sticker rounded-full px-5 py-2 font-bold hover:-translate-y-1 transition inline-flex items-center gap-2" style={{ background: grad(0) }}><Icons.FaPlay className="text-xs" />{demo ? "Hide demo" : "Watch demo"}</button>}
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="sticker rounded-full px-5 py-2 font-bold hover:-translate-y-1 transition inline-flex items-center gap-2" style={{ background: grad(2) }}><Icons.FaExternalLinkAlt className="text-xs" />Live site</a>}
              {!project.link && !project.demo && !project.live && <span className="hand text-xl text-[color:var(--ink-soft)]">private for now — still in progress</span>}
            </div>
            {demo && <div className="relative pt-[56.25%] mt-6 rounded-xl overflow-hidden shadow-lg"><iframe src={project.demo} title="Demo" allowFullScreen className="absolute inset-0 w-full h-full" /></div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// ───────────── Education & Experience (balloons) ─────────────
const TYPE_ICON = { Education: "FaGraduationCap", Internship: "FaLaptopCode", Hackathon: "FaTrophy", Datathon: "FaChartPie", Committee: "FaUsers" };

const MiniBalloon = ({ c, className = "" }) => (
  <svg viewBox="0 0 24 34" className={className}>
    <path d="M8 19L11 28M16 19L13 28" stroke="#fff" strokeWidth="1.5" />
    <ellipse cx="12" cy="11" rx="10" ry="11" fill={c} stroke="#fff" strokeWidth="1.5" />
    <ellipse cx="12" cy="11" rx="4" ry="11" fill="#fff" opacity=".7" />
    <rect x="8.5" y="27" width="7" height="6" rx="2" fill="#f3c7a3" stroke="#fff" strokeWidth="1" />
  </svg>
);

const BigBalloon = ({ i, className = "" }) => (
  <svg viewBox="0 0 100 150" className={className}>
    <path d="M30 100L42 128M70 100L58 128" stroke="#fff" strokeWidth="3" />
    <ellipse cx="50" cy="52" rx="42" ry="50" fill={G[i % 6][0]} stroke="#fff" strokeWidth="4" />
    <ellipse cx="50" cy="52" rx="24" ry="50" fill={G[i % 6][1]} /><ellipse cx="50" cy="52" rx="9" ry="50" fill="#fff" opacity=".8" />
    <rect x="38" y="126" width="24" height="18" rx="5" fill="#f3c7a3" stroke="#fff" strokeWidth="3" />
  </svg>
);
const FLIP = { enter: (d) => ({ rotateY: d > 0 ? 70 : -70, opacity: 0 }), center: { rotateY: 0, opacity: 1 }, exit: (d) => ({ rotateY: d > 0 ? -70 : 70, opacity: 0 }) };

const Experience = ({ education, experience, other }) => {
  const all = useMemo(() => [...education.map((e) => ({ ...e, type: "Education" })), ...experience], [education, experience]);
  const [pg, setPg] = useState(0), [dir, setDir] = useState(1);
  const total = all.length, cur = pg > 0 ? all[pg - 1] : null;
  const flip = (i) => { if (i < 0 || i > total || i === pg) return; setDir(i > pg ? 1 : -1); setPg(i); };
  const byYear = useMemo(() => {
    const m = {};
    other.forEach((o) => { (m[o.year] = m[o.year] || []).push(o); });
    return Object.entries(m).sort((x, y) => x[0] - y[0]);
  }, [other]);
  const Ic = cur ? Icons[TYPE_ICON[cur.type]] || Icons.FaStar : null;
  const nav = "sticker rounded-full px-5 py-2 text-sm font-extrabold transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0";
  return (
    <div>
      <Heading flat sub="The first page lists every chapter, tap one to flip straight to it">Education &amp; Experience</Heading>
      <div className="sm:pl-6 sm:pr-2">
        <div className="max-w-3xl mx-auto" style={{ perspective: 1800 }}>
          <div className="relative rounded-l-xl rounded-r-3xl pl-3" style={{ background: "linear-gradient(90deg,#ff9fc4,#c9b6ff)", boxShadow: "8px 8px 0 -2px #f1e8ff, 16px 16px 0 -4px #e3d6ff, 0 28px 40px -18px rgba(150,120,200,.5)" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={pg} custom={dir} variants={FLIP} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }} style={{ transformOrigin: "left center" }}
                className="bg-[#fffdf8] rounded-r-[22px] min-h-[440px] p-6 sm:p-10">
                {pg === 0 ? (
                  <>
                    <p className="hand text-xl text-[color:var(--ink-soft)] leading-none">Shu Yi&apos;s</p>
                    <h3 className="hand text-5xl font-bold leading-none mt-1">Contents</h3>
                    <div className="mt-6 divide-y divide-pink-100">
                      {all.map((e, i) => (
                        <button key={e.type + e.id} onClick={() => flip(i + 1)} className="w-full flex items-center gap-3 py-3 text-left hover:bg-pink-50 rounded-xl px-2 transition">
                          <MiniBalloon c={G[i % 6][0]} className="w-6 shrink-0" />
                          <span className="hand text-2xl w-8 text-[color:var(--ink-soft)]">{i + 1}</span>
                          <span className="flex-1 min-w-0"><span className="block font-extrabold leading-5">{e.name}</span><span className="block text-xs opacity-70">{e.year}</span></span>
                          <span className="hand text-xl opacity-50">p.{i + 2}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col-reverse sm:flex-row gap-6 items-center sm:items-start">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3"><span className="hand text-3xl font-bold opacity-60">{cur.year}</span></div>
                      <h3 className="hand text-4xl sm:text-5xl font-bold leading-10 mt-3">{cur.name}</h3>
                      <p className="mt-4 leading-7 opacity-80">{cur.description}</p>
                      {cur.achievement && <span className="tag mt-4 inline-block" style={{ background: grad(pg + 1) }}>{cur.achievement}</span>}
                    </div>
                    <motion.div className="relative w-32 sm:w-44 shrink-0" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.4 }}>
                      <BigBalloon i={pg - 1} className="w-full drop-shadow-lg" />
                      <span className="absolute top-[20%] left-1/2 -translate-x-1/2 text-2xl bg-white/85 rounded-full p-2 shadow"><Ic /></span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between mt-8">
            <button onClick={() => flip(pg - 1)} disabled={pg === 0} className={nav} style={{ background: grad(1) }}>← Prev</button>
            <button onClick={() => flip(0)} disabled={pg === 0} className={nav} style={{ background: grad(0) }}>Contents</button>
            <button onClick={() => flip(pg + 1)} disabled={pg === total} className={nav} style={{ background: grad(2) }}>Next →</button>
          </div>
          <p className="text-center text-xs font-bold opacity-60 mt-3">Page {pg + 1} of {total + 1}</p>
        </div>

        <h3 className="hand text-4xl font-bold mt-14 mb-1">Additional Experiences</h3>
        <p className="text-sm text-[color:var(--ink-soft)] mb-6">{other.length} stage performances as a band vocalist</p>
        <div className="relative max-w-2xl">
          <div className="absolute left-[11px] top-4 bottom-4 border-l-2 border-dashed border-white" />
          {byYear.map(([y, items], yi) => (
            <div key={y} className="mb-6">
              <div className="relative pl-12 mb-3 flex items-center">
                <MiniBalloon c={G[yi % 6][0]} className="absolute left-0 w-6 drop-shadow" />
                <span className="hand text-3xl font-bold leading-none">{y}</span>
                <span className="ml-3 text-xs font-bold opacity-50">{items.length} gigs</span>
              </div>
              {items.map((o) => (
                <div key={o.id} className="relative pl-12 pb-3">
                  <span className="absolute left-[5px] top-4 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: G[yi % 6][0] }} />
                  <div className="bg-white rounded-2xl shadow-sm px-4 py-3 hover:-translate-y-0.5 transition">
                    <div className="font-extrabold leading-5">{o.name}</div>
                    <div className="text-xs opacity-70 mt-0.5">{o.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ───────────── Skills ─────────────
const CAT_ICON = { languages: "FaCode", frameworks: "FaLayerGroup", databases: "FaDatabase", platforms: "FaPalette", otherSkills: "FaTools" };
const SHORT = { languages: "Languages", frameworks: "Frameworks", databases: "DB & Tools", platforms: "Platforms", otherSkills: "Other" };
const SK = ["#ff7fb0", "#9a7bff", "#4fa8ff", "#3fc496", "#ffa940"];
const BRAND = { Java: "#ea2d2e", Python: "#3776ab", PHP: "#777bb4", JavaScript: "#d9b800", TypeScript: "#3178c6", Scala: "#dc322f", HTML: "#e34f26", CSS: "#1572b6", "React.js": "#20a4c8", "React Native": "#20a4c8", "Next.js": "#222", "Tailwind CSS": "#06b6d4", "Node.js": "#339933", "Express.js": "#444", Flutter: "#02569b", Expo: "#222", FastAPI: "#009688", n8n: "#ea4b71", PostgreSQL: "#336791", Git: "#f05032", GitHub: "#222", Vercel: "#222", Supabase: "#3ecf8e", Firebase: "#f5a100", Figma: "#f24e1e", Canva: "#00a8b0", WordPress: "#21759b", Elementor: "#92003b", "OpenAI APIs": "#10a37f" };
const ICON_FIX = { "React Native": "FaReact" };

const REP = { languages: "FaPython", frameworks: "FaReact", databases: "SiPostgresql", platforms: "FaFigma", otherSkills: "FaTools" };
const HC = ["#ffc2da", "#cde7ff", "#fff3bf", "#d8f7e8", "#e0d4ff"];

const Skills = ({ skills }) => {
  const [cat, setCat] = useState(null);
  const narrow = useNarrow();
  const V = narrow ? { W: 420, H: 540, m: 10 } : { W: 700, H: 310, m: 25 };
  const mid = V.W / 2, step = (V.W - 2 * V.m) / 10;
  const pos = (i) => (narrow ? { x: i < 3 ? 70 + i * 140 : 140 + (i - 3) * 140, dy: i < 3 ? 0 : 230 } : { x: 90 + i * 130, dy: 0 });
  const entries = Object.entries(skills);
  const total = entries.reduce((n, [, v]) => n + v.length, 0);
  const sel = cat ? entries.findIndex(([k]) => k === cat) : -1;
  const items = sel >= 0 ? entries[sel][1] : [];
  return (
    <div>
      <Heading flat sub={`${total} tools across ${entries.length} toolboxes`}>My Skills</Heading>
      <div className="sm:pl-6 sm:pr-2">
        <motion.p animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-bold mb-2">Click each horse to see more</motion.p>
        <div className="wheel -mx-2 sm:mx-0">
          <svg viewBox={`0 0 ${V.W} ${V.H}`} className="w-full max-w-3xl mx-auto block">
            <path d={`M${mid} 4V20`} stroke="#d9c6ff" strokeWidth="4" strokeLinecap="round" /><path d={`M${mid} 6L${mid + 24} 12L${mid} 18Z`} fill="#ffc2da" />
            {Array.from({ length: 10 }).map((_, k) => <polygon key={k} points={`${mid},20 ${V.m + k * step},84 ${V.m + (k + 1) * step},84`} fill={k % 2 ? "#fff" : "#ffc2da"} stroke="#fff" strokeWidth="2" />)}
            <rect x={V.m - 6} y="80" width={V.W - 2 * V.m + 12} height="12" rx="6" fill="#fff" />
            {narrow ? (<>
              <rect x="20" y="228" width="380" height="24" rx="12" fill="#ffd9e6" stroke="#fff" strokeWidth="3" />
              <rect x="62" y="310" width="296" height="12" rx="6" fill="#fff" />
              <rect x="62" y="458" width="296" height="24" rx="12" fill="#ffd9e6" stroke="#fff" strokeWidth="3" />
            </>) : <rect x="40" y="228" width="620" height="24" rx="12" fill="#ffd9e6" stroke="#fff" strokeWidth="3" />}
            {entries.map((_, i) => { const { x, dy } = pos(i); return <path key={i} d={`M${x} ${92 + dy}V${228 + dy}`} stroke="#fff" strokeWidth="6" strokeLinecap="round" />; })}
            {entries.map(([k, v], i) => {
              const { x, dy } = pos(i), on = cat === k, I = Icons[REP[k]] || Icons.FaStar, pick = () => setCat(on ? null : k);
              return (
                <g key={k} transform={`translate(0 ${dy})`}>
                  <g className="pop" role="button" tabIndex={0} aria-label={`${catTitle[k] || k}, ${v.length} skills`} aria-pressed={on} onClick={pick} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pick()}>
                    {on && <ellipse cx={x} cy="168" rx="64" ry="72" fill="#fff" opacity=".65" />}
                    <g className="horse" style={{ animationDelay: `${-i * 0.5}s` }}>
                      <Horse x={x} y={192} k={1.2} c={HC[i % 5]} mane={HC[(i + 2) % 5]} />
                      <circle cx={x} cy="122" r="21" fill="#fff" stroke={SK[i % 5]} strokeWidth="3" />
                      <I x={x - 11} y="111" size="22" color={SK[i % 5]} />
                    </g>
                  </g>
                </g>
              );
            })}
            {entries.map(([k, v], i) => {
              const { x, dy } = pos(i), pick = () => setCat(cat === k ? null : k);
              return (
                <g key={k} transform={`translate(0 ${dy})`} onClick={pick} style={{ cursor: "pointer" }}>
                  <text x={x} y="276" textAnchor="middle" className="hand" fontSize="21" fontWeight="700" fill="#5b4a6b">{SHORT[k] || k}</text>
                  <text x={x} y="296" textAnchor="middle" fontSize="12" fontWeight="700" fill="#8d7ba0">{v.length} skills</text>
                </g>
              );
            })}
          </svg>
        </div>
        <AnimatePresence mode="wait">
          {sel >= 0 ? (
            <motion.section key={cat} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white/60 rounded-3xl overflow-hidden shadow-sm mt-4">
              <div className="p-5">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="hand text-3xl font-bold">{catTitle[cat] || cat}</h3>
                  <button onClick={() => setCat(null)} className="text-sm font-bold opacity-60 hover:opacity-100">Close</button>
                </div>
                {cat === "otherSkills" ? (
                  <div className="flex flex-wrap gap-2">
                    {items.map((s, i) => { const I = Icons[s.icon] || Icons.FaCode; return (
                      <span key={s.id} className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm px-4 py-2 text-sm font-bold"><I style={{ color: SK[i % 5] }} />{s.name}</span>); })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {items.map((s, i) => {
                      const I = Icons[ICON_FIX[s.name] || s.icon] || Icons.FaCode, c = BRAND[s.name] || SK[(sel + i) % 5];
                      return (
                        <motion.div key={s.id} whileHover={{ y: -4, rotate: -1 }} className="flex items-stretch rounded-2xl bg-white shadow-sm overflow-hidden">
                          <span className="w-14 shrink-0 flex items-center justify-center text-2xl" style={{ background: `${c}1f`, color: c }}><I /></span>
                          <span className="border-l-2 border-dashed border-pink-200 flex items-center px-3 py-3 font-bold text-sm leading-5">{s.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SHELL = { home: "booth pl-3 sm:pl-6 overflow-hidden", experience: "dusk pl-3 sm:pl-6", projects: "sky pl-3 sm:pl-6", skills: "candy pl-3 sm:pl-6" };
const Journal = ({ data, tab, setTab, close }) => {
  const [project, setProject] = useState(null);
  return (
    <motion.div className="min-h-screen px-3 sm:px-8 py-6 max-w-6xl mx-auto" initial={{ opacity: 0, scale: 0.92, rotateX: 12 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={close} className="glass rounded-full px-4 py-2 font-bold text-sm hover:-translate-y-0.5 transition">← Back to playground</button>
        <span className="hand text-3xl hidden sm:flex items-center gap-2">Shu Yi&apos;s Playground</span>
      </div>
      <div className="relative">
        {/* index tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 2xl:mb-0 2xl:absolute 2xl:-right-3 2xl:top-10 2xl:flex 2xl:flex-col 2xl:translate-x-full z-10">
          {TABS.map((t, i) => (
            <button key={t.id} onClick={() => setTab(t.id)} aria-current={tab === t.id} className={`sticker hand text-xl px-4 py-2 rounded-xl 2xl:rounded-l-none whitespace-nowrap text-center transition ${tab === t.id ? "scale-105 2xl:scale-100 2xl:translate-x-2 ring-2 ring-white" : "opacity-85 hover:opacity-100 2xl:hover:translate-x-2"}`} style={{ background: grad(i) }}>
              {t.label}
            </button>
          ))}
        </div>
        <div className={`${SHELL[tab]} rounded-3xl py-8 sm:py-10 pr-3 sm:pr-10 min-h-[70vh] 2xl:mr-4`}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, rotateY: -25, x: 30 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} style={{ transformOrigin: "left" }}>
              {tab === "home" && <Home data={data} go={setTab} />}
              {tab === "projects" && <Projects projects={data.projects} onPick={setProject} />}
              {tab === "experience" && <Experience education={data.education} experience={data.experience} other={data.otherExperiences} />}
              {tab === "skills" && <Skills skills={data.skills} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="text-center text-xs mt-6 text-[color:var(--ink-soft)] hand text-lg">© {new Date().getFullYear()} Shu Yi</p>
      <ProjectModal project={project} close={() => setProject(null)} />
    </motion.div>
  );
};

// ───────────── Main ─────────────
export default function Main() {
  const [data, setData] = useState(null);
  const [view, setView] = useState("desk");
  const [tab, setTab] = useState("home");

  useEffect(() => {
    fetchData().then((d) =>
      setData({
        skills: { languages: d.languages, frameworks: d.frameworks, databases: d.databases, platforms: d.platforms, otherSkills: d.otherSkills },
        education: d.education,
        experience: d.experience,
        projects: d.projects.map((p) => ({ ...p, skills: typeof p.skills === "string" ? p.skills.split(",").map((s) => s.trim()).filter(Boolean) : p.skills || [] })),
        otherExperiences: d.otherExperiences || [],
      })
    );
  }, []);

  if (!data)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div animate={{ rotate: [0, 15, -15, 0], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}><Balloon className="w-20" /></motion.div>
        <p className="hand text-3xl mt-3 text-[color:var(--ink-soft)]">Welcome to my playground…</p>
      </div>
    );

  return (
    <AnimatePresence mode="wait">
      {view === "desk" ? (
        <Desk key="desk" onOpen={(t) => { setTab(t); setView("journal"); }} />
      ) : (
        <Journal key="journal" data={data} tab={tab} setTab={setTab} close={() => setView("desk")} />
      )}
    </AnimatePresence>
  );
}
