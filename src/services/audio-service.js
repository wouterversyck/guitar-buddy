import { now, PolySynth } from 'tone';

const synth = new PolySynth().toDestination();

export function soundNote(note) {
  console.log(note)
  synth.triggerAttackRelease(note.note + note.height, 1);
}

export function soundNotes(notes) {
  const time = now();
  for (const [index, note] of notes.entries()) {
    synth.triggerAttack(note, time + index / 2);
  }
  synth.triggerRelease(notes, time + 3);
}
