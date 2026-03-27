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
const PLACE_LABELS = { 1: "1st", 2: "2nd", 3: "3rd" };

/* ===================== APP ===================== */

export default function FieldDayScoringApp() {
  const [grade, setGrade] = useState("Pre-K");
  const [scores, setScores] = useState({});
  const [lockedGrades, setLockedGrades] = useState({});
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
