import "./Strings.css";
import { beautifyNote } from "../services/helper-functions";
import { soundNote } from "../services/audio-service";
import { createStringsForScale, getTunings, tunings } from "./helper-functions";
import useStickyState from "./stickyState";
import { Switch, FormControlLabel, Select, MenuItem, Slider } from "@mui/material";
import { useState } from "react";

function calcIndicator(stringNumber, fretNumber) {
  return (
    (stringNumber === 2 && (fretNumber === 3 || fretNumber === 5 || fretNumber === 7 || fretNumber === 9 || fretNumber === 15 || fretNumber === 17 || fretNumber === 19 || fretNumber === 21)) ||
    ((stringNumber === 1 || stringNumber === 3) && fretNumber === 12)
  );
}

export default function Strings({ mode }) {
  const [showNotes, setShowNotes] = useStickyState(false, "showNotes");
  const [tuning, setTuning] = useState(tunings.standard);
  const [fretsRange, setFretsRange] = useStickyState([0, 24], "fretsRange");
  const handleShowNotesToggle = (event) => {
    setShowNotes(event.target.checked);
  };
  const handleTuningChange = (event) => {
    setTuning(event.target.value);
  };
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setFretsRange(newValue);
  };
  const data = createStringsForScale(mode.notes, tuning.tuning);

  return(
    <div>
      <FormControlLabel control={
        <Switch
          color="secondary"
          checked={showNotes}
          inputProps={{ 'aria-label': 'Color switch demo' }}
          onChange={handleShowNotesToggle}
        />
      } label="Show notes" />
      <Select
        id="tuning"
        value={tuning}
        onChange={handleTuningChange}>
          {getTunings().map(element => <MenuItem value={element} key={element.label}>{element.label}</MenuItem>)}
      </Select>
      <Slider
        getAriaLabel={() => 'Frets'}
        value={fretsRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks
        max={24}
        disableSwap
      />
      <div className="strings__container">
        <div style={{marginTop: '20px', marginLeft: '10px'}}>
          {data.map((string, stringNumber) => <SingleString range={fretsRange} key={stringNumber} notes={string} mode={mode} stringNumber={stringNumber} showNotes={showNotes}/>)}
        </div>
      </div>
    </div>
  );
}

function SingleString({notes, stringNumber, mode, showNotes, range}) {
    return (
        <div className={`string string--nr-${stringNumber}`}>
          {notes.map((note, fretNumber) =>
            <div
              className="string__fret"
              key={note + fretNumber}>
                { calcIndicator(stringNumber, fretNumber) &&
                  <span className="string__nr-indicator"></span> }
              <div
                className={calculateClasses(note, mode, range, fretNumber)}
                onClick={() =>  note && soundNote(note)}>
                  {showNotes && beautifyNote(note?.note)}
              </div>
            </div>
          )}
        </div>
    );
}

function calculateClasses(note, mode, range, fretNumber) {
  let classes = "string__note";

  if (!note) {
    return classes;
  }
  if (fretNumber < range[0] || fretNumber > range[1]) {
      classes += " string__note--outside-range";
      return classes;
  }

  classes += " string__note--present";
  if (note?.note === mode.notes[0]) {
    classes += " string__note--root";
  }
  if (isThird(mode, note.note)) {
    classes += " string__note--third";
  }
  if (isBlue(mode, note.note)) {
    classes += " string__note--blue";
  }
  if (isFifth(mode, note.note)) {
    classes += " string__note--fifth";
  }
  if (isSeventh(mode, note.note)) {
    classes += " string__note--seventh";
  }

  return classes;
}

function isThird(mode, note) {
  const { notes, intervals } = mode;
  let index = intervals.indexOf("3m");
  if (index === -1) {
    index = intervals.indexOf("3M");
  }
  if (index === -1) {
    return false;
  }
  return notes[index] === note;
}

function isSeventh(mode, note) {
  const { notes, intervals } = mode;
  let index = intervals.indexOf("7m");
  if (index === -1) {
    index = intervals.indexOf("7M");
  }
  if (index === -1) {
    return false;
  }
  return notes[index] === note;
}

function isFifth(mode, note) {
  const { notes, intervals } = mode;
  let index = intervals.indexOf("5P");
  if (index === -1) {
    return false;
  }
  return notes[index] === note;
}


function isBlue(mode, note) {
  const { notes, intervals } = mode;
  let index = intervals.indexOf("5d");
  if (index === -1) {
    return false;
  }
  return notes[index] === note;
}
