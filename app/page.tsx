"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

/* =====================================================
   TEACHERS BY GRADE
===================================================== */

const TEACHERS_BY_GRADE = {
  "Pre-K": ["Lopez", "Dugat", "Bradford", "Castaneda", "Hance"],
  "Kinder": ["Miranda", "Perez", "Martinez", "Allison", "Almontes", "Harris"],
  "1st": ["Pena", "Johnson", "Y. Mendez", "Cortez", "Molina"],
  "2nd": ["Ferguson", "Aguiar", "M. Mendez", "Haji", "Howard", "King"],
  "3rd": ["Ryan", "Vasquez", "Kelley", "Galvez", "Matthews", "Stereff", "Moon"],
  "4th": ["Tran", "Rios", "Garcia", "Guerra", "Verdugo", "Robinson", "Espinoza"]
};

/* =====================================================
   EVENTS BY GRADE
===================================================== */

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

const POINTS = [3, 2, 1];
const MEDALS = ["🥇", "🥈", "🥉"];

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
  const [showPrint, setShowPrint] = useState(false);

  const currentEvent = EVENTS_BY_GRADE[grade][eventIndex];
  const isHeatEvent = Boolean(currentEvent.heats);

  /* ---------- SCORING ---------- */

  const selectTeacher = (teacher) => {
    if (placements.length >= 3) return;
    setPlacements([...placements, teacher]);
  };

  const updateStudent = (index, value) => {
    const copy = [...students];
    copy[index] = value;
    setStudents(copy);
  };

  const saveScore = () => {
    if (placements.length !== 3) return;
    if (isHeatEvent && students.some(s => !s.trim())) return;

    const results = placements.map((teacher, i) => ({
      Grade: grade,
      Event: currentEvent.name,
      Heat: isHeatEvent ? heatIndex + 1 : "",
      Place: i + 1,
      Student: isHeatEvent ? students[i] : "",
      Teacher: teacher,
      Points: POINTS[i]
    }));

    setEntries([...entries, ...results]);
    setPlacements([]);
    setStudents(["", "", ""]);

    if (isHeatEvent && heatIndex + 1 < currentEvent.heats) {
      setHeatIndex(heatIndex + 1);
    } else {
      setHeatIndex(0);
      setEventIndex(Math.min(eventIndex + 1, EVENTS_BY_GRADE[grade].length - 1));
    }
  };

  /* ---------- EXCEL EXPORT ---------- */

  const exportToExcel = () => {
    if (!entries.length) return;
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "Field_Day_Results.xlsx");
  };

  /* ---------- PRINTABLE AWARDS ---------- */

  const gradeEntries = entries.filter(e => e.Grade === grade);
  const eventList = [...new Set(gradeEntries.map(e => e.Event))];

  if (showPrint) {
    return (
      <div className="p-8 bg-white text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🏆 {grade} Field Day Awards
        </h1>

        {eventList.map((ev) => (
          <div key={ev} className="mb-6 break-inside-avoid">
            <h2 className="text-xl font-semibold mb-2">{ev}</h2>
            <table className="w-full border border-collapse">
              <tbody>
                {gradeEntries
                  .filter(r => r.Event === ev)
                  .sort((a, b) => a.Place - b.Place)
                  .map((r, idx) => (
                    <tr key={idx}>
                      <td>{MEDALS[r.Place - 1]}</td>
                      <td>{r.Student || "—"}</td>
                      <td>{r.Teacher}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}

        <Button onClick={() => setShowPrint(false)}>⬅ Back</Button>
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */

  return (
    <div className="p-4 max-w-4xl mx-auto grid gap-4">
      <h1 className="text-xl font-bold">⚡ Field Day Scoring</h1>

      <div className="flex gap-2 flex-wrap">
        {Object.keys(TEACHERS_BY_GRADE).map(g => (
          <Button
            key={g}
            variant={grade === g ? "default" : "outline"}
            onClick={() => {
              setGrade(g);
              setEventIndex(0);
              setHeatIndex(0);
              setPlacements([]);
              setStudents(["", "", ""]);
            }}
          >
            {g}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="grid gap-3 p-4">
          <div className="font-semibold">Event: {currentEvent.name}</div>
          {isHeatEvent && (
            <div>Heat {heatIndex + 1} of {currentEvent.heats}</div>
          )}

          {isHeatEvent && students.map((s, i) => (
            <input
              key={i}
              className="border px-2 py-1 rounded"
              placeholder={`${MEDALS[i]} Student Name`}
              value={s}
              onChange={e => updateStudent(i, e.target.value)}
            />
          ))}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TEACHERS_BY_GRADE[grade].map(t => (
              <Button
                key={t}
                variant="outline"
                onClick={() => selectTeacher(t)}
              >
                {t}
              </Button>
            ))}
          </div>

          <div className="text-sm">
            {placements.map((t, i) => `${MEDALS[i]} ${t}`).join(" | ")}
          </div>

          <Button onClick={saveScore}>✅ Save</Button>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={() => setShowPrint(true)}>🖨️ Print Awards</Button>
        <Button variant="secondary" onClick={exportToExcel}>
          📤 Export Excel
        </Button>
      </div>
    </div>
  );
}
``
