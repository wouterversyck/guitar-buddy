import React from "react";

import { FormControl, MenuItem, Select } from "@mui/material";
import { keys, modes } from "../services/helper-functions";

export default function KeySelect({musicKey: key, setKey, mode, setMode}) {
  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };
  const handleModeChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <Select
        id="key"
        value={key}
        onChange={handleKeyChange}>
          {keys.map(e => <MenuItem value={e}>{e}</MenuItem>)}
      </Select>
      <Select
          id="mode"
          value={mode}
          onChange={handleModeChange}
      >
          {modes.map(e => <MenuItem value={e}>{e}</MenuItem>)}
      </Select>
    </FormControl>
  )
}


export function useKeySelect() {
  const [key, setKey] = React.useState(keys[0]);

  return [key, setKey];
}

export function useModeSelect() {
  const [mode, setMode] = React.useState(modes[0]);

  return [mode, setMode];
}
