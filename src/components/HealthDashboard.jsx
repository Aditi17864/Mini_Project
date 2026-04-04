import { useState, useEffect } from "react";
import BroadcastCenter from "./BroadcastCenter";
import PendingRequests from "./PendingRequests";
import UsersManagement from "./UsersManagement";
import HealthWorkerPanel from "./HealthWorkerPanel";
import IndiaMap from "./IndiaMap";


// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    title: "ArogyaWatch",
    subtitle: "Rural Disease Surveillance System",
    overview: "Overview",
    heatmap: "Heatmap",
    trends: "Trends",
    water: "Water Quality",
    alerts: "Alerts",
    reports: "Field Reports",
    ai: "AI Prediction",
    resources: "Resources",
    filters: "Filters",
    totalCases: "Total Cases",
    highRisk: "High-Risk Areas",
    waterTested: "Water Tested",
    alertsToday: "Alerts Today",
    admin: "Admin",
    healthOfficer: "Health Officer",
    fieldWorker: "Field Worker",
    darkMode: "Dark Mode",
    language: "Language",
    exportPDF: "Export PDF",
    exportExcel: "Export Excel",
    search: "Search reports…",
    location: "Location",
    disease: "Disease Type",
    timeRange: "Time Range",
    waterSource: "Water Source",
  },
  hi: {
    title: "आरोग्यवॉच",
    subtitle: "ग्रामीण रोग निगरानी प्रणाली",
    overview: "अवलोकन",
    heatmap: "हीटमैप",
    trends: "रुझान",
    water: "जल गुणवत्ता",
    alerts: "अलर्ट",
    reports: "फील्ड रिपोर्ट",
    ai: "AI भविष्यवाणी",
    resources: "संसाधन",
    filters: "फ़िल्टर",
    totalCases: "कुल मामले",
    highRisk: "उच्च जोखिम क्षेत्र",
    waterTested: "जल परीक्षण",
    alertsToday: "आज के अलर्ट",
    admin: "एडमिन",
    healthOfficer: "स्वास्थ्य अधिकारी",
    fieldWorker: "फील्ड वर्कर",
    darkMode: "डार्क मोड",
    language: "भाषा",
    exportPDF: "PDF निर्यात",
    exportExcel: "Excel निर्यात",
    search: "खोजें...",
    location: "स्थान",
    disease: "बीमारी का प्रकार",
    timeRange: "समय सीमा",
    waterSource: "जल स्रोत",
  },
};

const VILLAGES = [
  { id: 1, name: "Ramnagar", x: 28, y: 32, risk: "high", cases: 47, symptoms: ["Diarrhea", "Vomiting", "Fever"], waterStatus: "Contaminated", lat: 25.4, lng: 81.8 },
  { id: 2, name: "Shivpur", x: 52, y: 22, risk: "medium", cases: 18, symptoms: ["Fever", "Nausea"], waterStatus: "Moderate", lat: 25.6, lng: 82.1 },
  { id: 3, name: "Devgaon", x: 72, y: 45, risk: "low", cases: 3, symptoms: ["Mild Fever"], waterStatus: "Safe", lat: 25.2, lng: 82.4 },
  { id: 4, name: "Chandpur", x: 38, y: 65, risk: "high", cases: 61, symptoms: ["Cholera", "Severe Diarrhea", "Dehydration"], waterStatus: "Contaminated", lat: 25.0, lng: 81.9 },
  { id: 5, name: "Laxmipur", x: 65, y: 70, risk: "medium", cases: 22, symptoms: ["Typhoid", "Fever"], waterStatus: "Moderate", lat: 24.8, lng: 82.3 },
  { id: 6, name: "Anandpur", x: 18, y: 55, risk: "low", cases: 5, symptoms: ["Cold"], waterStatus: "Safe", lat: 25.3, lng: 81.5 },
  { id: 7, name: "Krishnapur", x: 82, y: 25, risk: "medium", cases: 14, symptoms: ["Diarrhea", "Fever"], waterStatus: "Moderate", lat: 25.7, lng: 82.6 },
  { id: 8, name: "Balipur", x: 45, y: 42, risk: "high", cases: 38, symptoms: ["Cholera", "Vomiting"], waterStatus: "Contaminated", lat: 25.1, lng: 82.0 },
];

const TREND_DATA = {
  daily: [
    { label: "Mon", cholera: 12, diarrhea: 28, typhoid: 8 },
    { label: "Tue", cholera: 18, diarrhea: 35, typhoid: 11 },
    { label: "Wed", cholera: 22, diarrhea: 41, typhoid: 9 },
    { label: "Thu", cholera: 15, diarrhea: 33, typhoid: 14 },
    { label: "Fri", cholera: 31, diarrhea: 52, typhoid: 18 },
    { label: "Sat", cholera: 28, diarrhea: 48, typhoid: 22 },
    { label: "Sun", cholera: 19, diarrhea: 39, typhoid: 16 },
  ],
  weekly: [
    { label: "W1", cholera: 68, diarrhea: 142, typhoid: 45 },
    { label: "W2", cholera: 85, diarrhea: 178, typhoid: 52 },
    { label: "W3", cholera: 112, diarrhea: 203, typhoid: 67 },
    { label: "W4", cholera: 145, diarrhea: 241, typhoid: 88 },
  ],
};

const WATER_SOURCES = [
  { id: "WS-01", name: "Ramnagar Well", pH: 5.8, turbidity: 78, bacteria: "unsafe", location: "Ramnagar" },
  { id: "WS-02", name: "Shivpur Pond", pH: 6.9, turbidity: 42, bacteria: "moderate", location: "Shivpur" },
  { id: "WS-03", name: "Devgaon Borewell", pH: 7.2, turbidity: 12, bacteria: "safe", location: "Devgaon" },
  { id: "WS-04", name: "Chandpur River", pH: 5.4, turbidity: 91, bacteria: "unsafe", location: "Chandpur" },
];

