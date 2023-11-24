import "./Strings.css";
import { useEffect, useState } from "react";

import { beautifyNote, chromaticC, tunings } from "../services/helper-functions";
import { soundNote } from "../services/audio-service";
import { createStringsForScale } from "../services/helper-functions";

function calcIndicator(stringNumber, fretNumber) {
  return (
    (stringNumber === 2 && (fretNumber === 3 || fretNumber === 5 || fretNumber === 7 || fretNumber === 9 || fretNumber === 15 || fretNumber === 17 || fretNumber === 19 || fretNumber === 21)) ||
    ((stringNumber === 1 || stringNumber === 3) && fretNumber === 12)
  );
}

export default function Strings({ mode = chromaticC, tuning = tunings.standard, showNotes = true, fretsRange = [0, 25], selectMode = false, noteSelected=() => {}}) {
  const [selectedFrets, setSelectedFrets] = useState(Array(6));
  const [strings, setStrings] = useState([]);

  useEffect(() => {
    const s = createStringsForScale(mode.scaleNotes, tuning.tuning);
    setStrings(s);
  }, [mode, tuning]);

  useEffect(() => {
    var selectedNotes = selectedFrets.map(
      (fretNumber, stringNumber) => {
        return fretNumber == null ? null : strings[stringNumber][fretNumber].note.note;
      }).reverse();
    noteSelected(selectedNotes);
  }, [strings, selectedFrets, noteSelected]);

  const handleFretSelected = (stringNumber, fretNumber) => {
    selectedFrets[stringNumber] = fretNumber;
    setSelectedFrets([...selectedFrets]);
    var selectedNotes = selectedFrets.map(
      (fretNumber, stringNumber) => {
        return fretNumber == null ? null : strings[stringNumber][fretNumber].note.note;
      }).reverse();
    noteSelected(selectedNotes);
  };

  return (
    <>
    {strings.map((string, stringNumber) =>
      <SingleString
        fretSelected={(fretNumber)=> handleFretSelected(stringNumber, fretNumber)}
        selectMode={selectMode}
        range={fretsRange}
        key={stringNumber}
        selectedFret={selectedFrets[stringNumber]}
        stringNotes={string}
        stringNumber={stringNumber}
        showNotes={showNotes}/>)}
    </>
  )
}


function SingleString({stringNotes, stringNumber, showNotes, range, selectMode, selectedFret, fretSelected = ()=>{}}) {

  const handleSelectedFret = (fretNumber) => {
    const selected = fretNumber === selectedFret ? null : fretNumber;
    fretSelected(selected);
  };

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
              className={selectedFret === fretNumber ? "string__note string__note--select string__note--select--selected" : "string__note string__note--select"}
              onClick={() => handleSelectedFret(fretNumber)}>
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
