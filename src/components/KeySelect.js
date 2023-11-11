import React, { useEffect } from "react";

import { MenuItem, Select } from "@mui/material";
import { beautifyNote, keys, modes } from "../services/helper-functions";
import { Mode, Scale } from "tonal";

export default function useKeySelect() {
  const [keyValue, setKeyValue] = React.useState(keys[0]);
  const [modeValue, setModeValue] = React.useState(modes[0]);
  const [mode, setMode] = React.useState();
  console.log(Scale.get(`${keyValue} ${modeValue}`));
  console.log(Scale.names());

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
  }, [modeValue, keyValue])

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
