"use client";
import { useState } from "react";

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
  "Kinder": ["Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay","Cone Flip Relay","Hippity Hop Relay","Tire Roll","Dash Relay","Relay #9","Tug of War – Girls","Tug of War – Boys"]
};

const MEDALS = {
  1: "🥇",
  2: "🥈",
  3: "🥉"
};

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");
  const [eventIndex, setEventIndex] = useState(0);

  const [placements, setPlacements] = useState({
    1: [],
    2: [],
    3: []
  });

  const event = EVENTS_BY_GRADE[grade][eventIndex];

  /* ---------- placement helpers ---------- */

  const toggleTeacher = (place, teacher) => {
    setPlacements(prev => {
      const exists = prev[place].includes(teacher);
      return {
        ...prev,
        [place]: exists
          ? prev[place].filter(t => t !== teacher)
          : [...prev[place], teacher]
      };
    });
  };

  const clearPlace = (place) => {
    setPlacements(prev => ({ ...prev, [place]: [] }));
  };

  const resetPlacements = () => {
    setPlacements({ 1: [], 2: [], 3: [] });
  };

  const goNextEvent = () => {
    resetPlacements();
    setEventIndex(i =>
      Math.min(i + 1, EVENTS_BY_GRADE[grade].length - 1)
    );
  };

  const goPrevEvent = () => {
    resetPlacements();
    setEventIndex(i => Math.max(i - 1, 0));
  };

  /* ---------- UI ---------- */

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>⚡ Field Day Scoring</h1>

      {/* Grade Selector */}
      <div style={{ marginBottom: 10 }}>
        {Object.keys(TEACHERS_BY_GRADE).map(g => (
          <button key={g} onClick={() => {
            setGrade(g);
            setEventIndex(0);
            resetPlacements();
          }}>
            {g}
          </button>
        ))}
      </div>

      <h2>{grade}</h2>
      <h3>Event: {event}</h3>

      {/* Placement Sections */}
      {[1, 2, 3].map(place => (
        <div key={place} style={{
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10
        }}>
          <h3>{MEDALS[place]} {place === 1 ? "1st" : place === 2 ? "2nd" : "3rd"} Place</h3>

          {TEACHERS_BY_GRADE[grade].map(t => (
            <button
              key={t}
              style={{
                background: placements[place].includes(t) ? "#cce5ff" : "#eee",
                margin: 3
              }}
              onClick={() => toggleTeacher(place, t)}
            >
              {t}
            </button>
          ))}

          {placements[place].length > 0 && (
            <div>
              <strong>Selected:</strong> {placements[place].join(", ")}
              <div>
                <button onClick={() => clearPlace(place)}>Undo {MEDALS[place]}</button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation */}
      <div style={{ marginTop: 20 }}>
        <button onClick={goPrevEvent} disabled={eventIndex === 0}>
          ⬅ Previous Event
        </button>
        <button onClick={goNextEvent}>
          ✅ Save & Next Event
        </button>
      </div>
    </div>
  );
}
``
