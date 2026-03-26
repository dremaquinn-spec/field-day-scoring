"use client";

import { useState } from "react";

/* =====================================================
   DATA (TEACHERS + EVENTS)
===================================================== */

const TEACHERS_BY_GRADE = {
  "Pre-K": ["Lopez", "Dugat", "Bradford", "Castaneda", "Hance"],
  "Kinder": ["Miranda", "Perez", "Martinez", "Allison", "Almontes", "Harris"],
  "1st": ["Pena", "Johnson", "Y. Mendez", "Cortez", "Molina"],
  "2nd": ["Ferguson", "Aguiar", "M. Mendez", "Haji", "Howard", "King"],
  "3rd": ["Ryan", "Vasquez", "Kelley", "Galvez", "Matthews", "Stereff", "Moon"],
  "4th": ["Tran", "Rios", "Garcia", "Guerra", "Verdugo", "Robinson", "Espinoza"]
};

const EVENTS_BY_GRADE = {
  "Pre-K": [
    { name: "Hurdle Relay" },
    { name: "Baton Relay" },
    { name: "Flag Relay" },
    { name: "Pancake Relay" },
    { name: "Hippity Hop Relay" },
    { name: "Hula Hoop Bean Bag" },
    { name: "Tug of War – Girls" },
    { name: "Tug of War – Boys" }
  ],
  "Kinder": [
    { name: "Hurdle Relay" },
    { name: "Baton Relay" },
    { name: "Flag Relay" },
    { name: "Pancake Relay" },
    { name: "Cone Flip Relay" },
    { name: "Hippity Hop Relay" },
    { name: "Tire Roll" },
    { name: "Dash Relay" },
    { name: "Relay #9" },
    { name: "Tug of War – Girls" },
    { name: "Tug of War – Boys" }
  ],
  "1st": [
    { name: "Hurdle Relay" },
    { name: "Baton Relay" },
    { name: "Flag Relay" },
    { name: "Pancake Relay" },
    { name: "Cone Flip Relay" },
    { name: "Hippity Hop Relay" },
    { name: "Tire Roll" },
    { name: "Dash Relay" },
    { name: "Relay #9" },
    { name: "Tug of War – Girls" },
    { name: "Tug of War – Boys" }
  ],
  "2nd": [
    { name: "Hurdle Relay" },
    { name: "Baton Relay" },
    { name: "Flag Relay" },
    { name: "Sack Relay" },
    { name: "Pancake Relay" },
    { name: "3-Legged Race" },
    { name: "Hippity Hop Relay" },
    { name: "Tire Roll" },
    { name: "Dash Race – Girls", heats: 2 },
    { name: "Dash Race – Boys", heats: 2 },
    { name: "Tug of War – Girls" },
    { name: "Tug of War – Boys" }
  ],
  "3rd": [
    { name: "Hurdle Relay" },
    { name: "Baton Relay" },
    { name: "Flag Relay" },
    { name: "Sack Relay" },
    { name: "Jump Rope Relay" },
    { name: "3-Legged Race" },
    { name: "Hippity Hop Relay" },
    { name: "Tire Roll" },
    { name: "Dash Race – Girls", heats: 2 },
    { name: "Dash Race – Boys", heats: 2 },
    { name: "Tug of War – Girls" },
    { name: "Tug of War – Boys" }
  ],
  "4th": [
    { name: "3-Legged Race" },
    { name: "Sack Relay" },
    { name: "Hippity Hop Relay" },
    { name: "Tire Roll" },
    { name: "Hurdle Race" },
    { name: "Baton Relay" },
    { name: "Pancake Relay" },
    { name: "Jump Rope Relay" },
    { name: "Flag Relay" },
    { name: "50m Dash – Girls", heats: 2 },
    { name: "50m Dash – Boys", heats: 2 },
    { name: "75m Dash – Girls", heats: 2 },
    { name: "75m Dash – Boys", heats: 2 },
    { name: "Tug of War – Girls" },
    { name: "Tug of War – Boys" }
  ]
};

const MEDALS = ["🥇", "🥈", "🥉"];
const POINTS = [3, 2, 1];

/* =====================================================
   APP
===================================================== */

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");
  const [eventIndex, setEventIndex] = useState(0);
  const [heatIndex, setHeatIndex] = useState(0);
  const [placements, setPlacements] = useState([]);
  const [students, setStudents] = useState(["", "", ""]);
  const [entries, setEntries] = useState([]);
  const [printing, setPrinting] = useState(false);

  const event = EVENTS_BY_GRADE[grade][eventIndex];
  const isHeat = Boolean(event.heats);

  const saveScore = () => {
    if (placements.length !== 3) return;
    if (isHeat && students.some(s => !s.trim())) return;

    setEntries(prev => [
      ...prev,
      ...placements.map((teacher, i) => ({
        Grade: grade,
        Event: event.name,
        Heat: isHeat ? heatIndex + 1 : "",
        Place: i + 1,
        Student: isHeat ? students[i] : "",
        Teacher: teacher,
        Points: POINTS[i]
      }))
    ]);

    setPlacements([]);
    setStudents(["", "", ""]);

    if (isHeat && heatIndex + 1 < event.heats) {
      setHeatIndex(heatIndex + 1);
    } else {
      setHeatIndex(0);
      setEventIndex(Math.min(eventIndex + 1, EVENTS_BY_GRADE[grade].length - 1));
    }
  };

  const exportExcel = async () => {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "Field_Day_Results.xlsx");
  };

  if (printing) {
    const rows = entries.filter(e => e.Grade === grade);
    const events = [...new Set(rows.map(r => r.Event))];
    return (
      <div style={{ padding: 24 }}>
        <h1>🏆 {grade} Field Day Awards</h1>
        {events.map(ev => (
          <div key={ev}>
            <h3>{ev}</h3>
            {rows.filter(r => r.Event === ev).map(r => (
              <div key={r.Place}>
                {MEDALS[r.Place - 1]} {r.Student || "—"} — {r.Teacher}
              </div>
            ))}
          </div>
        ))}
        <button onClick={() => setPrinting(false)}>⬅ Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: 16 }}>
      <h2>⚡ Field Day Scoring</h2>

      {Object.keys(TEACHERS_BY_GRADE).map(g => (
        <button
          key={g}
          onClick={() => {
            setGrade(g);
            setEventIndex(0);
            setHeatIndex(0);
            setPlacements([]);
            setStudents(["", "", ""]);
          }}
        >
          {g}
        </button>
      ))}

      <h3>{event.name}</h3>
      {isHeat && <div>Heat {heatIndex + 1}</div>}

      {isHeat && students.map((s, i) => (
        <input
          key={i}
          value={s}
          placeholder={`${MEDALS[i]} Student`}
          onChange={e => {
            const copy = [...students];
            copy[i] = e.target.value;
            setStudents(copy);
          }}
        />
      ))}

      {TEACHERS_BY_GRADE[grade].map(t => (
        <button key={t} onClick={() => setPlacements([...placements, t])}>
          {t}
        </button>
      ))}

      <div>{placements.map((t, i) => `${MEDALS[i]} ${t}`).join(" | ")}</div>

      <button onClick={saveScore}>✅ Save</button>
      <button onClick={() => setPrinting(true)}>🖨️ Print Awards</button>
      <button onClick={exportExcel}>📤 Export Excel</button>
    </div>
  );
}
