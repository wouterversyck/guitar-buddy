import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { keys, chordTypeNames, beautifyNote } from "../services/helper-functions";

export default function FindChordsAndNotes() {
  const [key, setKey] = useState(keys[0]);
  const [chordType, setChordType] = useState(chordTypeNames[0]);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };
  const handleChordChange = (event) => {
    setChordType(event.target.value);
  };

  return (
    <div>
      <Select
        id="key"
        value={key}
        onChange={handleKeyChange}>
          {keys.map(e => <MenuItem value={e} key={e}>{beautifyNote(e)}</MenuItem>)}
      </Select>
      <Select
          id="chord"
          value={chordType}
          onChange={handleChordChange}
      >
          {chordTypeNames.map(e => <MenuItem value={e} key={e}>{e}</MenuItem>)}
      </Select>
    </div>
  );
}
