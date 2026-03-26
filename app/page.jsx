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

const MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" };
const POINTS = { 1: 3, 2: 2, 3: 1 };

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");
  const [eventIndex, setEventIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const [placements, setPlacements] = useState({ 1: [], 2: [], 3: [] });
  const [scores, setScores] = useState({});

  const event = EVENTS_BY_GRADE[grade][eventIndex];
  const isLastEvent = eventIndex === EVENTS_BY_GRADE[grade].length - 1;

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

  const saveAndNext = () => {
    setScores(prev => {
      const updated = { ...prev };
      [1,2,3].forEach(place => {
        placements[place].forEach(t => {
          updated[t] = (updated[t] || 0) + POINTS[place];
        });
      });
      return updated;
    });

    setPlacements({ 1: [], 2: [], 3: [] });

    if (isLastEvent) {
      setShowResults(true);
    } else {
      setEventIndex(i => i + 1);
    }
  };

  const leaderboard = Object.entries(scores)
    .sort((a,b) => b[1] - a[1])
    .slice(0,3);

  if (showResults) {
    return (
      <div style={{ padding: 24 }}>
        <h1>🎉 FINAL RESULTS – {grade}</h1>
        {leaderboard.map(([name, pts], i) => (
          <h2 key={name}>{MEDALS[i+1]} {name} — {pts} pts</h2>
        ))}
        <button onClick={() => setShowResults(false)}>⬅ Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>⚡ Field Day Scoring</h1>
      <h2>{grade}</h2>
      <h3>Event: {event}</h3>

      {[1,2,3].map(place => (
        <div key={place} style={{ border: "1px solid #ccc", marginBottom: 8, padding: 8 }}>
          <h3>{MEDALS[place]} {place === 1 ? "1st" : place === 2 ? "2nd" : "3rd"} Place</h3>
          {TEACHERS_BY_GRADE[grade].map(t => (
            <button
              key={t}
              style={{ margin: 3, background: placements[place].includes(t) ? "#cce5ff" : "#eee" }}
              onClick={() => toggleTeacher(place, t)}
            >
              {t}
            </button>
          ))}
        </div>
      ))}

      <button onClick={saveAndNext}>
        ✅ {isLastEvent ? "Finish & Show Results" : "Save & Next Event"}
      </button>

      <hr />
      <h3>🏆 Current Standings</h3>
      {leaderboard.map(([name, pts], i) => (
        <div key={name}>{MEDALS[i+1]} {name} — {pts} pts</div>
      ))}
    </div>
  );
}
