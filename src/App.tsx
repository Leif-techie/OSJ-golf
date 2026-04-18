import { useState, useEffect } from "react";
import coursesData from "./courses.json";

interface Scorecard {
  par: number[];
  hcp?: number[];
}

interface Course {
  id: number;
  name: string;
  area: string;
  open: boolean | null;
  golfamore: boolean;
  golfamoreVillkor: string | null;
  holes: string;
  distance: number;
  statusSlug: string | null;
  website: string | null;
  scorecard: Scorecard | null;
}

const COURSES: Course[] = coursesData.courses as Course[];
const SORTED = [...COURSES].sort((a, b) => a.distance - b.distance);

function statusColor(open: boolean | null) {
  if (open === true)  return "#3dba5f";
  if (open === false) return "#e05555";
  return "#8a9ab5";
}
function statusLabel(open: boolean | null) {
  if (open === true)  return "Öppen";
  if (open === false) return "Stängd";
  return "Status okänd";
}

// ─── Scorecard Modal ────────────────────────────────────────────────────────

function ScorecardModal({ course, onClose }: { course: Course; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const sc = course.scorecard;
  const frontPar = sc ? sc.par.slice(0, 9).reduce((a, b) => a + b, 0) : null;
  const backPar  = sc ? sc.par.slice(9).reduce((a, b) => a + b, 0) : null;
  const totalPar = sc ? sc.par.reduce((a, b) => a + b, 0) : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.72)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1a1f2e",
          border: "1px solid #2d3748",
          borderRadius: 12,
          padding: 24,
          maxWidth: 680,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>{course.name}</h2>
              <div
                title={statusLabel(course.open)}
                style={{ width: 11, height: 11, borderRadius: "50%", background: statusColor(course.open), flexShrink: 0 }}
              />
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              {course.area} · {course.distance} km från Strängnäs · {course.holes} hål
            </p>
            {course.golfamore && (
              <p style={{ fontSize: 12, color: "#60a5fa", marginTop: 4, fontWeight: 500 }}>
                Golfamore — {course.golfamoreVillkor}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", color: "#64748b", fontSize: 22,
              cursor: "pointer", lineHeight: 1, padding: "0 4px",
            }}
            aria-label="Stäng"
          >×</button>
        </div>

        {/* Status row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", borderRadius: 8,
          background: course.open === true ? "rgba(61,186,95,0.1)" : course.open === false ? "rgba(224,85,85,0.1)" : "rgba(138,154,181,0.1)",
          marginBottom: 20,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: statusColor(course.open) }} />
          <span style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500 }}>{statusLabel(course.open)}</span>
          {course.statusSlug && (
            <a
              href={`https://golfstatus.nu/klubb/${course.statusSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#60a5fa", marginLeft: "auto", textDecoration: "none" }}
            >
              Kontrollera aktuell status →
            </a>
          )}
        </div>

        {/* Scorecard */}
        {sc ? (
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
              Scorekort
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Hål</th>
                    {Array.from({ length: 9 }, (_, i) => (
                      <th key={i} style={thStyle}>{i + 1}</th>
                    ))}
                    <th style={{ ...thStyle, color: "#60a5fa" }}>Ut</th>
                    {Array.from({ length: 9 }, (_, i) => (
                      <th key={i + 9} style={thStyle}>{i + 10}</th>
                    ))}
                    <th style={{ ...thStyle, color: "#60a5fa" }}>In</th>
                    <th style={{ ...thStyle, color: "#f1f5f9" }}>Tot</th>
                  </tr>
                </thead>
                <tbody>
                  {sc.hcp && (
                    <tr>
                      <td style={tdLabel}>HCP</td>
                      {sc.hcp.slice(0, 9).map((h, i) => <td key={i} style={tdStyle}>{h}</td>)}
                      <td style={{ ...tdStyle, color: "#60a5fa" }}>—</td>
                      {sc.hcp.slice(9).map((h, i) => <td key={i + 9} style={tdStyle}>{h}</td>)}
                      <td style={{ ...tdStyle, color: "#60a5fa" }}>—</td>
                      <td style={{ ...tdStyle, color: "#f1f5f9" }}>—</td>
                    </tr>
                  )}
                  <tr>
                    <td style={tdLabel}>Par</td>
                    {sc.par.slice(0, 9).map((p, i) => (
                      <td key={i} style={{ ...tdStyle, color: p === 3 ? "#93c5fd" : p === 5 ? "#86efac" : "#e2e8f0" }}>{p}</td>
                    ))}
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#60a5fa" }}>{frontPar}</td>
                    {sc.par.slice(9).map((p, i) => (
                      <td key={i + 9} style={{ ...tdStyle, color: p === 3 ? "#93c5fd" : p === 5 ? "#86efac" : "#e2e8f0" }}>{p}</td>
                    ))}
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#60a5fa" }}>{backPar}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#f1f5f9", fontSize: 14 }}>{totalPar}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: "#475569", marginTop: 10 }}>
              Par 3 = blå · Par 4 = vit · Par 5 = grön
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 14 }}>
              Scorekort ej tillagt för denna bana ännu.
            </p>
            {course.website && (
              <a
                href={course.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  background: "#2d3748",
                  borderRadius: 8,
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Besök banans hemsida →
              </a>
            )}
          </div>
        )}

        {/* Footer links */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #2d3748", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {course.website && (
            <a href={course.website} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              🌐 Hemsida
            </a>
          )}
          {course.statusSlug && (
            <a
              href={`https://golfstatus.nu/klubb/${course.statusSlug}`}
              target="_blank" rel="noopener noreferrer" style={linkStyle}
            >
              ⛳ Golfstatus
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "6px 8px", textAlign: "center", color: "#64748b",
  fontWeight: 600, fontSize: 12, borderBottom: "1px solid #2d3748",
  whiteSpace: "nowrap",
};
const tdStyle: React.CSSProperties = {
  padding: "6px 8px", textAlign: "center", color: "#94a3b8",
  borderBottom: "1px solid #1e2533",
};
const tdLabel: React.CSSProperties = {
  padding: "6px 8px", textAlign: "left", color: "#64748b",
  fontWeight: 600, fontSize: 12, borderBottom: "1px solid #1e2533",
  whiteSpace: "nowrap",
};
const linkStyle: React.CSSProperties = {
  fontSize: 12, color: "#60a5fa", textDecoration: "none",
  padding: "4px 10px", background: "#0f1723", borderRadius: 6,
};

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [selected, setSelected] = useState<Course | null>(null);

  const openCount = COURSES.filter((c) => c.open === true).length;
  const gaCount   = COURSES.filter((c) => c.golfamore).length;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 16px" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>
          Golfbanor inom 8 mil från Strängnäs
        </h1>
        <p style={{ fontSize: 13, color: "#94a3b8" }}>
          Status från golfstatus.nu · uppdateras dagligen kl 07:00 · senast {coursesData.lastUpdated}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { value: COURSES.length, label: "Banor totalt",      color: "#f1f5f9" },
          { value: openCount,      label: "Öppna nu",          color: "#3dba5f" },
          { value: gaCount,        label: "Ingår i Golfamore", color: "#60a5fa" },
        ].map(({ value, label, color }) => (
          <div key={label} style={{
            background: "#1a1f2e", border: "1px solid #2d3748",
            borderRadius: 8, padding: "14px 16px",
          }}>
            <div style={{ fontSize: 26, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { color: "#3dba5f", label: "Öppen" },
          { color: "#e05555", label: "Stängd" },
          { color: "#8a9ab5", label: "Status okänd" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 13, color: "#94a3b8" }}>{label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 13, color: "#60a5fa", fontWeight: 600 }}>G</span>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>&nbsp;= Ingår i Golfamore</span>
        </div>
        <span style={{ fontSize: 13, color: "#475569" }}>Klicka på en bana för scorekort &amp; info</span>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #2d3748", borderRadius: 8, overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "36px 1fr 120px 60px",
          padding: "8px 16px", background: "#1a1f2e", borderBottom: "1px solid #2d3748",
        }}>
          {["#", "Bana", "Ort", "Hål"].map((h) => (
            <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {SORTED.map((course, idx) => (
          <div
            key={course.id}
            onClick={() => setSelected(course)}
            title="Klicka för scorekort och info"
            style={{
              display: "grid", gridTemplateColumns: "36px 1fr 120px 60px",
              alignItems: "center", padding: "10px 16px",
              borderTop: idx === 0 ? "none" : "1px solid #1e2533",
              background: idx % 2 === 0 ? "#141820" : "#111520",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1e2533")}
            onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#141820" : "#111520")}
          >
            {/* # */}
            <span style={{ fontSize: 11, color: "#475569" }}>{idx + 1}</span>

            {/* Bana */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500 }}>{course.name}</span>
                <div
                  title={statusLabel(course.open)}
                  style={{ width: 9, height: 9, borderRadius: "50%", flexShrink: 0, background: statusColor(course.open) }}
                />
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                {course.distance} km från Strängnäs
              </div>
              {course.golfamore && (
                <div style={{ fontSize: 11, color: "#60a5fa", marginTop: 1, fontWeight: 500 }}>Golfamore</div>
              )}
            </div>

            {/* Ort */}
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{course.area}</span>

            {/* Hål */}
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{course.holes}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p style={{ fontSize: 11, color: "#475569", marginTop: 16, lineHeight: 1.5 }}>
        Källa: golfstatus.nu (öppen/stängd status), golfportalen.se (Golfamore-lista).
        Kontrollera alltid aktuell information direkt hos banan.
      </p>

      {/* Modal */}
      {selected && <ScorecardModal course={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
