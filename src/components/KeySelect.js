import React, { useEffect } from "react";

import { MenuItem, Select } from "@mui/material";
import { beautifyNote, keys, modes } from "../services/helper-functions";
import useStickyState from "./stickyState";
import { Mode, Scale } from "tonal";

export default function useKeySelect() {
  const [keyValue, setKeyValue] = useStickyState(keys[0], "keyValue");
  const [modeValue, setModeValue] = useStickyState(modes[0], "modeValue")
  const [mode, setMode] = useStickyState(null, "mode");

  useEffect(() => {
    const mode = {
      mode: modeValue,
      key: keyValue,
      notes: Scale.get(`${keyValue} ${modeValue}`).notes,
      intervals: Scale.get(`${keyValue} ${modeValue}`).intervals,
      chords: Mode.triads(modeValue, keyValue),
      seventChords: Mode.seventhChords(modeValue, keyValue)
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
