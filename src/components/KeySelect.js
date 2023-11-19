import React, { useEffect, useState } from "react";

import { MenuItem, Select } from "@mui/material";
import { beautifyNote, keys, modes } from "../services/helper-functions";
import useStickyState from "./stickyState";
import { Mode, Scale } from "tonal";
import Note from "../models/note";

const createNotesArray = (scale) => scale.notes.map((note, index) => (new Note(note, scale.intervals[index])));

export default function useKeySelect() {
  const [keyValue, setKeyValue] = useStickyState(keys[0], "key");
  const [modeValue, setModeValue] = useStickyState(modes[0], "mode");
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const scale = Scale.get(`${keyValue} ${modeValue}`);
    const mode = {
      mode: modeValue,
      key: keyValue,
      scaleNotes: createNotesArray(scale),
      intervals: scale.intervals,
      chords: Mode.triads(modeValue, keyValue),
      seventhChords: Mode.seventhChords(modeValue, keyValue)
    }

    setMode(mode);
  }, [modeValue, keyValue, setMode]);

  const handleKeyChange = (event) => {
    setKeyValue(event.target.value);
  };
  const handleModeChange = (event) => {
    setModeValue(event.target.value);
  };

  const component = () => (
    <div>
      <Select
        id="key"
        value={keyValue}
        onChange={handleKeyChange}>
          {keys.map(e => <MenuItem value={e} key={e}>{beautifyNote(e)}</MenuItem>)}
      </Select>
      <Select
          id="mode"
          value={modeValue}
          onChange={handleModeChange}
      >
          {modes.map(e => <MenuItem value={e} key={e}>{e}</MenuItem>)}
      </Select>
    </div>
  )

  return [component, mode]
}
