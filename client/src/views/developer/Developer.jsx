import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Developer.css";

/* ============================================================
   ASSETS
   ------------------------------------------------------------
   Place the six team photos here:
     client/src/assets/developers/developer1.jpg
     client/src/assets/developers/developer2.jpg
     client/src/assets/developers/developer3.jpg
     client/src/assets/developers/developer4.jpg
     client/src/assets/developers/developer5.jpg
     client/src/assets/developers/developer6.jpg
   If your project already uses a different assets folder,
   update these six import paths only.
   ============================================================ */
import developer1 from "../../../assets/developers/developer1.jpg";
import developer2 from "../../../assets/developers/developer2.jpg";
import developer3 from "../../../assets/developers/developer3.jpg";
import developer4 from "../../../assets/developers/developer4.jpg";
import developer5 from "../../../assets/developers/developer5.jpg";
import developer6 from "../../../assets/developers/developer6.jpg";

/* ============================================================
   CONSTANTS
   ============================================================ */
const STORAGE_KEY = "eduguide-developers";
const INTRO_KEY = "eduguide_intro_seen";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_WIDTH = 1200;

const DEFAULT_DEVELOPERS = [
  {
    id: 1,
    image: developer1,
    name: "Rishabh Malviya",
    role: "Team Lead",
    bio: "Leads the vision and direction of EduGuide AI, keeping the team aligned from first idea to final release.",
    contribution:
      "Sets product direction and coordinates design, development and research across the team.",
    skills: [],
    github: "",
    linkedin: "",
    email: "",
    portfolio: "",
  },
  {
    id: 2,
    image: developer2,
    name: "Snehal Kushwaha",
    role: "Backend Developer",
    bio: "Add a short bio here.",
    contribution:
      "Builds and maintains the backend systems that power EduGuide AI.",
    skills: [],
    github: "",
    linkedin: "",
    email: "",
    portfolio: "",
  },
  {
    id: 3,
    image: developer3,
    name: "Rex Mantode",
    role: "Frontend Developer",
    bio: "Add a short bio here.",
    contribution: "Builds the interfaces students and staff use every day.",
    skills: [],
    github: "",
    linkedin: "",
    email: "",
    portfolio: "",
  },
  {
    id: 4,
    image: developer4,
    name: "Sumit Ransurma",
    role: "Research & Data Collection",
    bio: "Add a short bio here.",
    contribution:
      "Gathers and organizes the research that shapes EduGuide AI's insights.",
    skills: [],
    github: "",
    linkedin: "",
    email: "",
    portfolio: "",
  },
  {
    id: 5,
    image: developer5,
    name: "Shruti Tiwari",
    role: "Operations & Notion Admin",
    bio: "Add a short bio here.",
    contribution: "Keeps the team organized and documentation up to date.",
    skills: [],
    github: "",
    linkedin: "",
    email: "",
    portfolio: "",
  },
  {
    id: 6,
    image: developer6,
    name: "Neha Kumari Sah",
    role: "UI/UX & Documentation",
    bio: "Add a short bio here.",
    contribution:
      "Shapes the product experience and documents how EduGuide AI works.",
    skills: [],
    github: "",
    linkedin: "",
    email: "",
    portfolio: "",
  },
];

const BUILD_STEPS = [
  { num: "01", title: "Discover", text: "Understanding real student needs." },
  {
    num: "02",
    title: "Design",
    text: "Creating simple and meaningful experiences.",
  },
  {
    num: "03",
    title: "Build",
    text: "Turning ideas into reliable technology.",
  },
  {
    num: "04",
    title: "Improve",
    text: "Learning from feedback and continuously evolving.",
  },
];

const TECHNOLOGIES = [
  "React",
  "JavaScript",
  "Node.js",
  "Express",
  "AI",
  "MongoDB",
  "REST APIs",
  "GitHub",
];

const PURPOSE_DOMAINS = [
  "Academic Performance",
  "Aptitude",
  "Skills",
  "Growth",
  "Strengths",
  "Improvement Areas",
  "Career Direction",
];

