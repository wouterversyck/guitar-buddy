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
  const height = 3;

  notes.forEach((note, index) => {
    if (index > 0) {
      if (numericKeys[note] < notes[index-1]) {
        height++;
      };
    }
    noteValues[index] = note + height;
  });
  const time = now();

  noteValues.forEach((note, index) => sampler.triggerAttack(note, time + index / 2));
  sampler.triggerRelease(noteValues, time + 3);
}
