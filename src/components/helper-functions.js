
// Go over all 24 frets and calculate if a note of the scale is found at the fret for this string
function getStringWithStartingPoint(startingPoint, height, scale) {
  const notes = [];

  for (let i = 0; i < 25; i++) {
      let found = false;
      const numericNote = (i + startingPoint) % 12;
      if (numericNote === 0) {
          height++;
      }
      for (const note of scale) {
          if (numericKeys[note] === numericNote) {
              notes[i] = {
                  note,
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
      getStringWithStartingPoint(numericKeys[tuning.HighE], 4, scale), // High E
      getStringWithStartingPoint(numericKeys[tuning.B], 3, scale), // B
      getStringWithStartingPoint(numericKeys[tuning.G], 3, scale), // G
      getStringWithStartingPoint(numericKeys[tuning.D], 3, scale), // D
      getStringWithStartingPoint(numericKeys[tuning.A], 2, scale), // A
      getStringWithStartingPoint(numericKeys[tuning.LowE], 2, scale), // Low E
  ]
}

export const tunings = {
  standard: {
      label: "Standard",
      tuning: {
          HighE: "E",
          B: "B",
          G: "G",
          D: "D",
          A: "A",
          LowE: "E"
      }
  },
  half_step_down: {
      label: "Half step down",
      tuning: {
          HighE: "Eb",
          B: "Bb",
          G: "Gb",
          D: "Db",
          A: "Ab",
          LowE: "Eb"
      }
  },
  full_step_down: {
      label: "Full step down",
      tuning: {
          HighE: "D",
          B: "G",
          G: "F",
          D: "C",
          A: "G",
          LowE: "D"
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
