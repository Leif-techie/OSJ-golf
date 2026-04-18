interface Course {
  id: number;
  name: string;
  area: string;
  open: boolean | null;
  golfamore: boolean;
  golfamoreVillkor?: string;
  holes: string;
  distance: number;
}

const COURSES: Course[] = [
  { id: 1,  name: "Strängnäs GK",    area: "Strängnäs",            open: false, golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "9+18", distance: 3  },
  { id: 2,  name: "Fogdö GK",        area: "Strängnäs",            open: true,  golfamore: false,                                                              holes: "18",   distance: 9  },
  { id: 3,  name: "Gripsholms GK",   area: "Mariefred",            open: false, golfamore: false,                                                              holes: "18",   distance: 13 },
  { id: 4,  name: "Strand Golf",     area: "Strängnäs",            open: true,  golfamore: false,                                                              holes: "18",   distance: 16 },
  { id: 5,  name: "Mälarbadens GK",  area: "Strängnäs/Södertälje", open: false, golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 17 },
  { id: 6,  name: "Solbacka GK",     area: "Stjärnhov",            open: true,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 23 },
  { id: 7,  name: "Åda Golf & CC",   area: "Nyköping",             open: true,  golfamore: false,                                                              holes: "18",   distance: 23 },
  { id: 8,  name: "Jönåkers GK",     area: "Gnesta",               open: true,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 27 },
  { id: 9,  name: "Norrby Golf",     area: "Nyköping",             open: true,  golfamore: false,                                                              holes: "18",   distance: 30 },
  { id: 10, name: "Kiladalens GK",   area: "Södertälje",           open: true,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 30 },
  { id: 11, name: "Eskilstuna GK",   area: "Eskilstuna",           open: false, golfamore: true,  golfamoreVillkor: "Alla dagar (ej v. 28)",                  holes: "18",   distance: 31 },
  { id: 12, name: "Torshälla GK",    area: "Eskilstuna",           open: false, golfamore: false,                                                              holes: "18",   distance: 35 },
  { id: 13, name: "Kvicksund GK",    area: "Eskilstuna",           open: false, golfamore: false,                                                              holes: "9",    distance: 39 },
  { id: 14, name: "Mälarö GK",       area: "Ekerö",                open: null,  golfamore: false,                                                              holes: "9+18", distance: 40 },
  { id: 15, name: "Ängsö GK",        area: "Västerås",             open: null,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 45 },
  { id: 16, name: "Flens GK",        area: "Flen",                 open: true,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 50 },
  { id: 17, name: "Trosa GK",        area: "Trosa",                open: false, golfamore: true,  golfamoreVillkor: "Helgfria vardagar (ej v. 28)",           holes: "18",   distance: 50 },
  { id: 18, name: "Orresta GK",      area: "Västerås",             open: true,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 50 },
  { id: 19, name: "Sundbyvik GK",    area: "Nyköping",             open: null,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 62 },
  { id: 20, name: "Enköpings GK",    area: "Enköping",             open: false, golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 63 },
  { id: 21, name: "Tortuna GK",      area: "Västerås",             open: false, golfamore: true,  golfamoreVillkor: "Alla dagar (ej v. 29)",                  holes: "18",   distance: 65 },
  { id: 22, name: "Hälla GK",        area: "Västerås",             open: null,  golfamore: false,                                                              holes: "18",   distance: 68 },
  { id: 23, name: "Skerike GK",      area: "Västerås",             open: true,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "9+18", distance: 68 },
  { id: 24, name: "Friiberghs GK",   area: "Uppsala",              open: true,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 70 },
  { id: 25, name: "Västerås GK",     area: "Västerås",             open: false, golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 70 },
  { id: 26, name: "Nyköpings GK",    area: "Nyköping",             open: false, golfamore: true,  golfamoreVillkor: "Helgfria vardagar (ej v. 27–35 ömsom)", holes: "18",   distance: 72 },
  { id: 27, name: "Johannesberg GK", area: "Uppsala",              open: null,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "9+18", distance: 72 },
  { id: 28, name: "Bro-Bålsta GK",   area: "Bålsta",               open: null,  golfamore: false,                                                              holes: "9+18", distance: 72 },
  { id: 29, name: "Fors Golf",       area: "Södertälje",           open: null,  golfamore: false,                                                              holes: "18",   distance: 73 },
  { id: 30, name: "Strömsholms GK",  area: "Kolbäck",              open: null,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 74 },
  { id: 31, name: "Sigtuna GK",      area: "Sigtuna",              open: null,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 75 },
  { id: 32, name: "Katrineholms GK", area: "Katrineholm",          open: true,  golfamore: false,                                                              holes: "9+18", distance: 75 },
  { id: 33, name: "Vingåkers GK",    area: "Vingåker",             open: true,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 77 },
  { id: 34, name: "Grönlund GK",     area: "Uppsala",              open: null,  golfamore: true,  golfamoreVillkor: "Helgfria vardagar",                      holes: "18",   distance: 79 },
  { id: 35, name: "Vassunda GK",     area: "Uppsala",              open: null,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 80 },
  { id: 36, name: "Wattholma GK",    area: "Uppsala",              open: null,  golfamore: true,  golfamoreVillkor: "Alla dagar",                             holes: "18",   distance: 80 },
  { id: 37, name: "Arboga GK",       area: "Arboga",               open: true,  golfamore: false,                                                              holes: "18",   distance: 80 },
];

