"use client";

import { useState } from "react";

/* ===============================
   DATA
================================ */

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

/* ===============================
   APP
================================ */

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");
  const [eventIndex, setEventIndex] = useState(0);
  const [heatIndex, setHeatIndex] = useState(0);
  const [placements, setPlacements] = useState([]);
  const [students, setStudents] = useState(["", "", ""]);
  const [entries, setEntries] = useState([]);