const PURPOSE_PILLARS = [
  {
    title: "Holistic Evaluation",
    text: "Looking at the full picture of a student's academic performance, aptitude and skills, not a single score.",
  },
  {
    title: "AI-Assisted Insights",
    text: "Using AI to surface patterns in growth, strengths and improvement areas that are easy to miss.",
  },
  {
    title: "Student-Centric Design",
    text: "Designing every screen around what helps a student understand their own career direction.",
  },
];

const VALUES = [
  {
    title: "Curiosity",
    text: "We keep exploring better ways to solve problems.",
  },
  { title: "Innovation", text: "We turn ideas into useful experiences." },
  { title: "Collaboration", text: "Great products are built together." },
  { title: "Impact", text: "Technology matters when it creates real value." },
];

/* ============================================================
   ICONS (inline SVG — no icon package dependency required)
   ============================================================ */
const Icon = {
  Github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.42-5.27 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  ),
  Linkedin: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  Mail: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M3 5h18v14H3z" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  ),
  Globe: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  Edit: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  ),
  Arrow: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),
  Close: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  ),
  User: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  ),
  Upload: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 16V4M12 4 7 9M12 4l5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  Trash: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
    </svg>
  ),
  Check: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Alert: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 9v4" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16.5h.01" />
    </svg>
  ),
};

/* ============================================================
   UTILITIES
   ============================================================ */
function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    return true;
  } catch {
    return false;
  }
}

function mergeDevelopers(defaults, overrides) {
  return defaults.map((dev) => {
    const o = overrides[dev.id];
    if (!o) return dev;
    return { ...dev, ...o, image: o.image || dev.image };
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function compressImageFile(file, maxWidth = MAX_IMAGE_WIDTH, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ============================================================
   HOOKS
   ============================================================ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3800);
  }, []);
  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);
  return [toasts, push, dismiss];
}

/* ============================================================
   SMALL PRESENTATIONAL PIECES
   ============================================================ */
function Reveal({ as: Tag = "div", className = "", children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`edg-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${pct}%`;
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="edg-scroll-track" aria-hidden="true">
      <div className="edg-scroll-bar" ref={barRef} />
    </div>
  );
}

function MouseGlow({ reducedMotion }) {
  const glowRef = useRef(null);
  useEffect(() => {
    if (reducedMotion) return;
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;
    if (isTouch) return;
    let raf = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.setProperty("--edg-mx", `${x}px`);
          glowRef.current.style.setProperty("--edg-my", `${y}px`);
        }
        raf = null;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return <div className="edg-mouse-glow" ref={glowRef} aria-hidden="true" />;
}

function ToastStack({ toasts, dismiss }) {
  return (
    <div className="edg-toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`edg-toast edg-toast--${t.type}`}>
          {t.type === "error" ? (
            <Icon.Alert className="edg-toast-icon" />
          ) : (
            <Icon.Check className="edg-toast-icon" />
          )}
          <span>{t.message}</span>
          <button
            type="button"
            className="edg-toast-close"
            aria-label="Dismiss notification"
            onClick={() => dismiss(t.id)}
          >
            <Icon.Close className="edg-icon-14" />
          </button>
        </div>
      ))}
    </div>
  );
}

function Avatar({ src, name, className = "", style }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) {
    return (
      <div
        className={`edg-avatar-fallback ${className}`}
        role="img"
        aria-label={name}
        style={style}
      >
        <span>{getInitials(name)}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      className={className}
      style={style}
      onError={() => setBroken(true)}
    />
  );
}

/* ============================================================
   HERO NETWORK VISUAL — orbiting constellation, 3D tilt on
   pointer move, animated flowing connectors.
   ============================================================ */
