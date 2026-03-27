"use client";

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
  "Pre-K": ["Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay","Hippity Hop Relay","Hula Hoop Bean Bag","Tug of War – Girls","Tug of War – Boys"],
  "Kinder": ["Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay","Cone Flip Relay","Hippity Hop Relay","Tire Roll","Dash Relay","Relay #9","Tug of War – Girls","Tug of War – Boys"],
  "1st": ["Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay","Cone Flip Relay","Hippity Hop Relay","Tire Roll","Dash Relay","Relay #9","Tug of War – Girls","Tug of War – Boys"],
  "2nd": ["Hurdle Relay","Baton Relay","Flag Relay","Sack Relay","Pancake Relay","3-Legged Race","Hippity Hop Relay","Tire Roll","Dash Race – Girls","Dash Race – Boys","Tug of War – Girls","Tug of War – Boys"],
  "3rd": ["Hurdle Relay","Baton Relay","Flag Relay","Sack Relay","Jump Rope Relay","3-Legged Race","Hippity Hop Relay","Tire Roll","Dash Race – Girls","Dash Race – Boys","Tug of War – Girls","Tug of War – Boys"],
  "4th": ["3-Legged Race","Sack Relay","Hippity Hop Relay","Tire Roll","Hurdle Race","Baton Relay","Pancake Relay","Jump Rope Relay","Flag Relay","50m Dash – Girls","50m Dash – Boys","75m Dash – Girls","75m Dash – Boys","Tug of War – Girls","Tug of War – Boys"]
};

const POINTS = { 1: 3, 2: 2, 3: 1 };

/* ===================== APP ===================== */

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");

  const [scores, setScores] = useState({});
  const [lockedGrades, setLockedGrades] = useState({});

  // ✅ NEW: per-grade progress
  const [progress, setProgress] = useState({});

  /* ---------- LOAD / SAVE ---------- */

  useEffect(() => {
    const saved = localStorage.getItem("field_day_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setScores(parsed.scores || {});
      setLockedGrades(parsed.lockedGrades || {});
      setProgress(parsed.progress || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "field_day_data",
      JSON.stringify({ scores, lockedGrades, progress })
    );
  }, [scores, lockedGrades, progress]);

  // ✅ pull current grade state
  const gradeProgress = progress[grade] || {
    eventIndex: 0,
    placements: { 1: [], 2: [], 3: [] }
  };

  const { eventIndex, placements } = gradeProgress;

  const events = EVENTS_BY_GRADE[grade];
  const event = events[eventIndex];
  const isLastEvent = eventIndex === events.length - 1;
  const isLocked = lockedGrades[grade];

  const selectedTeachers = Object.values(placements).flat();

  /* ---------- HELPERS ---------- */

  const updateProgress = (updates) => {
    setProgress(prev => ({
      ...prev,
      [grade]: { ...gradeProgress, ...updates }
    }));
  };

  /* ---------- SCORING ---------- */

  const toggleTeacher = (place, teacher) => {
    if (isLocked) return;

    updateProgress({
      placements: {
        ...placements,
        [place]: placements[place].includes(teacher)
          ? placements[place].filter(t => t !== teacher)
          : [...placements[place], teacher]
      }
    });
  };

  const saveEvent = () => {
    if (isLocked) return;

    setScores(prev => {
      const updated = { ...(prev[grade] || {}) };
      [1,2,3].forEach(place => {
        placements[place].forEach(t => {
          updated[t] = (updated[t] || 0) + POINTS[place];
        });
      });
      return { ...prev, [grade]: updated };
    });

    if (isLastEvent) {
      setLockedGrades(prev => ({ ...prev, [grade]: true }));
    }

    updateProgress({
      eventIndex: isLastEvent ? eventIndex : eventIndex + 1,
      placements: { 1: [], 2: [], 3: [] }
    });
  };

  /* ---------- LEADERBOARD ---------- */

  const leaderboard = Object.entries(scores[grade] || {})
    .sort((a,b) => b[1] - a[1])
    .slice(0,3);

  /* ---------- UI ---------- */

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Field Day Scoring</h1>

      {/* Grade Selector */}
      {Object.keys(TEACHERS_BY_GRADE).map(g => (
        <button
          key={g}
          onClick={() => setGrade(g)}
        >
          {lockedGrades[g] ? "LOCKED " + g : g}
        </button>
      ))}

      <h2>{grade}</h2>
      <h3>Event: {event}</h3>

      {[1,2,3].map(place => (
        <div key={place} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
          <strong>{place === 1 ? "1st" : place === 2 ? "2nd" : "3rd"} Place</strong>

          {TEACHERS_BY_GRADE[grade].map(t => {
            const selectedHere = placements[place].includes(t);
            const selectedElsewhere =
              !selectedHere && selectedTeachers.includes(t);

            return (
              <button
                key={t}
                disabled={isLocked || selectedElsewhere}
                onClick={() => toggleTeacher(place, t)}
                style={{
                  margin: 4,
                  padding: "6px 10px",
                  background: selectedHere ? "#166534" : "#f3f4f6",
                  color: selectedHere ? "white" : "black",
                  opacity: selectedElsewhere ? 0.4 : 1
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      ))}

      {!isLocked && (
        <button onClick={saveEvent}>
          {isLastEvent ? "Finalize Event and Lock Grade" : "Save & Next Event"}
        </button>
      )}

      <hr style={{ margin: "24px 0" }} />
      <h3>Current Standings</h3>

      {leaderboard.map(([name, pts], index) => (
        <div key={name}>
          {index + 1}. {name} — {pts} pts
        </div>
      ))}
    </div>
  );
}
``