const ALERTS = [
  { id: 1, severity: "critical", message: "High contamination detected in Chandpur water supply", time: "14 min ago", location: "Chandpur", type: "water" },
  { id: 2, severity: "high", message: "Spike in diarrhea cases — 61 new reports in 24h", time: "1h ago", location: "Chandpur", type: "disease" },
  { id: 3, severity: "high", message: "Cholera outbreak probability exceeds 80% in Ramnagar", time: "2h ago", location: "Ramnagar", type: "ai" },
  { id: 4, severity: "medium", message: "Typhoid cases rising in Laxmipur region", time: "3h ago", location: "Laxmipur", type: "disease" },
  { id: 5, severity: "medium", message: "pH levels below safe threshold in WS-02", time: "4h ago", location: "Shivpur", type: "water" },
  { id: 6, severity: "low", message: "Field report submitted — Anandpur cluster", time: "5h ago", location: "Anandpur", type: "report" },
];

const FIELD_REPORTS = [
  { id: "ASH-001", worker: "Priya Sharma", location: "Ramnagar", symptoms: "Diarrhea, Vomiting", date: "2024-01-15", status: "verified" },
  { id: "ASH-002", worker: "Rahul Verma", location: "Chandpur", symptoms: "Cholera symptoms, Severe dehydration", date: "2024-01-15", status: "urgent" },
  { id: "ASH-003", worker: "Sunita Devi", location: "Shivpur", symptoms: "Fever, Nausea", date: "2024-01-14", status: "pending" },
  { id: "ASH-004", worker: "Manoj Kumar", location: "Laxmipur", symptoms: "Typhoid, High fever", date: "2024-01-14", status: "verified" },
  { id: "ASH-005", worker: "Anita Singh", location: "Devgaon", symptoms: "Mild fever, Cough", date: "2024-01-13", status: "resolved" },
  { id: "ASH-006", worker: "Vikram Yadav", location: "Balipur", symptoms: "Vomiting, Diarrhea", date: "2024-01-13", status: "urgent" },
];

const PREDICTIONS = [
  { disease: "Cholera", probability: 82, trend: "up", factors: ["Heavy rainfall last 48h", "Contaminated WS-01 & WS-04", "Rapid case doubling rate"], color: "#ff4d6d", glow: "rgba(255,77,109,0.4)" },
  { disease: "Diarrhea", probability: 91, trend: "up", factors: ["Poor sanitation in Chandpur", "Untreated water consumption", "Community clustering"], color: "#ff8c42", glow: "rgba(255,140,66,0.4)" },
  { disease: "Typhoid", probability: 54, trend: "stable", factors: ["Moderate water quality", "Rising fever cases", "Seasonal pattern match"], color: "#ffd166", glow: "rgba(255,209,102,0.4)" },
];

