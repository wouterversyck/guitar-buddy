export const keys = [
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

export const modes = [
  "major", "dorian", "phrygian", "lydian", "mixolydian", "minor", "locrian"
]

export function beautifyNote(note) {
  return note.replace("b", "♭").replace("#", "♯");
}
