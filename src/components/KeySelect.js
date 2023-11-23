import React, { useEffect, useState } from "react";

import { MenuItem, Select } from "@mui/material";
import { beautifyNote, createMode, keys, modes } from "../services/helper-functions";
import useStickyState from "./stickyState";

export default function useKeySelect() {
  const [keyValue, setKeyValue] = useStickyState(keys[0], "key");
  const [modeValue, setModeValue] = useStickyState(modes[0], "mode");
  const [mode, setMode] = useState(null);

  useEffect(() => {
    setMode(createMode(keyValue, modeValue));

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
