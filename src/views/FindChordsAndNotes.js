import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, MenuItem, Select } from "@mui/material";
import { keys, chordTypeNames, beautifyNote, createChord } from "../services/helper-functions";
import Strings from "../components/Strings";
import useTuningSelect from "../components/TuningSelect";
import useFretsSlider from "../components/FretsSlider";


const StringsContainer = styled.div`
  overflow-x: auto;
  padding-top: 20px;
  overflow-y: hidden;
`;

const Note = styled.span`
  padding: 5px;
`;

export default function FindChordsAndNotes() {
  const [TuningSelect, tuning] = useTuningSelect();
  const [FretsSlider, fretsRange] = useFretsSlider();
  const [key, setKey] = useState(keys[0]);
  const [chordType, setChordType] = useState(chordTypeNames[0]);
  const [chord, setChord] = useState();

  useEffect(() => {
    setChord(createChord(key, chordType));
  }, [key, chordType]);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };
  const handleChordChange = (event) => {
    setChordType(event.target.value);
  };

  return (
    <div>
      <Box>
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
      </Box>
      <Box>
        <TuningSelect />
      </Box>
      <Box mt={2}>
        {chord?.scaleNotes.map(e => (<Note>{e.note}</Note>))}
      </Box>
      <FretsSlider />
      <StringsContainer>
        <Strings mode={chord} showNotes={true} tuning={tuning} fretsRange={fretsRange} />
      </StringsContainer>
    </div>
  );
}