function HeroNetwork({ developers, reducedMotion }) {
  const size = 460;
  const center = size / 2;
  const radius = 178;
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const safeDevs = developers && developers.length ? developers : [];

  const points = useMemo(
    () =>
      safeDevs.map((dev, i) => {
        const angle = (Math.PI * 2 * i) / safeDevs.length - Math.PI / 2;
        return {
          dev,
          x: center + radius * Math.cos(angle),
          y: center + radius * Math.sin(angle),
        };
      }),
    [safeDevs],
  );

  const colors = [
    "#3B82F6",
    "#10B981",
    "#6366F1",
    "#3B82F6",
    "#10B981",
    "#6366F1",
  ];

  const handleMove = useCallback(
    (e) => {
      if (reducedMotion) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rx: py * -10, ry: px * 14 });
    },
    [reducedMotion],
  );

  const handleLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), []);

  if (!points.length) {
    return <div className="edg-hero-network" aria-hidden="true" />;
  }

  return (
    <div
      className="edg-hero-network"
      aria-hidden="true"
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: reducedMotion
          ? "none"
          : `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
    >
      <div className="edg-network-halo" />
      <div
        className={`edg-network-orbit-ring ${reducedMotion ? "" : "edg-spin-slow"}`}
      />
      <div
        className={`edg-network-orbit-ring edg-network-orbit-ring--in ${reducedMotion ? "" : "edg-spin-slow-rev"}`}
      />

      <svg viewBox={`0 0 ${size} ${size}`} className="edg-network-lines">
        <defs>
          <linearGradient
            id="edg-line-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        {points.map((p, i) => (
          <line
            key={p.dev.id}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="url(#edg-line-grad)"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            opacity="0.4"
            className={reducedMotion ? "" : "edg-line-flow"}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </svg>

      <div className="edg-network-center">
        <span className="edg-network-center-mark">EG</span>
        <span className="edg-network-center-label">EduGuide AI</span>
        <div
          className={`edg-network-pulse ${reducedMotion ? "" : "edg-pulse"}`}
        />
      </div>

      {points.map((p, i) => (
        <div
          key={p.dev.id}
          className={`edg-network-node ${reducedMotion ? "" : "edg-float-active"}`}
          style={{
            left: `${(p.x / size) * 100}%`,
            top: `${(p.y / size) * 100}%`,
            animationDelay: `${i * 0.45}s`,
            transitionDelay: `${300 + i * 90}ms`,
            "--edg-node-accent": colors[i % colors.length],
          }}
        >
          <div className="edg-network-node-ring">
            <Avatar
              src={p.dev.image}
              name={p.dev.name}
              className="edg-network-avatar-img"
            />
          </div>
          <span className="edg-network-node-label">
            {p.dev.name.split(" ")[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   EDIT PROFILE (inline, replaces card content while editing)
   ============================================================ */
function EditProfile({
  developer,
  onCancel,
  onSave,
  onImageFile,
  onRemoveImage,
  pushToast,
}) {
  const [form, setForm] = useState({
    name: developer.name,
    role: developer.role,
    bio: developer.bio,
    contribution: developer.contribution,
    skills: (developer.skills || []).join(", "),
    github: developer.github,
    linkedin: developer.linkedin,
    email: developer.email,
    portfolio: developer.portfolio,
  });
  const fileInputRef = useRef(null);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleFilePick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      pushToast("Please upload a JPG, PNG or WEBP image under 5 MB.", "error");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      pushToast("Please upload a JPG, PNG or WEBP image under 5 MB.", "error");
      return;
    }
    onImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <form className="edg-edit-card" onSubmit={handleSubmit}>
      <div className="edg-edit-header">
        <span>Edit profile</span>
      </div>

      <div className="edg-edit-photo-row">
        <Avatar
          src={developer.image}
          name={developer.name}
          className="edg-edit-photo"
        />
        <div className="edg-edit-photo-actions">
          <button
            type="button"
            className="edg-btn-ghost"
            onClick={handleFilePick}
          >
            <Icon.Upload className="edg-icon-16" /> Change photo
          </button>
          {developer.image && (
            <button
              type="button"
              className="edg-btn-ghost edg-btn-ghost--danger"
              onClick={onRemoveImage}
            >
              <Icon.Trash className="edg-icon-16" /> Remove
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="edg-visually-hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="edg-field">
        <label htmlFor={`name-${developer.id}`}>Name</label>
        <input
          id={`name-${developer.id}`}
          value={form.name}
          onChange={handleChange("name")}
        />
      </div>

      <div className="edg-field">
        <label htmlFor={`role-${developer.id}`}>Role</label>
        <input
          id={`role-${developer.id}`}
          value={form.role}
          onChange={handleChange("role")}
        />
      </div>

      <div className="edg-field">
        <label htmlFor={`bio-${developer.id}`}>Bio</label>
        <textarea
          id={`bio-${developer.id}`}
          rows={2}
          value={form.bio}
          onChange={handleChange("bio")}
        />
      </div>

      <div className="edg-field">
        <label htmlFor={`contribution-${developer.id}`}>Contribution</label>
        <textarea
          id={`contribution-${developer.id}`}
          rows={2}
          value={form.contribution}
          onChange={handleChange("contribution")}
        />
      </div>

      <div className="edg-field">
        <label htmlFor={`skills-${developer.id}`}>
          Skills (comma separated)
        </label>
        <input
          id={`skills-${developer.id}`}
          value={form.skills}
          onChange={handleChange("skills")}
        />
      </div>

      <div className="edg-field-grid">
        <div className="edg-field">
          <label htmlFor={`github-${developer.id}`}>GitHub</label>
          <input
            id={`github-${developer.id}`}
            value={form.github}
            onChange={handleChange("github")}
            placeholder="https://github.com/…"
          />
        </div>
        <div className="edg-field">
          <label htmlFor={`linkedin-${developer.id}`}>LinkedIn</label>
          <input
            id={`linkedin-${developer.id}`}
            value={form.linkedin}
            onChange={handleChange("linkedin")}
            placeholder="https://linkedin.com/in/…"
          />
        </div>
        <div className="edg-field">
          <label htmlFor={`email-${developer.id}`}>Email</label>
          <input
            id={`email-${developer.id}`}
            value={form.email}
            onChange={handleChange("email")}
            placeholder="name@example.com"
          />
        </div>
        <div className="edg-field">
          <label htmlFor={`portfolio-${developer.id}`}>Portfolio</label>
          <input
            id={`portfolio-${developer.id}`}
            value={form.portfolio}
            onChange={handleChange("portfolio")}
            placeholder="https://…"
          />
        </div>
      </div>

      <div className="edg-edit-actions">
        <button type="button" className="edg-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="edg-btn-primary">
          Save changes
        </button>
      </div>
    </form>
  );
}

/* ============================================================
   DEVELOPER CARD
   ============================================================ */
function DeveloperCard({
  developer,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSave,
  onOpenModal,
  onImageFile,
  onRemoveImage,
  pushToast,
  delay,
}) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleTiltMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--edg-tilt-x", `${(py * -6).toFixed(2)}deg`);
      el.style.setProperty("--edg-tilt-y", `${(px * 8).toFixed(2)}deg`);
      el.style.setProperty("--edg-glow-x", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--edg-glow-y", `${(py + 0.5) * 100}%`);
    });
  }, []);

  const handleTiltLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--edg-tilt-x", "0deg");
    el.style.setProperty("--edg-tilt-y", "0deg");
  }, []);

  if (isEditing) {
    return (
      <Reveal className="edg-card edg-card--editing" delay={delay}>
        <EditProfile
          developer={developer}
          onCancel={onCancelEdit}
          onSave={(data) => onSave(developer.id, data)}
          onImageFile={(file) => onImageFile(developer.id, file)}
          onRemoveImage={() => onRemoveImage(developer.id)}
          pushToast={pushToast}
        />
      </Reveal>
    );
  }

  const hasSkills = developer.skills && developer.skills.length > 0;

  return (
    <Reveal className="edg-card edg-card--tilt" delay={delay}>
      <div
        className="edg-card-inner"
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={() => onOpenModal(developer.id)}
        onMouseMove={handleTiltMove}
        onMouseLeave={handleTiltLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenModal(developer.id);
          }
        }}
        aria-label={`View ${developer.name}'s profile`}
      >
        <span className="edg-card-glow" aria-hidden="true" />
        <div
          className="edg-card-image-wrap"
          onClick={(e) => {
            e.stopPropagation();
            onStartEdit(developer.id);
          }}
        >
          <Avatar
            src={developer.image}
            name={developer.name}
            className="edg-card-image"
          />
          <span className="edg-card-image-hint">
            <Icon.Edit className="edg-icon-16" />
          </span>
        </div>

        <div className="edg-card-body">
          <div className="edg-card-heading">
            <div>
              <h3>{developer.name}</h3>
              <p className="edg-card-role">{developer.role}</p>
            </div>
            <button
              type="button"
              className="edg-card-edit-btn"
              aria-label={`Edit ${developer.name}'s profile`}
              onClick={(e) => {
                e.stopPropagation();
                onStartEdit(developer.id);
              }}
            >
              <Icon.Edit className="edg-icon-16" />
            </button>
          </div>

          <p className="edg-card-contribution">{developer.contribution}</p>

          <div className="edg-card-skills">
            {hasSkills ? (
              developer.skills.slice(0, 4).map((s) => (
                <span className="edg-tag" key={s}>
                  {s}
                </span>
              ))
            ) : (
              <span className="edg-tag edg-tag--muted">
                Skills not added yet
              </span>
            )}
          </div>

          <div className="edg-card-footer">
            <div className="edg-card-socials">
              {developer.github && <Icon.Github className="edg-icon-16" />}
              {developer.linkedin && <Icon.Linkedin className="edg-icon-16" />}
              {developer.email && <Icon.Mail className="edg-icon-16" />}
              {developer.portfolio && <Icon.Globe className="edg-icon-16" />}
            </div>
            <span className="edg-card-arrow">
              View profile <Icon.Arrow className="edg-icon-16" />
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   DETAIL MODAL
   ============================================================ */
function DeveloperModal({ developer, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!developer) return null;

  const hasSkills = developer.skills && developer.skills.length > 0;

  return (
    <div className="edg-modal-backdrop" onClick={onClose}>
      <div
        className="edg-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edg-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="edg-modal-close"
          aria-label="Close profile"
          onClick={onClose}
        >
          <Icon.Close className="edg-icon-20" />
        </button>

        <div className="edg-modal-image-wrap">
          <Avatar
            src={developer.image}
            name={developer.name}
            className="edg-modal-image"
          />
        </div>

        <div className="edg-modal-body">
          <h2 id="edg-modal-title">{developer.name}</h2>
          <p className="edg-modal-role">{developer.role}</p>
          <p className="edg-modal-bio">{developer.bio}</p>

          <div className="edg-modal-section">
            <h4>Contribution</h4>
            <p>{developer.contribution}</p>
          </div>

          {hasSkills && (
            <div className="edg-modal-section">
              <h4>Skills</h4>
              <div className="edg-card-skills">
                {developer.skills.map((s) => (
                  <span className="edg-tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="edg-modal-links">
            {developer.github && (
              <a href={developer.github} target="_blank" rel="noreferrer">
                <Icon.Github className="edg-icon-16" /> GitHub
              </a>
            )}
            {developer.linkedin && (
              <a href={developer.linkedin} target="_blank" rel="noreferrer">
                <Icon.Linkedin className="edg-icon-16" /> LinkedIn
              </a>
            )}
            {developer.email && (
              <a href={`mailto:${developer.email}`}>
                <Icon.Mail className="edg-icon-16" /> Email
              </a>
            )}
            {developer.portfolio && (
              <a href={developer.portfolio} target="_blank" rel="noreferrer">
                <Icon.Globe className="edg-icon-16" /> Portfolio
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INTRO OVERLAY
   ============================================================ */
function IntroOverlay({ developers, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="edg-intro">
      <button type="button" className="edg-intro-skip" onClick={onDone}>
        Skip intro
      </button>
      <div className="edg-intro-content">
        <p className="edg-intro-eyebrow">EDUGUIDE AI</p>
        <p className="edg-intro-title">The people behind the experience</p>
        <div className="edg-intro-faces">
          {developers.map((d, i) => (
            <Avatar
              key={d.id}
              src={d.image}
              name={d.name}
              className="edg-intro-face"
              style={{ animationDelay: `${0.4 + i * 0.08}s` }}
            />
          ))}
        </div>
        <div className="edg-intro-progress" aria-hidden="true">
          <div className="edg-intro-progress-bar" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function Developer() {
  const [developers, setDevelopers] = useState(() =>
    mergeDevelopers(DEFAULT_DEVELOPERS, loadOverrides()),
  );
  const [editingId, setEditingId] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [toasts, pushToast, dismissToast] = useToasts();
  const reducedMotion = usePrefersReducedMotion();
  const teamRef = useRef(null);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(INTRO_KEY);
      if (!seen) setShowIntro(true);
    } catch {
      /* localStorage unavailable — skip intro silently */
    }
  }, []);

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    try {
      localStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next) => {
    const overrides = {};
    next.forEach((dev, i) => {
      const base = DEFAULT_DEVELOPERS[i];
      const diff = {};
      [
        "name",
        "role",
        "bio",
        "contribution",
        "github",
        "linkedin",
        "email",
        "portfolio",
      ].forEach((key) => {
        if (dev[key] !== base[key]) diff[key] = dev[key];
      });
      if (JSON.stringify(dev.skills) !== JSON.stringify(base.skills))
        diff.skills = dev.skills;
      if (dev.image !== base.image) diff.image = dev.image;
      if (Object.keys(diff).length > 0) overrides[dev.id] = diff;
    });
    return saveOverrides(overrides);
  }, []);

  const handleSave = useCallback(
    (id, data) => {
      setDevelopers((prev) => {
        const next = prev.map((d) => (d.id === id ? { ...d, ...data } : d));
        const ok = persist(next);
        if (ok) {
          pushToast("Profile updated successfully.");
        } else {
          pushToast("Could not save changes locally.", "error");
        }
        return next;
      });
      setEditingId(null);
    },
    [persist, pushToast],
  );

  const handleImageFile = useCallback(
    async (id, file) => {
      try {
        const dataUrl = await compressImageFile(file);
        setDevelopers((prev) => {
          const next = prev.map((d) =>
            d.id === id ? { ...d, image: dataUrl } : d,
          );
          const ok = persist(next);
          if (ok) {
            pushToast("Image uploaded successfully.");
          } else {
            pushToast(
              "Image is too large to save locally. Please choose a smaller image.",
              "error",
            );
          }
          return next;
        });
      } catch {
        pushToast(
          "Image is too large to save locally. Please choose a smaller image.",
          "error",
        );
      }
    },
    [persist, pushToast],
  );

  const handleRemoveImage = useCallback(
    (id) => {
      setDevelopers((prev) => {
        const next = prev.map((d) => (d.id === id ? { ...d, image: "" } : d));
        persist(next);
        pushToast("Image removed.");
        return next;
      });
    },
    [persist, pushToast],
  );

  const scrollToTeam = useCallback(() => {
    teamRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reducedMotion]);

  const activeModalDev = useMemo(
    () => developers.find((d) => d.id === modalId) || null,
    [developers, modalId],
  );

  return (
    <div className="edg-developer-page">
      {showIntro && (
        <IntroOverlay developers={developers} onDone={finishIntro} />
      )}

      <ScrollProgress />
      <MouseGlow reducedMotion={reducedMotion} />
      <ToastStack toasts={toasts} dismiss={dismissToast} />

      {/* ---------- HERO ---------- */}
      <section className="edg-hero">
        <div className="edg-hero-inner">
          <div className="edg-hero-copy">
            <Reveal as="p" className="edg-eyebrow">
              EduGuide AI / The team behind the experience
            </Reveal>
            <Reveal as="h1" className="edg-hero-title" delay={80}>
              Meet the minds behind EduGuide AI.
            </Reveal>
            <Reveal as="p" className="edg-hero-highlight" delay={140}>
              Built with curiosity. Designed for impact.
            </Reveal>
            <Reveal as="p" className="edg-hero-desc" delay={200}>
              Behind every intelligent experience is a team turning ideas,
              technology and curiosity into meaningful learning experiences.
            </Reveal>
            <Reveal delay={260}>
              <button
                type="button"
                className="edg-btn-primary edg-btn-large"
                onClick={scrollToTeam}
              >
                Meet the Team <span aria-hidden="true">↓</span>
              </button>
            </Reveal>
          </div>
          <Reveal className="edg-hero-visual" delay={160}>
            <HeroNetwork
              developers={developers}
              reducedMotion={reducedMotion}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="edg-section" id="team" ref={teamRef}>
        <Reveal as="h2" className="edg-section-title">
          Meet the Team
        </Reveal>
        <Reveal as="p" className="edg-section-subtitle" delay={60}>
          The people turning an idea into an experience.
        </Reveal>

        <div className="edg-team-grid">
          {developers.map((dev, i) => (
            <DeveloperCard
              key={dev.id}
              developer={dev}
              isEditing={editingId === dev.id}
              onStartEdit={setEditingId}
              onCancelEdit={() => setEditingId(null)}
              onSave={handleSave}
              onOpenModal={setModalId}
              onImageFile={handleImageFile}
              onRemoveImage={handleRemoveImage}
              pushToast={pushToast}
              delay={i * 60}
            />
          ))}
        </div>
      </section>

      {/* ---------- HOW WE BUILD ---------- */}
      <section className="edg-section edg-section--tint">
        <Reveal as="h2" className="edg-section-title">
          How We Build EduGuide
        </Reveal>
        <div className="edg-timeline">
          {BUILD_STEPS.map((step, i) => (
            <Reveal
              as="div"
              className="edg-timeline-step"
              key={step.num}
              delay={i * 90}
            >
              <span className="edg-timeline-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- TECHNOLOGY ---------- */}
      <section className="edg-section">
        <Reveal as="h2" className="edg-section-title">
          Powered by Technology
        </Reveal>
        <div className="edg-tech-grid">
          {TECHNOLOGIES.map((tech, i) => (
            <Reveal
              as="div"
              className="edg-tech-pill"
              key={tech}
              delay={i * 40}
            >
              <span className="edg-tech-mono">{tech.slice(0, 2)}</span>
              <span>{tech}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- PURPOSE ---------- */}
      <section className="edg-section edg-section--tint">
        <Reveal as="h2" className="edg-section-title">
          Built for a Bigger Purpose
        </Reveal>
        <Reveal as="div" className="edg-purpose-tags" delay={60}>
          {PURPOSE_DOMAINS.map((d) => (
            <span className="edg-tag" key={d}>
              {d}
            </span>
          ))}
        </Reveal>
        <div className="edg-purpose-grid">
          {PURPOSE_PILLARS.map((p, i) => (
            <Reveal
              as="div"
              className="edg-purpose-card"
              key={p.title}
              delay={i * 90}
            >
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="edg-section">
        <Reveal as="h2" className="edg-section-title">
          What Drives Us
        </Reveal>
        <div className="edg-values-grid">
          {VALUES.map((v, i) => (
            <Reveal
              as="div"
              className="edg-value-card"
              key={v.title}
              delay={i * 70}
            >
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="edg-cta">
        <Reveal as="h2" className="edg-cta-title">
          Built by people who believe technology should make learning better.
        </Reveal>
        <Reveal as="p" className="edg-cta-desc" delay={70}>
          EduGuide AI is more than a project. It is our attempt to make student
          growth easier to understand, improve and act upon.
        </Reveal>
        <Reveal className="edg-cta-actions" delay={140}>
          {/* Update the "to" path below if your home route is not "/" */}
          <Link to="/" className="edg-btn-primary edg-btn-large">
            Explore EduGuide <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="edg-btn-secondary edg-btn-large"
            onClick={scrollToTeam}
          >
            Meet the Team Again
          </button>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="edg-footer">
        <div className="edg-footer-inner">
          <div>
            <p className="edg-footer-brand">EduGuide AI</p>
            <p className="edg-footer-tagline">
              Intelligent insights for a better learning journey.
            </p>
          </div>
          {/* These map to existing EduGuide routes — wire real hrefs/Links if they differ */}
          <nav className="edg-footer-links" aria-label="Footer">
            <Link to="/">Home</Link>
            <span>Student Portal</span>
            <span>Staff Portal</span>
            <Link to="/developer">Meet the Developers</Link>
          </nav>
        </div>
      </footer>

      {activeModalDev && (
        <DeveloperModal
          developer={activeModalDev}
          onClose={() => setModalId(null)}
        />
      )}
    </div>
  );
}
