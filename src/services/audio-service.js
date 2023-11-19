import { now, PolySynth } from 'tone';

const synth = new PolySynth().toDestination();

export function soundNote(note, height) {
  synth.triggerAttackRelease(note + height, 1);
}

export function soundNotes(notes) {
  const noteValues = notes.map(e => e + "4");
  const time = now();

  noteValues.forEach((note, index) => synth.triggerAttack(note, time + index / 2));
  synth.triggerRelease(noteValues, time + 3);
}
