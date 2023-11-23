import "./Strings.css";

import { beautifyNote, chromaticC, tunings } from "../services/helper-functions";
import { soundNote } from "../services/audio-service";
import { createStringsForScale } from "../services/helper-functions";

function calcIndicator(stringNumber, fretNumber) {
  return (
    (stringNumber === 2 && (fretNumber === 3 || fretNumber === 5 || fretNumber === 7 || fretNumber === 9 || fretNumber === 15 || fretNumber === 17 || fretNumber === 19 || fretNumber === 21)) ||
    ((stringNumber === 1 || stringNumber === 3) && fretNumber === 12)
  );
}

export default function Strings({ mode = chromaticC, tuning = tunings.standard, showNotes = true, fretsRange = [0, 25], selectMode = false }) {

  const strings = createStringsForScale(mode.scaleNotes, tuning.tuning);

  return (
    <>
    {strings.map((string, stringNumber) =>
      <SingleString selectMode={selectMode} range={fretsRange} key={stringNumber} stringNotes={string} stringNumber={stringNumber} showNotes={showNotes}/>)}
    </>
  )
}


function SingleString({stringNotes, stringNumber, showNotes, range, selectMode}) {
  return (
      <div className={`string string--nr-${stringNumber}`}>
        {stringNotes.map((stringNote, fretNumber) =>
          <div
            className="string__fret"
            key={fretNumber}>
              { calcIndicator(stringNumber, fretNumber) &&
                <span className="string__nr-indicator"></span> }

            {selectMode ?
            <div
              className={"todo"}
              onClick={() =>  "todo"}>
                {showNotes && beautifyNote(stringNote?.note?.note)}
            </div>
            :
            <div
              className={calculateClasses(stringNote?.note, range, fretNumber)}
              onClick={() =>  stringNote && soundNote(stringNote.note.note, stringNote.height)}>
                {showNotes && beautifyNote(stringNote?.note?.note)}
            </div>
            }
          </div>
        )}
      </div>
  );
}

function calculateClasses(note, range, fretNumber) {
  let classes = "string__note";

  if (!note) {
    return classes;
  }
  if (fretNumber < range[0] || fretNumber > range[1]) {
      classes += " string__note--outside-range";
      return classes;
  }

  return classes += ` string__note--present string__note--${note.interval}`;
}
