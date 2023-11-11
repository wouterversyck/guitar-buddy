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
  if(!note) {
    return;
  }
  return note.replace("b", "♭").replace("#", "♯");
}
