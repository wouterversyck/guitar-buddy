
// Go over all 24 frets and calculate if a note of the scale is found at the fret for this string
function getStringWithStartingPoint(startingPoint, height, scale) {
  const notes = [];

  for (let i = 0; i < 25; i++) {
      let found = false;
      const numericNote = (i + startingPoint) % 12;
      if (numericNote === 0) {
          height++;
      }
      for (const scaleNote of scale) {
          if (numericKeys[scaleNote.note] === numericNote) {
              notes[i] = {
                  note: scaleNote,
                  height,
              };
              found = true;
              break;
          }
      }
      if (!found) {
          notes[i] = null;
      }
  }

  return notes;
}

// Create an array of strings with notes present for a certain scale and tuning
export function createStringsForScale(scale, tuning) {
  return [
      getStringWithStartingPoint(numericKeys[tuning.HighE.note], tuning.HighE.height, scale),
      getStringWithStartingPoint(numericKeys[tuning.B.note], tuning.B.height, scale),
      getStringWithStartingPoint(numericKeys[tuning.G.note], tuning.G.height, scale),
      getStringWithStartingPoint(numericKeys[tuning.D.note], tuning.D.height, scale),
      getStringWithStartingPoint(numericKeys[tuning.A.note], tuning.A.height, scale),
      getStringWithStartingPoint(numericKeys[tuning.LowE.note], tuning.LowE.height, scale),
  ]
}

export const tunings = {
  standard: {
    label: "Standard",
    tuning: {
      HighE: { note: "E", height: 4 },
      B: { note: "B", height: 3 },
      G: { note: "G", height: 3 },
      D: { note: "D", height: 3 },
      A: { note: "A", height: 2 },
      LowE: { note: "E", height: 2 }
    }
  },
  half_step_down: {
    label: "Half step down",
    tuning: {
      HighE: { note: "Eb", height: 4 },
      B: { note: "Bb", height: 3 },
      G: { note: "Gb", height: 3 },
      D: { note: "Db", height: 3 },
      A: { note: "Ab", height: 2 },
      LowE: { note: "Eb", height: 2 }
    }
  },
  full_step_down: {
    label: "Full step down",
    tuning: {
      HighE: { note: "D", height: 4 },
      B: { note: "A", height: 3 },
      G: { note: "F", height: 3 },
      D: { note: "C", height: 3 },
      A: { note: "G", height: 2 },
      LowE: { note: "D", height: 2 }
    }
  },
  drop_d: {
    label: "Drop D",
    tuning: {
      HighE: { note: "E", height: 4 },
      B: { note: "B", height: 3 },
      G: { note: "G", height: 3 },
      D: { note: "D", height: 3 },
      A: { note: "A", height: 2 },
      LowE: { note: "D", height: 2 }
    }
  },
  drop_c_sharp: {
    label: "Drop C#",
    tuning: {
      HighE: { note: "Eb", height: 4 },
      B: { note: "Bb", height: 3 },
      G: { note: "Gb", height: 3 },
      D: { note: "Db", height: 3 },
      A: { note: "Ab", height: 2 },
      LowE: { note: "C#", height: 2 }
    }
  },
  drop_c: {
    label: "Drop C",
    tuning: {
      HighE: { note: "D", height: 4 },
      B: { note: "A", height: 3 },
      G: { note: "F", height: 3 },
      D: { note: "C", height: 2 },
      A: { note: "G", height: 2 },
      LowE: { note: "C", height: 1 }
    }
  },
  drop_b: {
    label: "Drop B",
    tuning: {
      HighE: { note: "C#", height: 4 },
      B: { note: "G#", height: 3 },
      G: { note: "E", height: 3 },
      D: { note: "B", height: 2 },
      A: { note: "F#", height: 2 },
      LowE: { note: "B", height: 1 }
    }
  }
};

export function getTunings() {
  return Object.entries(tunings).map(e => tunings[e[0]]);
}

const numericKeys = {
  "B#": 0,
  "C": 0,
  "C#": 1,
  "Db": 1,
  "D": 2,
  "D#": 3,
  "Eb": 3,
  "E": 4,
  "Fb": 4,
  "F": 5,
  "E#": 5,
  "F#": 6,
  "Gb": 6,
  "G": 7,
  "G#": 8,
  "Ab": 8,
  "A": 9,
  "A#": 10,
  "Bb": 10,
  "B": 11,
};
