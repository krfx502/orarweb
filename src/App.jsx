
import { useState, useEffect } from "react";

const trains = [
  { id: "IR 1581", from: "Timișoara Nord", to: "București Nord", departure: "05:45", arrival: "12:30", platform: "3", type: "InterRegio", duration: "6h 45m", stops: 8, status: "la timp" },
  { id: "R 4012", from: "Timișoara Nord", to: "Lugoj", departure: "06:20", arrival: "07:15", platform: "1", type: "Regio", duration: "55m", stops: 3, status: "la timp" },
  { id: "EC 72", from: "Timișoara Nord", to: "Viena HBf", departure: "07:00", arrival: "15:40", platform: "5", type: "EuroCity", duration: "8h 40m", stops: 5, status: "la timp" },
  { id: "IR 1583", from: "Timișoara Nord", to: "Cluj-Napoca", departure: "08:15", arrival: "13:50", platform: "2", type: "InterRegio", duration: "5h 35m", stops: 6, status: "întârziat 12min" },
  { id: "R 4018", from: "Timișoara Nord", to: "Arad", departure: "09:30", arrival: "10:45", platform: "4", type: "Regio", duration: "1h 15m", stops: 4, status: "la timp" },
  { id: "IC 512", from: "Timișoara Nord", to: "București Nord", departure: "10:00", arrival: "15:30", platform: "3", type: "InterCity", duration: "5h 30m", stops: 4, status: "la timp" },
  { id: "IR 1647", from: "Timișoara Nord", to: "Brașov", departure: "11:20", arrival: "18:05", platform: "1", type: "InterRegio", duration: "6h 45m", stops: 9, status: "la timp" },
  { id: "R 4020", from: "Timișoara Nord", to: "Deva", departure: "12:45", arrival: "15:10", platform: "2", type: "Regio", duration: "2h 25m", stops: 7, status: "anulat" },
  { id: "IR 1549", from: "Timișoara Nord", to: "Iași", departure: "14:00", arrival: "23:55", platform: "6", type: "InterRegio", duration: "9h 55m", stops: 12, status: "la timp" },
  { id: "EC 74", from: "Timișoara Nord", to: "Budapesta Keleti", departure: "15:30", arrival: "19:15", platform: "5", type: "EuroCity", duration: "3h 45m", stops: 3, status: "la timp" },
  { id: "R 4025", from: "Timișoara Nord", to: "Reșița Nord", departure: "16:50", arrival: "19:20", platform: "1", type: "Regio", duration: "2h 30m", stops: 8, status: "întârziat 5min" },
  { id: "IR 1591", from: "Timișoara Nord", to: "București Nord", departure: "18:00", arrival: "00:45", platform: "3", type: "InterRegio", duration: "6h 45m", stops: 8, status: "la timp" },
];

const typeColors = {
  "EuroCity": "#c8a96e",
  "InterCity": "#7eb8d4",
  "InterRegio": "#8fb87e",
  "Regio": "#a89dbf",
};

const now = new Date();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

function getMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function StatusBadge({ status }) {
  const color =
    status === "la timp" ? "#4caf7d" :
    status === "anulat" ? "#e05c5c" :
    "#e0a84b";

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
      color, border: `1px solid ${color}22`, background: `${color}11`,
      textTransform: "uppercase",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
      {status}
    </span>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const filteredTrains = trains.filter(t => {
    const matchType = filter === "all" || t.type === filter;
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const nowMins = time.getHours() * 60 + time.getMinutes();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0e0f14",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      color: "#d4cfc8",
      padding: "0 0 60px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0e0f14; }
        ::-webkit-scrollbar-thumb { background: #2a2b35; border-radius: 3px; }
        .train-row {
          display: grid;
          grid-template-columns: 100px 1fr 120px 90px 90px 60px;
          gap: 0;
          border-bottom: 1px solid #1a1b24;
          padding: 18px 32px;
          transition: background 0.15s;
          cursor: default;
          align-items: center;
        }
        .train-row:hover { background: #14151e; }
        .train-row.past { opacity: 0.4; }
        .train-row.next { background: #16181f; border-left: 2px solid #c8a96e; }
        .filter-btn {
          background: transparent;
          border: 1px solid #2a2b35;
          color: #888;
          padding: 6px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.15s;
        }
        .filter-btn:hover { border-color: #555; color: #bbb; }
        .filter-btn.active { border-color: #c8a96e; color: #c8a96e; background: #c8a96e11; }
        input[type=text] {
          background: #14151e;
          border: 1px solid #2a2b35;
          color: #d4cfc8;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: inherit;
          font-size: 13px;
          outline: none;
          width: 220px;
          transition: border-color 0.15s;
        }
        input[type=text]:focus { border-color: #c8a96e55; }
        input[type=text]::placeholder { color: #444; }
        .dot-separator { display: inline-block; margin: 0 8px; color: #333; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "#0b0c10",
        borderBottom: "1px solid #1a1b24",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 22, fontWeight: 900, color: "#c8a96e", letterSpacing: "0.02em",
          }}>CFR</span>
          <span style={{ fontSize: 12, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Timișoara Nord · Plecări
          </span>
        </div>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 26, fontWeight: 500,
          color: "#d4cfc8", letterSpacing: "0.05em",
          fontVariantNumeric: "tabular-nums",
        }}>
          {time.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
      </div>

      {/* Board title area */}
      <div style={{
        padding: "32px 32px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36, fontWeight: 900, color: "#e8e2d8",
            lineHeight: 1,
          }}>Tabloul Plecărilor</h1>
          <p style={{ color: "#555", fontSize: 12, marginTop: 6, letterSpacing: "0.08em" }}>
            {filteredTrains.length} trenuri · {new Date().toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" placeholder="caută tren sau destinație..." value={search} onChange={e => setSearch(e.target.value)} />
          {["all", "EuroCity", "InterCity", "InterRegio", "Regio"].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "Toate" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr 120px 90px 90px 60px",
        gap: 0,
        padding: "10px 32px",
        borderTop: "1px solid #1a1b24",
        borderBottom: "1px solid #1a1b24",
        background: "#0b0c10",
      }}>
        {["PLECARE", "DESTINAȚIE", "TIP", "PERÓN", "DURATĂ", "STATUS"].map(h => (
          <span key={h} style={{ fontSize: 10, letterSpacing: "0.12em", color: "#444", textTransform: "uppercase", fontWeight: 500 }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div>
        {filteredTrains.map((train, i) => {
          const trainMins = getMinutes(train.departure);
          const isPast = trainMins < nowMins - 2;
          const isNext = !isPast && trainMins >= nowMins && trainMins <= nowMins + 30;
          return (
            <div
              key={train.id}
              className={`train-row${isPast ? " past" : ""}${isNext ? " next" : ""}`}
            >
              {/* Departure */}
              <div>
                <div style={{
                  fontSize: 28, fontWeight: 500, color: isPast ? "#666" : isNext ? "#c8a96e" : "#e8e2d8",
                  letterSpacing: "0.02em", lineHeight: 1, fontVariantNumeric: "tabular-nums",
                }}>
                  {train.departure}
                </div>
                <div style={{ fontSize: 11, color: "#445", marginTop: 3 }}>{train.id}</div>
              </div>

              {/* Destination */}
              <div>
                <div style={{ fontSize: 16, color: "#d4cfc8", fontWeight: 500 }}>
                  {train.to}
                </div>
                <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>
                  arr. {train.arrival} · {train.stops} opriri
                </div>
              </div>

              {/* Type */}
              <div>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
                  color: typeColors[train.type] || "#888",
                  textTransform: "uppercase",
                  borderBottom: `1px solid ${typeColors[train.type] || "#888"}55`,
                  paddingBottom: 1,
                }}>
                  {train.type}
                </span>
              </div>

              {/* Platform */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 32, height: 32,
                  border: "1px solid #2a2b35", borderRadius: 4,
                  fontSize: 16, fontWeight: 500, color: "#bbb",
                }}>
                  {train.platform}
                </span>
              </div>

              {/* Duration */}
              <div style={{ fontSize: 13, color: "#666" }}>
                {train.duration}
              </div>

              {/* Status */}
              <div>
                <StatusBadge status={train.status} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Next train callout */}
      {(() => {
        const next = trains.find(t => getMinutes(t.departure) >= nowMins && t.status !== "anulat");
        if (!next) return null;
        const mins = getMinutes(next.departure) - nowMins;
        return (
          <div style={{
            margin: "32px 32px 0",
            background: "#14151e",
            border: "1px solid #c8a96e33",
            borderRadius: 8,
            padding: "20px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 20,
                background: "#c8a96e22", border: "1px solid #c8a96e55",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>🚆</div>
              <div>
                <div style={{ fontSize: 12, color: "#c8a96e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                  Următorul tren
                </div>
                <div style={{ fontSize: 16, color: "#e8e2d8" }}>
                  {next.id} → {next.to}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 28, fontWeight: 500, color: "#c8a96e", fontVariantNumeric: "tabular-nums" }}>
                {next.departure}
              </div>
              <div style={{ fontSize: 12, color: "#555" }}>
                pleacă în {mins} min · peron {next.platform}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Legend */}
      <div style={{ padding: "24px 32px 0", display: "flex", gap: 24, flexWrap: "wrap" }}>
        {Object.entries(typeColors).map(([type, color]) => (
          <span key={type} style={{ fontSize: 11, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: color, display: "inline-block" }} />
            {type}
          </span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#333" }}>
          ◀ rândul auriu = plecare în &lt;30min
        </span>
      </div>
    </div>
  );
}