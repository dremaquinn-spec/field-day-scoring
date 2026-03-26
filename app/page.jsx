"use client";"usecia", "Guerra", "Verdugo", "Robinson", "Espinoza"]
};

const EVENTS_BY_GRADE = {
  "Pre-K": ["Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay","Hippity Hop Relay","Hula Hoop Bean Bag","Tug of War – Girls","Tug of War – Boys"],
  "Kinder": ["Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay","Cone Flip Relay","Hippity Hop Relay","Tire Roll","Dash Relay","Relay #9","Tug of War – Girls","Tug of War – Boys"],
  "1st": ["Hurdle Relay","Baton Relay","Flag Relay","Pancake Relay","Cone Flip Relay","Hippity Hop Relay","Tire Roll","Dash Relay","Relay #9","Tug of War – Girls","Tug of War – Boys"],
  "2nd": ["Hurdle Relay","Baton Relay","Flag Relay","Sack Relay","Pancake Relay","3-Legged Race","Hippity Hop Relay","Tire Roll","Dash Race – Girls","Dash Race – Boys","Tug of War – Girls","Tug of War – Boys"],
  "3rd": ["Hurdle Relay","Baton Relay","Flag Relay","Sack Relay","Jump Rope Relay","3-Legged Race","Hippity Hop Relay","Tire Roll","Dash Race – Girls","Dash Race – Boys","Tug of War – Girls","Tug of War – Boys"],
  "4th": ["3-Legged Race","Sack Relay","Hippity Hop Relay","Tire Roll","Hurdle Race","Baton Relay","Pancake Relay","Jump Rope Relay","Flag Relay","50m Dash – Girls","50m Dash – Boys","75m Dash – Girls","75m Dash – Boys","Tug of War – Girls","Tug of War – Boys"]
};

const MEDALS = ["🥇","🥈","🥉"];

/* ===== APP ===== */

export default function FieldDayApp() {
  const [grade,setGrade] = useState("Pre-K");
  const [eventIndex,setEventIndex] = useState(0);
  const [placements,setPlacements] = useState([]);

  const event = EVENTS_BY_GRADE[grade][eventIndex];

  const addPlacement = (teacher) => {
    if (placements.length < 3) {
      setPlacements([...placements, teacher]);
    }
  };

  const saveEvent = () => {
    if (placements.length !== 3) return;
    setPlacements([]);
    setEventIndex(i => Math.min(i+1, EVENTS_BY_GRADE[grade].length-1));
  };

  return (
    <div style={{padding:20, maxWidth:600, margin:"auto"}}>
      <h1>⚡ Field Day Scoring</h1>

      <div>
        {Object.keys(TEACHERS_BY_GRADE).map(g => (
          <button key={g} onClick={() => {setGrade(g); setEventIndex(0); setPlacements([]);}}>
            {g}
          </button>
        ))}
      </div>

      <h2>{grade}</h2>
      <h3>Event: {event}</h3>

      <div>
        {TEACHERS_BY_GRADE[grade].map(t => (
          <button key={t} onClick={() => addPlacement(t)}>
            {t}
          </button>
        ))}
      </div>

      <div>
        {placements.map((p,i) => <div key={i}>{MEDALS[i]} {p}</div>)}
      </div>

      <button onClick={saveEvent}>✅ Save Event & Advance</button>
    </div>
  );
}
import { useState } from "react";

/* ===== DATA ===== */

const TEACHERS_BY_GRADE = {
  "Pre-K": ["Lopez", "Dugat", "Bradford", "Castaneda", "Hance"],
  "Kinder": ["Miranda", "Perez", "Martinez", "Allison", "Almontes", "Harris"],
  "1st": ["Pena", "Johnson", "Y. Mendez", "Cortez", "Molina"],
  "2nd": ["Ferguson", "Aguiar", "M. Mendez", "Haji", "Howard", "King"],
  "3rd": ["Ryan", "Vasquez", "Kelley", "Galvez", "Matthews", "Stereff", "Moon"],
