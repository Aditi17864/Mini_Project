import { useState, useEffect } from "react";
import "./Dashboard.css";
import IndiaMap from "./IndiaMap";

const WQI_DATA = [
  { month: "Oct", ganga: 38, yamuna: 22, cauvery: 79, brahmaputra: 61 },
  { month: "Nov", ganga: 41, yamuna: 25, cauvery: 81, brahmaputra: 63 },
  { month: "Dec", ganga: 35, yamuna: 20, cauvery: 77, brahmaputra: 58 },
  { month: "Jan", ganga: 33, yamuna: 18, cauvery: 80, brahmaputra: 60 },
  { month: "Feb", ganga: 36, yamuna: 21, cauvery: 82, brahmaputra: 64 },
  { month: "Mar", ganga: 38, yamuna: 22, cauvery: 79, brahmaputra: 61 },
];

const ALERTS = [
  { id: 1, level: "critical", river: "Yamuna — Delhi",        disease: "Cholera spike detected",        time: "2 hrs ago",  cases: 47 },
  { id: 2, level: "warning",  river: "Ganga — Varanasi",      disease: "Typhoid contamination rising",  time: "5 hrs ago",  cases: 23 },
  { id: 3, level: "warning",  river: "Hooghly — Kolkata",     disease: "E.coli above threshold",        time: "8 hrs ago",  cases: 18 },
  { id: 4, level: "info",     river: "Sabarmati — Ahmedabad", disease: "Leptospirosis — watch zone",    time: "1 day ago",  cases: 9  },
  { id: 5, level: "info",     river: "Tapti — Surat",         disease: "pH imbalance reported",         time: "2 days ago", cases: 4  },
  { id: 6, level: "safe",     river: "Cauvery — Trichy",      disease: "All parameters normal",         time: "3 days ago", cases: 0  },
];

const RIVERS = [
  { name: "Ganga",       location: "Varanasi",     wqi: 38, trend: "down",   risk: "high",   ph: 6.2, turb: "High",   temp: 28 },
  { name: "Yamuna",      location: "Delhi",         wqi: 22, trend: "down",   risk: "high",   ph: 5.8, turb: "V.High", temp: 30 },
  { name: "Brahmaputra", location: "Guwahati",      wqi: 61, trend: "up",     risk: "medium", ph: 7.1, turb: "Medium", temp: 24 },
  { name: "Cauvery",     location: "Trichy",        wqi: 79, trend: "up",     risk: "low",    ph: 7.4, turb: "Low",    temp: 26 },
  { name: "Narmada",     location: "Jabalpur",      wqi: 71, trend: "up",     risk: "low",    ph: 7.2, turb: "Low",    temp: 25 },
  { name: "Hooghly",     location: "Kolkata",       wqi: 31, trend: "down",   risk: "high",   ph: 6.0, turb: "High",   temp: 29 },
  { name: "Godavari",    location: "Rajamahendri",  wqi: 74, trend: "stable", risk: "low",    ph: 7.3, turb: "Low",    temp: 27 },
  { name: "Mahanadi",    location: "Cuttack",       wqi: 57, trend: "stable", risk: "medium", ph: 6.9, turb: "Medium", temp: 26 },
];

const ACTIVITY = [
  { id: 1, user: "Dr. Priya Sharma", role: "Health Official", action: "Filed water quality report",   location: "Varanasi",  time: "10 min ago", avatar: "PS" },
  { id: 2, user: "Rahul Verma",      role: "Researcher",      action: "Updated disease cluster data", location: "Delhi",     time: "25 min ago", avatar: "RV" },
  { id: 3, user: "Meera Iyer",       role: "Citizen",         action: "Reported contamination",       location: "Chennai",   time: "1 hr ago",   avatar: "MI" },
  { id: 4, user: "Dr. Arjun Nair",   role: "Health Official", action: "Alert issued for Hooghly",     location: "Kolkata",   time: "2 hrs ago",  avatar: "AN" },
  { id: 5, user: "Sneha Patel",      role: "Researcher",      action: "Submitted WQI batch data",     location: "Ahmedabad", time: "3 hrs ago",  avatar: "SP" },
  { id: 6, user: "Vikram Singh",     role: "Citizen",         action: "Marked water source unsafe",   location: "Lucknow",   time: "5 hrs ago",  avatar: "VS" },
];

const RISK_COLOR  = { high: "#ef4444", medium: "#f59e0b", low: "#22c55e" };
const ALERT_COLOR = { critical: "#ef4444", warning: "#f59e0b", info: "#3b82f6", safe: "#22c55e" };
const ALERT_BG    = { critical: "#fef2f2", warning: "#fffbeb", info: "#eff6ff", safe: "#f0fdf4" };
const ROLE_COLOR  = { "Health Official": "#7c3aed", "Researcher": "#2196a6", "Citizen": "#f59e0b" };