const RESOURCES = {
  doctors: { available: 8, total: 15, deployed: 7 },
  beds: { available: 34, total: 80, deployed: 46 },
  medicines: { ors: 840, antibiotics: 320, chlorine: 150 },
  actions: [
    { priority: "urgent", action: "Deploy medical team to Chandpur immediately", resource: "3 Doctors + 10 Beds" },
    { priority: "high", action: "Distribute ORS packets in Ramnagar cluster", resource: "200 ORS packets" },
    { priority: "medium", action: "Water chlorination in Shivpur source WS-02", resource: "30 Chlorine tablets" },
  ],
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const THEME = {
  dark: {
    bg: "#102a17",
    bgSecondary: "#144226",
    surface: "rgba(16, 42, 23, 0.92)",
    surfaceHover: "rgba(22, 58, 30, 0.96)",
    glass: "rgba(17, 43, 22, 0.72)",
    glassBorder: "rgba(34, 197, 94, 0.2)",
    border: "rgba(34, 197, 94, 0.12)",
    text: "#e2f8e9",
    textMuted: "#a3d9b0",
    textDim: "#cde5d4",
    accent: "#4ade80",
    accentGlow: "rgba(74, 222, 128, 0.25)",
    sidebarBg: "rgba(5, 27, 14, 0.96)",
  },
  light: {
    bg: "#f4fbf5",
    bgSecondary: "#e5f6e8",
    surface: "rgba(255,255,255,0.95)",
    surfaceHover: "rgba(255,255,255,1)",
    glass: "rgba(255,255,255,0.88)",
    glassBorder: "rgba(34, 197, 94, 0.18)",
    border: "rgba(34, 197, 94, 0.15)",
    text: "#1f3a2f",
    textMuted: "#4f645b",
    textDim: "#5f766d",
    accent: "#16a34a",
    accentGlow: "rgba(22, 163, 74, 0.25)",
    sidebarBg: "rgba(255,255,255,0.96)",
  },
};

// ─── MINI COMPONENTS ──────────────────────────────────────────────────────────

function Card({ children, th, style = {}, glow, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered ? th.surfaceHover : th.surface,
        border: `1px solid ${th.glassBorder}`,
        borderRadius: 16,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: "all 0.3s ease",
        boxShadow: hovered && glow
          ? `0 0 40px ${glow}, 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transform: hover && hovered ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function KPICard({ icon, label, value, sub, gradient, dark }) {
  const th = THEME[dark ? "dark" : "light"];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? th.surfaceHover : th.surface,
        border: `1px solid ${th.glassBorder}`,
        borderRadius: 16,
        padding: "22px 24px",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px ${th.glassBorder}`
          : `0 4px 20px rgba(0,0,0,0.15)`,
        cursor: "default",
      }}
    >
      {/* Gradient orb bg */}
      <div style={{
        position: "absolute", top: -20, right: -20, width: 80, height: 80,
        background: gradient, borderRadius: "50%", filter: "blur(30px)", opacity: 0.35,
        transition: "opacity 0.3s", ...(hovered ? { opacity: 0.55 } : {}),
      }} />
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: gradient, borderRadius: "16px 16px 0 0",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, position: "relative" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: `${gradient}22`,
          border: `1px solid ${gradient.includes(",") ? "rgba(255,255,255,0.15)" : gradient + "44"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
          boxShadow: `0 4px 12px rgba(0,0,0,0.2)`,
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", color: th.textMuted, textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "'Space Mono', monospace", color: th.text, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
          <div style={{
            fontSize: 11, marginTop: 6, fontFamily: "'Space Mono', monospace",
            background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

function GaugeBar({ label, value, max, unit, color, dark }) {
  const pct = Math.min(100, (value / max) * 100);
  const th = THEME[dark ? "dark" : "light"];
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
        <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: th.textMuted }}>{label}</span>
        <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700, color }}>{value}{unit}</span>
      </div>
      <div style={{ height: 6, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 10, transition: "width 1s ease",
          boxShadow: `0 0 8px ${color}66`,
        }} />
      </div>
    </div>
  );
}

function MiniLineChart({ data, dark }) {
  const W = 320, H = 110;
  const maxVal = Math.max(...data.flatMap(d => [d.cholera, d.diarrhea, d.typhoid]));
  const px = (i) => (i / (data.length - 1)) * (W - 40) + 20;
  const py = (v) => H - 22 - ((v / maxVal) * (H - 36));
  const makePath = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(d[key])}`).join(" ");
  const makeArea = (key) => {
    const pts = data.map((d, i) => `${px(i)},${py(d[key])}`).join(" L ");
    const first = `${px(0)},${py(data[0][key])}`;
    const last = `${px(data.length - 1)},${py(data[data.length - 1][key])}`;
    return `M ${first} L ${pts} L ${last} L ${px(data.length - 1)},${H - 2} L ${px(0)},${H - 2} Z`;
  };

  const th = THEME[dark ? "dark" : "light"];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="gr1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity="0.3" /><stop offset="100%" stopColor="#f97316" stopOpacity="0" /></linearGradient>
        <linearGradient id="gr2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.3" /><stop offset="100%" stopColor="#ff4d6d" stopOpacity="0" /></linearGradient>
        <linearGradient id="gr3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.2" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></linearGradient>
      </defs>
      <path d={makeArea("diarrhea")} fill="url(#gr1)" />
      <path d={makeArea("cholera")} fill="url(#gr2)" />
      <path d={makeArea("typhoid")} fill="url(#gr3)" />
      <path d={makePath("diarrhea")} fill="none" stroke="#f97316" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" filter="url(#glow1)" />
      <path d={makePath("cholera")} fill="none" stroke="#ff4d6d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={makePath("typhoid")} fill="none" stroke="#ffd166" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <text key={i} x={px(i)} y={H - 4} textAnchor="middle" fontSize={8} fill={th.textMuted} fontFamily="'Space Mono', monospace">{d.label}</text>
      ))}
      {/* dots */}
      {data.map((d, i) => [
        <circle key={`d-${i}`} cx={px(i)} cy={py(d.diarrhea)} r={3} fill="#f97316" />,
        <circle key={`c-${i}`} cx={px(i)} cy={py(d.cholera)} r={3} fill="#ff4d6d" />,
        <circle key={`t-${i}`} cx={px(i)} cy={py(d.typhoid)} r={2.5} fill="#ffd166" />,
      ])}
    </svg>
  );
}

function AlertBadge({ severity }) {
  const cfg = {
    critical: { bg: "linear-gradient(135deg,#ff4d6d,#c9184a)", color: "#fff", label: "CRITICAL" },
    high: { bg: "linear-gradient(135deg,#ff8c42,#e63946)", color: "#fff", label: "HIGH" },
    medium: { bg: "linear-gradient(135deg,#ffd166,#f4a261)", color: "#000", label: "MED" },
    low: { bg: "linear-gradient(135deg,#06d6a0,#1b9aaa)", color: "#fff", label: "LOW" },
  };
  const c = cfg[severity] || cfg.low;
  return (
    <span style={{
      background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 6,
      fontSize: 9, fontFamily: "'Space Mono', monospace", fontWeight: 700,
      letterSpacing: "0.1em", whiteSpace: "nowrap",
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    }}>{c.label}</span>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function HeatmapSection({ dark, t }) {
  const th = THEME[dark ? "dark" : "light"];

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Card th={th} style={{ flex: 2, minWidth: 280, padding: 20 }} hover={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: th.textMuted, letterSpacing: "0.1em" }}>DISEASE HEATMAP</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: th.text, marginTop: 2 }}>India Disease Risk Map</div>
          </div>
        </div>
        <div style={{
          position: "relative", height: 500,
          borderRadius: 12, overflow: "hidden",
          border: `1px solid ${th.glassBorder}`,
        }}>
          <IndiaMap showLegend={true} />
        </div>
      </Card>
    </div>
  );
}

