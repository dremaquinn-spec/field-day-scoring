"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

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
