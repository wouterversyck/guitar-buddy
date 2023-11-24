import { now, Sampler } from 'tone';

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
  const noteValues = notes.map(e => e + "4");
  const time = now();

  noteValues.forEach((note, index) => sampler.triggerAttack(note, time + index / 2));
  sampler.triggerRelease(noteValues, time + 3);
}