const SORTED = [...COURSES].sort((a, b) => a.distance - b.distance);

function statusColor(open: boolean | null) {
  if (open === true)  return "#3dba5f";
  if (open === false) return "#e05555";
  return "#8a9ab5";
}

function statusLabel(open: boolean | null) {
  if (open === true)  return "Öppen";
  if (open === false) return "Stängd";
  return "Okänd";
}

export default function App() {
  const openCount   = COURSES.filter(c => c.open === true).length;
  const closedCount = COURSES.filter(c => c.open === false).length;
  const gaCount     = COURSES.filter(c => c.golfamore).length;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 16px" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>
          Golfbanor inom 8 mil från Strängnäs
        </h1>
        <p style={{ fontSize: 13, color: "#94a3b8" }}>
          Status från golfstatus.nu · 18 april 2026
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { value: COURSES.length, label: "Banor totalt",       color: "#f1f5f9" },
          { value: openCount,      label: "Öppna nu",           color: "#3dba5f" },
          { value: gaCount,        label: "Ingår i Golfamore",  color: "#60a5fa" },
        ].map(({ value, label, color }) => (
          <div key={label} style={{
            background: "#1a1f2e",
            border: "1px solid #2d3748",
            borderRadius: 8,
            padding: "14px 16px",
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
          <span style={{ fontSize: 13, color: "#94a3b8" }}>= Ingår i Golfamore</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #2d3748", borderRadius: 8, overflow: "hidden" }}>

        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "36px 1fr 120px 60px",
          padding: "8px 16px",
          background: "#1a1f2e",
          borderBottom: "1px solid #2d3748",
        }}>
          {["#", "Bana", "Ort", "Hål"].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {SORTED.map((course, idx) => (
          <div
            key={course.id}
            style={{
              display: "grid",
              gridTemplateColumns: "36px 1fr 120px 60px",
              alignItems: "center",
              padding: "10px 16px",
              borderTop: idx === 0 ? "none" : "1px solid #1e2533",
              background: idx % 2 === 0 ? "#141820" : "#111520",
            }}
          >
            {/* # */}
            <span style={{ fontSize: 11, color: "#475569" }}>{idx + 1}</span>

            {/* Bana */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500 }}>
                  {course.name}
                </span>
                <div
                  title={statusLabel(course.open)}
                  style={{
                    width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
                    background: statusColor(course.open),
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                {course.distance} km från Strängnäs
              </div>
              {course.golfamore && (
                <div style={{ fontSize: 11, color: "#60a5fa", marginTop: 1, fontWeight: 500 }}>
                  Golfamore
                </div>
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
    </div>
  );
}
