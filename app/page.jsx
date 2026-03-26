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

const MEDALS = ["🥇","🥈","🥉"];

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");
  const [eventIndex, setEventIndex] = useState(0);
  const [placements, setPlacements] = useState([]);

  const event = EVENTS_BY_GRADE[grade][eventIndex];

  return (
    <div style={{ padding: 24 }}>
      <h1>⚡ Field Day Scoring</h1>

      {Object.keys(TEACHERS_BY_GRADE).map(g => (
        <button
          key={g}
          onClick={() => {
            setGrade(g);
            setEventIndex(0);
            setPlacements([]);
          }}
        >
          {g}
        </button>
      ))}

      <h2>{grade}</h2>
      <h3>Event: {event}</h3>

      {TEACHERS_BY_GRADE[grade].map(t => (
        <button key={t} onClick={() =>
          placements.length < 3 && setPlacements([...placements, t])
        }>
          {t}
        </button>
      ))}

      {placements.map((p,i) => (
        <div key={i}>{MEDALS[i]} {p}</div>
      ))}

      {placements.length === 3 && (
        <button onClick={() => {
          setPlacements([]);
          setEventIndex(i => i + 1);
        }}>
          ✅ Save & Next Event
        </button>
      )}
    </div>
  );
}