const NAV_ITEMS = [
  { key: "overview", icon: "🏠", label: "Overview"       },
  { key: "wqi",      icon: "📊", label: "WQI Charts"     },
  { key: "alerts",   icon: "🚨", label: "Alerts"         },
  { key: "maps",     icon: "🗺️", label: "Heatmap"        },
  { key: "rivers",   icon: "🌊", label: "Rivers & Lakes" },
  { key: "activity", icon: "👥", label: "Activity"       },
];

function MiniBarChart({ data, keys, colors }) {
  const max = Math.max(...data.flatMap(d => keys.map(k => d[k])));
  return (
    <div className="db-chart">
      <div className="db-chart-bars">
        {data.map((d, i) => (
          <div key={i} className="db-chart-group">
            {keys.map((k, ki) => (
              <div key={k} className="db-bar"
                style={{ height: `${(d[k] / max) * 100}%`, background: colors[ki] }}
                title={`${k}: ${d[k]}`}
              />
            ))}
            <span className="db-bar-label">{d.month}</span>
          </div>
        ))}
      </div>
      <div className="db-chart-legend">
        {keys.map((k, i) => (
          <span key={k} className="db-legend-item">
            <span className="db-legend-dot" style={{ background: colors[i] }} />
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}

function WQIGauge({ value, size = 100 }) {
  const color = value >= 70 ? "#22c55e" : value >= 45 ? "#f59e0b" : "#ef4444";
  const r     = (size - 12) / 2;
  const circ  = 2 * Math.PI * r;
  const dash  = (value / 100) * circ * 0.75;
  return (
    <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="9"
        strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} strokeDashoffset={circ * 0.125}
        strokeLinecap="round" transform={`rotate(135 ${size/2} ${size/2})`} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="9"
        strokeDasharray={`${dash} ${circ - dash + circ * 0.25}`} strokeDashoffset={circ * 0.125}
        strokeLinecap="round" transform={`rotate(135 ${size/2} ${size/2})`} />
      <text x={size/2} y={size*0.52} textAnchor="middle"
        fontSize={size * 0.21} fontWeight="800" fill={color} fontFamily="Nunito,sans-serif">{value}</text>
    </svg>
  );
}

export default function Dashboard({ isOpen, onClose, userName = "User" }) {
  const [activeNav, setActiveNav] = useState("overview");
  const [animIn,    setAnimIn]    = useState(false);

  useEffect(() => {
    if (isOpen) setTimeout(() => setAnimIn(true), 50);
    else { setAnimIn(false); setTimeout(() => setActiveNav("overview"), 300); }
  }, [isOpen]);

  if (!isOpen) return null;

  const StatCard = ({ icon, label, value, sub, color }) => (
    <div className="db-stat-card" style={{ borderTopColor: color }}>
      <div className="db-stat-icon" style={{ background: color + "18", color }}>{icon}</div>
      <div className="db-stat-info">
        <div className="db-stat-value">{value}</div>
        <div className="db-stat-label">{label}</div>
        {sub && <div className="db-stat-sub">{sub}</div>}
      </div>
    </div>
  );

  return (
    <div className={`db-overlay ${animIn ? "visible" : ""}`} onClick={onClose}>
      <div className="db-shell" onClick={e => e.stopPropagation()}>

        {/* Sidebar */}
        <aside className="db-sidebar">
          <div className="db-brand">
            <div className="db-brand-icon">💧</div>
            <div>
              <div className="db-brand-name">JalRakshak</div>
              <div className="db-brand-role">Dashboard</div>
            </div>
          </div>
          <nav className="db-nav">
            {NAV_ITEMS.map(item => (
              <button key={item.key}
                className={`db-nav-item ${activeNav === item.key ? "active" : ""}`}
                onClick={() => setActiveNav(item.key)}>
                <span className="db-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="db-user-card">
            <div className="db-user-avatar">{userName.slice(0,2).toUpperCase()}</div>
            <div className="db-user-info">
              <div className="db-user-name">{userName}</div>
              <div className="db-user-role">Health Official</div>
            </div>
            <button className="db-logout" onClick={onClose} title="Logout">⏻</button>
          </div>
        </aside>

        {/* Main */}
        <main className="db-main">
          <div className="db-topbar">
            <div>
              <h1 className="db-page-title">
                {NAV_ITEMS.find(n => n.key === activeNav)?.icon}{" "}
                {NAV_ITEMS.find(n => n.key === activeNav)?.label}
              </h1>
              <p className="db-page-sub">Last updated: {new Date().toLocaleString("en-IN")}</p>
            </div>
            <div className="db-topbar-right">
              <div className="db-notif">🔔<span className="db-notif-badge">3</span></div>
              <button className="db-close-btn" onClick={onClose}>✕</button>
            </div>
          </div>

          {/* OVERVIEW */}
          {activeNav === "overview" && (
            <div className="db-content db-overview">
              <div className="db-stat-row">
                <StatCard icon="🌊" label="Water Bodies Monitored" value="248"  sub="+12 this month"   color="#2196a6" />
                <StatCard icon="🚨" label="Active Alerts"          value="14"   sub="3 critical"       color="#ef4444" />
                <StatCard icon="🦠" label="Disease Cases Reported" value="124"  sub="Last 30 days"     color="#f59e0b" />
                <StatCard icon="✅" label="Safe Water Sources"     value="186"  sub="75% of monitored" color="#22c55e" />
              </div>
              <div className="db-overview-grid">
                <div className="db-card db-card-wide">
                  <div className="db-card-head">
                    <h3>Water Quality Trend</h3>
                    <span className="db-card-badge">Last 6 months</span>
                  </div>
                  <MiniBarChart data={WQI_DATA} keys={["ganga","yamuna","cauvery","brahmaputra"]} colors={["#3b82f6","#ef4444","#22c55e","#f59e0b"]} />
                </div>
                <div className="db-card">
                  <div className="db-card-head">
                    <h3>Recent Alerts</h3>
                    <button className="db-card-link" onClick={() => setActiveNav("alerts")}>View all →</button>
                  </div>
                  <div className="db-alert-mini-list">
                    {ALERTS.slice(0,4).map(a => (
                      <div key={a.id} className="db-alert-mini" style={{ borderLeftColor: ALERT_COLOR[a.level], background: ALERT_BG[a.level] }}>
                        <div className="db-alert-mini-dot" style={{ background: ALERT_COLOR[a.level] }} />
                        <div>
                          <div className="db-alert-mini-river">{a.river}</div>
                          <div className="db-alert-mini-disease">{a.disease}</div>
                        </div>
                        <span className="db-alert-mini-time">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="db-card">
                  <div className="db-card-head">
                    <h3>River Health Snapshot</h3>
                    <button className="db-card-link" onClick={() => setActiveNav("rivers")}>View all →</button>
                  </div>
                  <div className="db-river-mini-list">
                    {RIVERS.slice(0,5).map(r => (
                      <div key={r.name} className="db-river-mini">
                        <span className="db-river-mini-name">{r.name}</span>
                        <div className="db-wqi-track">
                          <div className="db-wqi-fill" style={{ width: r.wqi + "%", background: RISK_COLOR[r.risk] }} />
                        </div>
                        <span className="db-river-mini-wqi" style={{ color: RISK_COLOR[r.risk] }}>{r.wqi}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="db-card">
                  <div className="db-card-head">
                    <h3>Recent Activity</h3>
                    <button className="db-card-link" onClick={() => setActiveNav("activity")}>View all →</button>
                  </div>
                  <div className="db-act-mini-list">
                    {ACTIVITY.slice(0,4).map(a => (
                      <div key={a.id} className="db-act-mini">
                        <div className="db-act-avatar" style={{ background: ROLE_COLOR[a.role] + "22", color: ROLE_COLOR[a.role] }}>{a.avatar}</div>
                        <div>
                          <div className="db-act-name">{a.user}</div>
                          <div className="db-act-action">{a.action}</div>
                        </div>
                        <span className="db-act-time">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WQI */}
          {activeNav === "wqi" && (
            <div className="db-content">
              <div className="db-wqi-gauges">
                {RIVERS.map(r => (
                  <div key={r.name} className="db-gauge-card">
                    <WQIGauge value={r.wqi} size={100} />
                    <div className="db-gauge-name">{r.name}</div>
                    <div className="db-gauge-loc">{r.location}</div>
                    <span className="db-gauge-badge" style={{ background: RISK_COLOR[r.risk] + "18", color: RISK_COLOR[r.risk] }}>
                      {r.risk === "high" ? "High Risk" : r.risk === "medium" ? "Moderate" : "Safe"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="db-card db-card-full">
                <div className="db-card-head">
                  <h3>Monthly WQI Comparison</h3>
                  <span className="db-card-badge">Oct 2024 – Mar 2025</span>
                </div>
                <MiniBarChart data={WQI_DATA} keys={["ganga","yamuna","cauvery","brahmaputra"]} colors={["#3b82f6","#ef4444","#22c55e","#f59e0b"]} />
                <div className="db-wqi-scale">
                  <span style={{color:"#ef4444"}}>● 0–40 Critical</span>
                  <span style={{color:"#f59e0b"}}>● 41–60 Moderate</span>
                  <span style={{color:"#22c55e"}}>● 61–100 Good</span>
                </div>
              </div>
            </div>
          )}

          {/* ALERTS */}
          {activeNav === "alerts" && (
            <div className="db-content">
              <div className="db-alert-summary">
                {["critical","warning","info","safe"].map(level => (
                  <div key={level} className="db-alert-sum-card" style={{ borderColor: ALERT_COLOR[level], background: ALERT_BG[level] }}>
                    <span className="db-alert-sum-count" style={{ color: ALERT_COLOR[level] }}>
                      {ALERTS.filter(a => a.level === level).length}
                    </span>
                    <span className="db-alert-sum-label" style={{ color: ALERT_COLOR[level] }}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="db-alerts-list">
                {ALERTS.map(a => (
                  <div key={a.id} className="db-alert-row" style={{ borderLeftColor: ALERT_COLOR[a.level], background: ALERT_BG[a.level] }}>
                    <div className="db-alert-level-badge" style={{ background: ALERT_COLOR[a.level] }}>{a.level.toUpperCase()}</div>
                    <div className="db-alert-info">
                      <div className="db-alert-river">{a.river}</div>
                      <div className="db-alert-disease">{a.disease}</div>
                    </div>
                    <div className="db-alert-cases">
                      <div className="db-alert-cases-num" style={{ color: ALERT_COLOR[a.level] }}>{a.cases}</div>
                      <div className="db-alert-cases-label">cases</div>
                    </div>
                    <div className="db-alert-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HEATMAP */}
          {activeNav === "maps" && (
            <div className="db-content db-maps-content">
              <div className="db-map-container">
                <IndiaMap showLegend={true} />
              </div>
            </div>
          )}

          {/* RIVERS */}
          {activeNav === "rivers" && (
            <div className="db-content">
              <div className="db-rivers-grid">
                {RIVERS.map(r => (
                  <div key={r.name} className="db-river-card" style={{ borderTopColor: RISK_COLOR[r.risk] }}>
                    <div className="db-river-card-head">
                      <div>
                        <div className="db-river-card-name">🌊 {r.name}</div>
                        <div className="db-river-card-loc">📍 {r.location}</div>
                      </div>
                      <span className="db-river-risk-badge" style={{ background: RISK_COLOR[r.risk] + "18", color: RISK_COLOR[r.risk] }}>
                        {r.risk === "high" ? "⚠ High Risk" : r.risk === "medium" ? "⚡ Moderate" : "✅ Safe"}
                      </span>
                    </div>
                    <div className="db-river-wqi-row">
                      <span className="db-river-wqi-label">WQI</span>
                      <div className="db-wqi-track db-wqi-track-lg">
                        <div className="db-wqi-fill" style={{ width: r.wqi + "%", background: RISK_COLOR[r.risk] }} />
                      </div>
                      <span className="db-river-wqi-val" style={{ color: RISK_COLOR[r.risk] }}>{r.wqi}/100</span>
                    </div>
                    <div className="db-river-params">
                      <div className="db-param"><span>pH</span><strong>{r.ph}</strong></div>
                      <div className="db-param"><span>Turbidity</span><strong>{r.turb}</strong></div>
                      <div className="db-param"><span>Temp</span><strong>{r.temp}°C</strong></div>
                      <div className="db-param"><span>Trend</span>
                        <strong style={{ color: r.trend==="up" ? "#22c55e" : r.trend==="down" ? "#ef4444" : "#f59e0b" }}>
                          {r.trend==="up" ? "↑ Improving" : r.trend==="down" ? "↓ Worsening" : "→ Stable"}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITY */}
          {activeNav === "activity" && (
            <div className="db-content">
              <div className="db-activity-list">
                {ACTIVITY.map(a => (
                  <div key={a.id} className="db-activity-row">
                    <div className="db-act-avatar-lg" style={{ background: ROLE_COLOR[a.role] + "18", color: ROLE_COLOR[a.role] }}>{a.avatar}</div>
                    <div className="db-activity-info">
                      <div className="db-activity-name">{a.user}</div>
                      <div className="db-activity-action">{a.action}</div>
                      <div className="db-activity-meta">
                        <span className="db-activity-role" style={{ background: ROLE_COLOR[a.role] + "18", color: ROLE_COLOR[a.role] }}>{a.role}</span>
                        <span className="db-activity-loc">📍 {a.location}</span>
                      </div>
                    </div>
                    <div className="db-activity-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}