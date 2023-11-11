import "./Strings.css";
import { beautifyNote } from "../services/helper-functions";
import { soundNote } from "../services/audio-service";
import { createStringsForScale, getTunings, tunings } from "./helper-functions";
import { Switch, FormControlLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

function calcIndicator(position, index) {
  return (
    (position === 2 && (index === 3 || index === 5 || index === 7 || index === 9 || index === 15 || index === 17 || index === 19 || index === 21)) ||
    ((position === 1 || position === 3) && index === 12)
  );
}

export default function Strings({ mode }) {
  const [showNotes, setShowNotes] = useState(false);
  const [tuning, setTuning] = useState(tunings.standard);
  const handleShowNotesToggle = (event) => {
    setShowNotes(event.target.checked);
  };
  const handleTuningChange = (event) => {
    setTuning(event.target.value);
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
          {getTunings().map(tuning => <MenuItem value={tuning} key={tuning.label}>{tuning.label}</MenuItem>)}
      </Select>
      <div className="strings__container">
        <div style={{marginTop: '20px', marginLeft: '10px'}}>
          {data.map((string, index) => <SingleString key={index} notes={string} mode={mode} position={index} showNotes={showNotes}/>)}
        </div>
      </div>
    </div>
  );
}

function SingleString({notes, position, mode, showNotes}) {
    return (
        <div className={`string string--nr-${position}`}>
          {notes.map((note, index) =>
            <div
              className="string__fret"
              key={note + index}>
                { calcIndicator(position, index) &&
                  <span className="string__nr-indicator"></span> }
              <div
                className={calculateClasses(note, mode)}
                onClick={() =>  note && soundNote(note)}>
                  {showNotes && beautifyNote(note?.note)}
              </div>
            </div>
          )}
        </div>
    );
}

function calculateClasses(note, mode) {
  let classes = "string__note";

  if (!note) {
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