function WaterSection({ dark }) {
  const th = THEME[dark ? "dark" : "light"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
      {WATER_SOURCES.map(ws => {
        const safeColor = ws.bacteria === "safe" ? "#06d6a0" : ws.bacteria === "moderate" ? "#ffd166" : "#ff4d6d";
        const safeGlow = ws.bacteria === "safe" ? "rgba(6,214,160,0.3)" : ws.bacteria === "moderate" ? "rgba(255,209,102,0.3)" : "rgba(255,77,109,0.3)";
        return (
          <Card key={ws.id} th={th} glow={safeGlow} style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.textMuted, letterSpacing: "0.1em" }}>{ws.id}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: th.text, marginTop: 3 }}>{ws.name}</div>
                <div style={{ fontSize: 11, color: th.textMuted, marginTop: 2 }}>📍 {ws.location}</div>
              </div>
              <span style={{
                background: `linear-gradient(135deg, ${safeColor}33, ${safeColor}11)`,
                color: safeColor, padding: "4px 10px", borderRadius: 8, fontSize: 9,
                fontFamily: "'Space Mono', monospace", fontWeight: 700, letterSpacing: "0.08em",
                border: `1px solid ${safeColor}44`,
                boxShadow: `0 0 10px ${safeGlow}`,
              }}>{ws.bacteria.toUpperCase()}</span>
            </div>
            <GaugeBar label="pH Level" value={ws.pH} max={14} unit="" color={ws.pH >= 6.5 && ws.pH <= 8.5 ? "#06d6a0" : "#ff4d6d"} dark={dark} />
            <GaugeBar label="Turbidity (NTU)" value={ws.turbidity} max={100} unit="" color={ws.turbidity < 30 ? "#06d6a0" : ws.turbidity < 60 ? "#ffd166" : "#ff4d6d"} dark={dark} />
            <div style={{
              marginTop: 14, padding: "10px 14px",
              background: `linear-gradient(135deg, ${safeColor}18, ${safeColor}08)`,
              borderRadius: 10, display: "flex", alignItems: "center", gap: 10,
              border: `1px solid ${safeColor}25`,
            }}>
              <span style={{ fontSize: 18 }}>{ws.bacteria === "safe" ? "✅" : ws.bacteria === "moderate" ? "⚠️" : "🚫"}</span>
              <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: safeColor, fontWeight: 700 }}>
                Bacterial: {ws.bacteria.toUpperCase()}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function AlertsSection({ dark }) {
  const [filter, setFilter] = useState("all");
  const th = THEME[dark ? "dark" : "light"];
  const types = ["all", "water", "disease", "ai", "report"];
  const filtered = filter === "all" ? ALERTS : ALERTS.filter(a => a.type === filter);
  const sev = { critical: 0, high: 1, medium: 2, low: 3 };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {types.map(tp => (
          <button key={tp} onClick={() => setFilter(tp)} style={{
            padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.08em",
            background: filter === tp
              ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
              : th.glass,
            color: filter === tp ? "#fff" : th.textMuted,
            backdropFilter: "blur(10px)",
            transition: "all 0.2s",
            boxShadow: filter === tp ? "0 4px 16px rgba(99,102,241,0.4)" : "none",
            border: filter === tp ? "none" : `1px solid ${th.glassBorder}`,
          }}>{tp.toUpperCase()}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.sort((a, b) => sev[a.severity] - sev[b.severity]).map(alert => {
          const colors = { critical: "#ff4d6d", high: "#ff8c42", medium: "#ffd166", low: "#06d6a0" };
          const c = colors[alert.severity];
          return (
            <div key={alert.id} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
              background: th.surface,
              border: `1px solid ${th.glassBorder}`,
              borderLeft: `3px solid ${c}`,
              borderRadius: "0 12px 12px 0",
              backdropFilter: "blur(20px)",
              transition: "all 0.2s",
              cursor: "pointer",
              boxShadow: `0 2px 12px rgba(0,0,0,0.15), -3px 0 0 ${c}`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.2), inset 0 0 40px ${c}10`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = `0 2px 12px rgba(0,0,0,0.15)`; }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0, boxShadow: `0 0 8px ${c}` }} />
              <AlertBadge severity={alert.severity} />
              <span style={{ flex: 1, fontSize: 13, color: th.text }}>{alert.message}</span>
              <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.textMuted, whiteSpace: "nowrap" }}>{alert.time}</span>
              <span style={{
                fontSize: 9, background: "rgba(99,102,241,0.15)",
                padding: "3px 8px", borderRadius: 6, color: "#a5b4fc",
                fontFamily: "'Space Mono', monospace",
                border: "1px solid rgba(99,102,241,0.2)",
              }}>{alert.location}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReportsSection({ dark, t }) {
  const [search, setSearch] = useState("");
  const th = THEME[dark ? "dark" : "light"];
  const filtered = FIELD_REPORTS.filter(r =>
    r.worker.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase()) ||
    r.symptoms.toLowerCase().includes(search.toLowerCase())
  );
  const statusColor = { verified: "#06d6a0", urgent: "#ff4d6d", pending: "#ffd166", resolved: "#6366f1" };
  const statusGrad = {
    verified: "linear-gradient(135deg,#06d6a0,#1b9aaa)",
    urgent: "linear-gradient(135deg,#ff4d6d,#c9184a)",
    pending: "linear-gradient(135deg,#ffd166,#f4a261)",
    resolved: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  };

  return (
    <div>
      <div style={{ position: "relative", marginBottom: 20 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.5 }}>🔍</span>
        <input
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "12px 14px 12px 40px", borderRadius: 10,
            border: `1px solid ${th.glassBorder}`,
            background: th.glass, color: th.text,
            fontFamily: "'Space Mono', monospace", fontSize: 12, boxSizing: "border-box", outline: "none",
            backdropFilter: "blur(20px)",
          }}
        />
      </div>
      <Card th={th} hover={false} style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${th.border}` }}>
                {["Worker ID", "Field Worker", "Location", "Symptoms", "Date", "Status"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: th.textMuted, letterSpacing: "0.08em", fontSize: 9, whiteSpace: "nowrap", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} style={{
                  borderBottom: `1px solid ${th.border}`,
                  background: i % 2 === 0 ? "transparent" : dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"}
                >
                  <td style={{ padding: "12px 16px", color: "#818cf8", fontWeight: 700 }}>{r.id}</td>
                  <td style={{ padding: "12px 16px", color: th.text }}>{r.worker}</td>
                  <td style={{ padding: "12px 16px", color: th.textDim }}>📍 {r.location}</td>
                  <td style={{ padding: "12px 16px", color: th.textDim, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.symptoms}</td>
                  <td style={{ padding: "12px 16px", color: th.textMuted }}>{r.date}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      background: statusGrad[r.status], color: "white",
                      padding: "3px 10px", borderRadius: 6, fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.08em", boxShadow: `0 2px 8px ${statusColor[r.status]}44`,
                    }}>{r.status.toUpperCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AIPredictionSection({ dark }) {
  const th = THEME[dark ? "dark" : "light"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {PREDICTIONS.map(pred => (
        <Card key={pred.disease} th={th} glow={pred.glow} style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `linear-gradient(135deg, ${pred.color}33, ${pred.color}11)`,
                border: `1px solid ${pred.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                boxShadow: `0 0 20px ${pred.glow}`,
              }}>🧠</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: th.text, letterSpacing: "-0.01em" }}>{pred.disease} Outbreak Risk</h3>
                <span style={{
                  fontSize: 11, fontFamily: "'Space Mono', monospace",
                  color: pred.trend === "up" ? "#ff4d6d" : "#06d6a0",
                  fontWeight: 700,
                }}>{pred.trend === "up" ? "↑ RISING TREND" : "→ STABLE TREND"}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: 40, fontWeight: 900, fontFamily: "'Space Mono', monospace", color: pred.color, lineHeight: 1,
                textShadow: `0 0 30px ${pred.glow}`,
              }}>{pred.probability}%</div>
              <div style={{ fontSize: 9, color: th.textMuted, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", marginTop: 4 }}>OUTBREAK PROBABILITY</div>
            </div>
          </div>

          <div style={{ height: 8, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", borderRadius: 10, marginBottom: 16, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pred.probability}%`,
              background: `linear-gradient(90deg, ${pred.color}66, ${pred.color})`,
              borderRadius: 10, transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: `0 0 12px ${pred.glow}`,
            }} />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {pred.factors.map(f => (
              <span key={f} style={{
                background: `${pred.color}12`, color: pred.color,
                padding: "5px 12px", borderRadius: 8, fontSize: 11, fontFamily: "'Space Mono', monospace",
                border: `1px solid ${pred.color}25`,
              }}>⚠ {f}</span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ResourceSection({ dark }) {
  const th = THEME[dark ? "dark" : "light"];
  const res = RESOURCES;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        {[
          { emoji: "👨‍⚕️", label: "DOCTORS AVAIL.", val: res.doctors.available, total: res.doctors.total, deployed: res.doctors.deployed, barLabel: "Deployed", color: "#6366f1" },
          { emoji: "🛏️", label: "BEDS AVAILABLE", val: res.beds.available, total: res.beds.total, deployed: res.beds.deployed, barLabel: "Occupied", color: "#f97316" },
        ].map(item => (
          <Card key={item.label} th={th} glow={`${item.color}44`} style={{ padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Mono', monospace", color: th.text, lineHeight: 1 }}>
              {item.val}<span style={{ fontSize: 14, color: th.textMuted }}>/{item.total}</span>
            </div>
            <div style={{ fontSize: 9, color: th.textMuted, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", margin: "8px 0 14px" }}>{item.label}</div>
            <GaugeBar label={item.barLabel} value={item.deployed} max={item.total} unit="" color={item.color} dark={dark} />
          </Card>
        ))}
        <Card th={th} glow="rgba(167,139,250,0.3)" style={{ padding: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 6, textAlign: "center" }}>💊</div>
          <div style={{ fontSize: 9, color: th.textMuted, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", marginBottom: 14, textAlign: "center" }}>MEDICINE STOCK</div>
          {[["ORS Packets", res.medicines.ors, 1000, "#06d6a0"], ["Antibiotics", res.medicines.antibiotics, 500, "#6366f1"], ["Chlorine Tabs", res.medicines.chlorine, 300, "#a78bfa"]].map(([label, val, max, color]) => (
            <GaugeBar key={label} label={label} value={val} max={max} unit="" color={color} dark={dark} />
          ))}
        </Card>
      </div>

      <Card th={th} hover={false} style={{ padding: 22 }}>
        <div style={{
          fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.textMuted, letterSpacing: "0.12em",
          marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 3, height: 14, background: "linear-gradient(#6366f1,#8b5cf6)", borderRadius: 2, display: "inline-block" }} />
          RECOMMENDED ACTIONS
        </div>
        {res.actions.map((a, i) => {
          const pColor = { urgent: "#ff4d6d", high: "#ff8c42", medium: "#ffd166" };
          const pGrad = { urgent: "linear-gradient(135deg,#ff4d6d,#c9184a)", high: "linear-gradient(135deg,#ff8c42,#e63946)", medium: "linear-gradient(135deg,#ffd166,#f4a261)" };
          const c = pColor[a.priority];
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 0",
              borderBottom: i < res.actions.length - 1 ? `1px solid ${th.border}` : "none",
            }}>
              <span style={{
                background: pGrad[a.priority], color: "white",
                padding: "3px 10px", borderRadius: 6, fontSize: 9, fontFamily: "'Space Mono', monospace",
                fontWeight: 700, flexShrink: 0, letterSpacing: "0.08em",
                boxShadow: `0 2px 8px ${c}55`,
              }}>{a.priority.toUpperCase()}</span>
              <span style={{ flex: 1, fontSize: 13, color: th.text }}>{a.action}</span>
              <button style={{
                background: `linear-gradient(135deg, ${c}33, ${c}11)`, color: c,
                border: `1px solid ${c}44`, borderRadius: 8, padding: "7px 14px",
                cursor: "pointer", fontSize: 10, fontFamily: "'Space Mono', monospace",
                whiteSpace: "nowrap", fontWeight: 700, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${c}, ${c}cc)`; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${c}33, ${c}11)`; e.currentTarget.style.color = c; }}
              >{a.resource}</button>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

function TrendsSection({ dark }) {
  const [view, setView] = useState("daily");
  const th = THEME[dark ? "dark" : "light"];
  const data = TREND_DATA[view];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
        {["daily", "weekly"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer",
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.08em",
            background: view === v ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : th.glass,
            color: view === v ? "#fff" : th.textMuted,
            backdropFilter: "blur(10px)",
            boxShadow: view === v ? "0 4px 16px rgba(99,102,241,0.4)" : "none",
            border: view === v ? "none" : `1px solid ${th.glassBorder}`,
            transition: "all 0.2s",
          }}>{v.toUpperCase()}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
          {[["Diarrhea", "#f97316"], ["Cholera", "#ff4d6d"], ["Typhoid", "#ffd166"]].map(([label, color]) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: "'Space Mono', monospace", color: th.textMuted }}>
              <span style={{ width: 20, height: 3, background: color, display: "inline-block", borderRadius: 2, boxShadow: `0 0 4px ${color}` }} />{label}
            </span>
          ))}
        </div>
      </div>

      <Card th={th} hover={false} style={{ padding: 20 }}>
        <MiniLineChart data={data} dark={dark} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 16 }}>
          {[["Diarrhea", data.reduce((s, d) => s + d.diarrhea, 0), "#f97316", "linear-gradient(135deg,#f97316,#ea580c)"],
            ["Cholera", data.reduce((s, d) => s + d.cholera, 0), "#ff4d6d", "linear-gradient(135deg,#ff4d6d,#c9184a)"],
            ["Typhoid", data.reduce((s, d) => s + d.typhoid, 0), "#ffd166", "linear-gradient(135deg,#ffd166,#f59e0b)"]].map(([label, total, color, grad]) => (
            <div key={label} style={{
              textAlign: "center", padding: "14px 12px",
              background: `${color}12`, borderRadius: 10,
              border: `1px solid ${color}25`,
            }}>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Mono', monospace", color, textShadow: `0 0 20px ${color}66` }}>{total}</div>
              <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.textMuted, letterSpacing: "0.08em", marginTop: 4 }}>{label.toUpperCase()} ({view})</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function FiltersSection({ dark, t }) {
  const [filters, setFilters] = useState({ location: "all", disease: "all", timeRange: "7d", waterSource: "all" });
  const set = (k, v) => setFilters(f => ({ ...f, [k]: v }));
  const th = THEME[dark ? "dark" : "light"];
  const selectStyle = {
    padding: "10px 12px", borderRadius: 8, border: `1px solid ${th.glassBorder}`,
    background: th.glass, color: th.text, backdropFilter: "blur(10px)",
    fontFamily: "'Space Mono', monospace", fontSize: 11, width: "100%",
    cursor: "pointer", outline: "none", transition: "border-color 0.2s",
  };

  return (
    <Card th={th} hover={false} style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <span style={{ width: 3, height: 16, background: "linear-gradient(#6366f1,#8b5cf6)", borderRadius: 2, display: "inline-block" }} />
        <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: th.textMuted, letterSpacing: "0.12em" }}>SMART FILTERS</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
        {[
          { key: "location", label: t.location, options: [{ value: "all", label: "All Locations" }, ...VILLAGES.map(v => ({ value: v.name, label: v.name }))] },
          { key: "disease", label: t.disease, options: [{ value: "all", label: "All Diseases" }, { value: "cholera", label: "Cholera" }, { value: "diarrhea", label: "Diarrhea" }, { value: "typhoid", label: "Typhoid" }] },
          { key: "timeRange", label: t.timeRange, options: [{ value: "1d", label: "Last 24 Hours" }, { value: "7d", label: "Last 7 Days" }, { value: "30d", label: "Last 30 Days" }, { value: "90d", label: "Last 3 Months" }] },
          { key: "waterSource", label: t.waterSource, options: [{ value: "all", label: "All Sources" }, ...WATER_SOURCES.map(ws => ({ value: ws.id, label: ws.name }))] },
        ].map(field => (
          <div key={field.key}>
            <label style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.textMuted, display: "block", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>{field.label}</label>
            <select style={selectStyle} value={filters[field.key]} onChange={e => set(field.key, e.target.value)}>
              {field.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </div>
      <button style={{
        marginTop: 20, padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "white", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.08em",
        fontWeight: 700, boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
        transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(99,102,241,0.7)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.5)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >APPLY FILTERS</button>
    </Card>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function HealthDashboard({ user, onLogout }) {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const [section, setSection] = useState("overview");
  const [role, setRole] = useState("admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [time, setTime] = useState(new Date());
  const [pendingRequests, setPendingRequests] = useState([]);
  const t = TRANSLATIONS[lang];
  const th = THEME[dark ? "dark" : "light"];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const NAV_ITEMS = [
    { id: "overview", icon: "📊", label: t.overview },
    { id: "broadcast", icon: "📡", label: "Broadcast" },
    { id: "pending", icon: "⏳", label: "Pending" },
    { id: "users", icon: "👥", label: "Users" },
    { id: "healthworker", icon: "🏥", label: "Health Worker" },
    { id: "heatmap", icon: "🗺️", label: t.heatmap },
    { id: "trends", icon: "📈", label: t.trends },
    { id: "water", icon: "💧", label: t.water },
    { id: "alerts", icon: "🚨", label: t.alerts, badge: 3 },
    { id: "reports", icon: "📋", label: t.reports },
    { id: "ai", icon: "🧠", label: t.ai },
    { id: "resources", icon: "🏥", label: t.resources },
    { id: "filters", icon: "⚙️", label: t.filters },
  ];

  const ROLE_ACCESS = {
    admin: ["overview", "broadcast", "pending", "users", "heatmap", "trends", "water", "alerts", "reports", "ai", "resources", "filters"],
    healthOfficer: ["overview", "healthworker", "heatmap", "alerts", "water", "ai"],
    fieldWorker: ["healthworker", "reports", "alerts"],
  };

  const accessibleSections = ROLE_ACCESS[role];
  const visibleNav = NAV_ITEMS.filter(n => accessibleSections.includes(n.id));
  const sectionTitle = NAV_ITEMS.find(n => n.id === section)?.label || "";

  const renderSection = () => {
    if (!accessibleSections.includes(section)) {
      return (
        <div style={{ textAlign: "center", padding: 80, color: th.textMuted, fontFamily: "'Space Mono', monospace" }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🔒</div>
          <div style={{ fontSize: 13 }}>Access restricted for your role.</div>
        </div>
      );
    }
    switch (section) {
      case "overview": return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <KPICard icon="🦠" label={t.totalCases} value="208" sub="↑ 23 in last 24h" gradient="linear-gradient(135deg,#ff4d6d,#c9184a)" dark={dark} />
            <KPICard icon="🔴" label={t.highRisk} value="3" sub="Chandpur, Ramnagar, Balipur" gradient="linear-gradient(135deg,#ff8c42,#e63946)" dark={dark} />
            <KPICard icon="💧" label={t.waterTested} value="4" sub="2 sources contaminated" gradient="linear-gradient(135deg,#3b82f6,#6366f1)" dark={dark} />
            <KPICard icon="🚨" label={t.alertsToday} value="6" sub="3 critical, 2 high" gradient="linear-gradient(135deg,#a78bfa,#8b5cf6)" dark={dark} />
          </div>
          <HeatmapSection dark={dark} t={t} />
          <TrendsSection dark={dark} />
        </div>
      );
      case "broadcast": return <BroadcastCenter dark={dark} />;
      case "pending": return <PendingRequests dark={dark} requests={pendingRequests} />;
      case "users": return <UsersManagement dark={dark} />;
      case "healthworker": return <HealthWorkerPanel dark={dark} onSubmit={(req) => setPendingRequests([...pendingRequests, req])} />;
      case "heatmap": return <HeatmapSection dark={dark} t={t} />;
      case "trends": return <TrendsSection dark={dark} />;
      case "water": return <WaterSection dark={dark} />;
      case "alerts": return <AlertsSection dark={dark} t={t} />;
      case "reports": return <ReportsSection dark={dark} t={t} />;
      case "ai": return <AIPredictionSection dark={dark} />;
      case "resources": return <ResourceSection dark={dark} />;
      case "filters": return <FiltersSection dark={dark} t={t} />;
      default: return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(255,77,109,0.8), 0 0 12px rgba(255,77,109,0.6); }
          70% { box-shadow: 0 0 0 12px rgba(255,77,109,0), 0 0 12px rgba(255,77,109,0.6); }
          100% { box-shadow: 0 0 0 0 rgba(255,77,109,0), 0 0 12px rgba(255,77,109,0.6); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.9); }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.35); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(16,185,129,0.55); }
        select option { background: #effbf0; color: #17422f; }
      `}</style>

      <div style={{
        display: "flex", minHeight: "100vh",
        background: dark
          ? "radial-gradient(ellipse at 20% 20%, #163b1e 0%, #0b2413 45%, #091e12 100%)"
          : "radial-gradient(ellipse at 20% 20%, #f3fcf3 0%, #e2f6e4 40%, #d4efd7 100%)",
        fontFamily: "'Outfit', sans-serif",
        transition: "background 0.5s",
        position: "relative",
      }}>

        {/* Ambient background blobs */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        {/* SIDEBAR */}
        <aside style={{
          width: sidebarOpen ? 244 : 66, flexShrink: 0,
          background: th.sidebarBg,
          borderRight: `1px solid ${th.glassBorder}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
          position: "relative", zIndex: 10,
          boxShadow: "4px 0 32px rgba(0,0,0,0.3)",
        }}>
          {/* Logo */}
          <div style={{ padding: "20px 16px", borderBottom: `1px solid ${th.glassBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg,#ff4d6d,#f97316)",
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
              boxShadow: "0 4px 16px rgba(255,77,109,0.5)",
            }}>🏥</div>
            {sidebarOpen && (
              <div style={{ overflow: "hidden" }}>
                <div style={{
                  fontSize: 17, fontWeight: 900, letterSpacing: "-0.03em", whiteSpace: "nowrap",
                  background: "linear-gradient(135deg, #ff4d6d, #f97316)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{t.title}</div>
                <div style={{ fontSize: 9, color: th.textMuted, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>SURVEILLANCE</div>
              </div>
            )}
            <button onClick={() => setSidebarOpen(o => !o)} style={{
              marginLeft: "auto", background: "rgba(99,102,241,0.1)", border: `1px solid ${th.glassBorder}`,
              borderRadius: 6, cursor: "pointer", color: th.textMuted, fontSize: 11, flexShrink: 0,
              width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}
            >
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>

          {/* Role Selector */}
          {sidebarOpen && (
            <div style={{ padding: "12px 14px", borderBottom: `1px solid ${th.glassBorder}` }}>
              <div style={{ fontSize: 9, color: th.textMuted, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", marginBottom: 6 }}>ROLE</div>
              <select value={role} onChange={e => { setRole(e.target.value); setSection(ROLE_ACCESS[e.target.value][0]); }}
                style={{
                  width: "100%", padding: "7px 10px", borderRadius: 8, border: `1px solid ${th.glassBorder}`,
                  background: th.glass, color: th.text, backdropFilter: "blur(10px)",
                  fontFamily: "'Space Mono', monospace", fontSize: 11, cursor: "pointer", outline: "none",
                }}>
                <option value="admin">{t.admin}</option>
                <option value="healthOfficer">{t.healthOfficer}</option>
                <option value="fieldWorker">{t.fieldWorker}</option>
              </select>
            </div>
          )}

          {/* Nav */}
          <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
            {visibleNav.map(item => (
              <button key={item.id} onClick={() => setSection(item.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: sidebarOpen ? "10px 12px" : "12px 0",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2,
                  background: section === item.id
                    ? "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15))"
                    : "transparent",
                  color: section === item.id ? "#818cf8" : th.textMuted,
                  transition: "all 0.2s",
                  position: "relative",
                  boxShadow: section === item.id ? "inset 0 0 0 1px rgba(99,102,241,0.3)" : "none",
                }}
                onMouseEnter={e => { if (section !== item.id) e.currentTarget.style.background = "rgba(99,102,241,0.08)"; }}
                onMouseLeave={e => { if (section !== item.id) e.currentTarget.style.background = "transparent"; }}
              >
                {section === item.id && (
                  <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, background: "linear-gradient(#6366f1,#8b5cf6)", borderRadius: "0 3px 3px 0" }} />
                )}
                <span style={{ fontSize: 17, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{item.label}</span>}
                {item.badge && sidebarOpen && (
                  <span style={{
                    marginLeft: "auto", background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                    color: "white", borderRadius: 10, fontSize: 9, padding: "2px 7px",
                    fontFamily: "'Space Mono', monospace", fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(255,77,109,0.5)",
                  }}>{item.badge}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer Controls */}
          {sidebarOpen && (
            <div style={{ padding: 14, borderTop: `1px solid ${th.glassBorder}` }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <button onClick={() => setDark(d => !d)} style={{
                  flex: 1, padding: "7px 0", borderRadius: 8,
                  border: `1px solid ${th.glassBorder}`, background: th.glass,
                  color: th.textMuted, cursor: "pointer",
                  fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.06em",
                  backdropFilter: "blur(10px)", transition: "all 0.2s",
                }}>{dark ? "☀ LIGHT" : "🌙 DARK"}</button>
                <button onClick={() => setLang(l => l === "en" ? "hi" : "en")} style={{
                  flex: 1, padding: "7px 0", borderRadius: 8,
                  border: `1px solid ${th.glassBorder}`, background: th.glass,
                  color: th.textMuted, cursor: "pointer",
                  fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.06em",
                  backdropFilter: "blur(10px)", transition: "all 0.2s",
                }}>{lang === "en" ? "हिं" : "EN"}</button>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${th.glassBorder}`, background: th.glass, color: th.textMuted, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 9, backdropFilter: "blur(10px)" }}>📄 PDF</button>
                <button style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${th.glassBorder}`, background: th.glass, color: th.textMuted, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 9, backdropFilter: "blur(10px)" }}>📊 XLS</button>
              </div>
              <button onClick={onLogout} style={{
                width: "100%", padding: "7px 0", borderRadius: 8, border: `1px solid ${th.glassBorder}`, 
                background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(220,38,38,0.05))", 
                color: "#ef4444", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 9, 
                backdropFilter: "blur(10px)", marginTop: 8, fontWeight: 700
              }}>⏻ LOGOUT</button>
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 1 }}>
          {/* Topbar */}
          <header style={{
            background: th.sidebarBg,
            borderBottom: `1px solid ${th.glassBorder}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            padding: "16px 28px",
            display: "flex", alignItems: "center", gap: 16, flexShrink: 0,
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: th.text, letterSpacing: "-0.03em", lineHeight: 1 }}>{sectionTitle}</h1>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.textMuted, letterSpacing: "0.08em", marginTop: 3 }}>{t.subtitle}</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontFamily: "'Space Mono', monospace", color: th.text, fontWeight: 700 }}>{time.toLocaleTimeString()}</div>
                <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.textMuted, letterSpacing: "0.06em" }}>LIVE · {time.toLocaleDateString()}</div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(6,214,160,0.1)",
                border: "1px solid rgba(6,214,160,0.3)",
                borderRadius: 30, padding: "6px 14px",
                boxShadow: "0 0 20px rgba(6,214,160,0.15)",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#06d6a0", animation: "livePulse 2s infinite", display: "inline-block" }} />
                <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "#06d6a0", fontWeight: 700, letterSpacing: "0.06em" }}>SYSTEM LIVE</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px" }}>
            <div style={{ animation: "fadeInUp 0.4s ease", maxWidth: 1200 }}>
              {renderSection()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
