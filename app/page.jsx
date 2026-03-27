"use client";"use const event = events[eventIndex];
  const isLastEvent = eventIndex === events.length - 1;
  const isLocked = lockedGrades[grade];

  const selectedTeachers = Object.values(placements).flat();

  const toggleTeacher = (place, teacher) => {
    if (isLocked) return;

    setPlacements(prev => ({
      ...prev,
      [place]: prev[place].includes(teacher)
        ? prev[place].filter(t => t !== teacher)
        : [...prev[place], teacher]
    }));
  };

  const saveAndNext = () => {
    if (isLocked) return;

    setScores(prev => {
      const updated = { ...(prev[grade] || {}) };
      [1, 2, 3].forEach(place => {
        placements[place].forEach(t => {
          updated[t] = (updated[t] || 0) + POINTS[place];
        });
      });
      return { ...prev, [grade]: updated };
    });

    setPlacements({ 1: [], 2: [], 3: [] });
    if (!isLastEvent) setEventIndex(i => i + 1);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Field Day Scoring</h1>

      {/* Grade Selector */}
      {Object.keys(TEACHERS_BY_GRADE).map(g => (
        <button
          key={g}
          onClick={() => {
            setGrade(g);
            setEventIndex(0);
            setPlacements({ 1: [], 2: [], 3: [] });
          }}
        >
          {lockedGrades[g] ? `LOCKED ${g}` : g}
        </button>
      ))}

      <h2>{grade}</h2>
      <h3>Event: {event}</h3>

      {[1, 2, 3].map(place => (
        <div key={place} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
          <strong>{MEDALS[place]} Place</strong>

          {TEACHERS_BY_GRADE[grade].map(t => {
            const selectedHere = placements[place].includes(t);
            const selectedElsewhere =
              !selectedHere && selectedTeachers.includes(t);

            return (
              <button
                key={t}
                disabled={selectedElsewhere || isLocked}
                onClick={() => toggleTeacher(place, t)}
                style={{
                  margin: 4,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: selectedHere ? "2px solid #14532d" : "1px solid #ccc",
                  background: selectedHere ? "#166534" : "#f3f4f6",
                  color: selectedHere ? "#ffffff" : "#000000",
                  opacity: selectedElsewhere ? 0.4 : 1,
                  cursor: selectedElsewhere ? "not-allowed" : "pointer"
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      ))}

      {!isLocked && (
        <button onClick={saveAndNext}>
          {isLastEvent ? "Save Event" : "Save & Next Event"}
        </button>
      )}

      <hr style={{ margin: "24px 0" }} />

      <h3>Current Standings</h3>

      {Object.entries(scores[grade] || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, pts], index) => (
          <div key={name}>
            {index + 1}. {name} — {pts} pts
          </div>
        ))}
    </div>
  );
}
``
import { useEffect, useState } from "react";

/* ===================== DATA ===================== */

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
    "Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay",
    "Hippity Hop Relay","Hula Hoop Bean Bag",
    "Tug of War – Girls","Tug of War – Boys"
  ],
  "Kinder": [
    "Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay",
    "Cone Flip Relay","Hippity Hop Relay","Tire Roll",
    "Dash Relay","Relay #9",
    "Tug of War – Girls","Tug of War – Boys"
  ],
  "1st": [
    "Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay",
    "Cone Flip Relay","Hippity Hop Relay","Tire Roll",
    "Dash Relay","Relay #9",
    "Tug of War – Girls","Tug of War – Boys"
  ],
  "2nd": [
    "Hurdle Relay","Baton Relay","Flag Relay","Sack Relay",
    "Pancake Relay","3-Legged Race","Hippity Hop Relay","Tire Roll",
    "Dash Race – Girls","Dash Race – Boys",
    "Tug of War – Girls","Tug of War – Boys"
  ],
  "3rd": [
    "Hurdle Relay","Baton Relay","Flag Relay","Sack Relay",
    "Jump Rope Relay","3-Legged Race","Hippity Hop Relay","Tire Roll",
    "Dash Race – Girls","Dash Race – Boys",
    "Tug of War – Girls","Tug of War – Boys"
  ],
  "4th": [
    "3-Legged Race","Sack Relay","Hippity Hop Relay","Tire Roll",
    "Hurdle Race","Baton Relay","Pancake Relay","Jump Rope Relay",
    "Flag Relay",
    "50m Dash – Girls","50m Dash – Boys",
    "75m Dash – Girls","75m Dash – Boys",
    "Tug of War – Girls","Tug of War – Boys"
  ]
};

const MEDALS = { 1: "1st", 2: "2nd", 3: "3rd" };
const POINTS = { 1: 3, 2: 2, 3: 1 };

/* ===================== APP ===================== */

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");
  const [eventIndex, setEventIndex] = useState(0);
  const [placements, setPlacements] = useState({ 1: [], 2: [], 3: [] });
  const [scores, setScores] = useState({});
  const [lockedGrades, setLockedGrades] = useState({});

  /* ---------- LOAD / SAVE ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("field_day_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setScores(parsed.scores || {});
      setLockedGrades(parsed.lockedGrades || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "field_day_data",
      JSON.stringify({ scores, lockedGrades })
    );
  }, [scores, lockedGrades]);

  const events = EVENTS_BY_GRADE[grade];
