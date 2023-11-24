import { now, Sampler } from 'tone';
import { numericKeys } from './helper-functions';

const sampler = new Sampler({
	urls: {
		"C4": "string-C4.wav",
	},
	release: 1,
	baseUrl: "https://wouterversyck.github.io/guitar-buddy/",
}).toDestination();

export function soundNote(note, height) {
  sampler.triggerAttackRelease(note + height, 1);
}

export function soundNotes(notes) {
  const noteValues = [notes.length];
  let height = 4;

  notes.forEach((note, index) => {
    if (index > 0) {
      if (numericKeys[note] < numericKeys[notes[index-1]]) {
        height++;
      };
    }
    noteValues[index] = note + height;
  });
  soundNotesWithHeight(noteValues);
}

export function soundNotesWithHeight(notes) {
  const time = now();

  notes.forEach((note, index) => sampler.triggerAttack(note, time + index / 4));
  sampler.triggerRelease(notes, time + 5);
}
