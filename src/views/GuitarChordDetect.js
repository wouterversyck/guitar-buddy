import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import Strings from "../components/Strings";
import useTuningSelect from "../components/TuningSelect";
import { beautifyNote, detectChord } from "../services/helper-functions";

const StringsContainer = styled.div`
  overflow-x: auto;
  padding-top: 20px;
  overflow-y: hidden;
  margin-top: 10px;
`;

const StyledItem = styled.span`
  margin: 10px;
`;

export default function GuitarChordDetect () {
  const [TuningSelect, tuning] = useTuningSelect();
  const [notes, setNotes] = useState([]);
  const [key, setKey] = useState(1); // Hacky way to force rerender (state reset);
  const [chords, setChords] = useState([]);

  useEffect(() => {
    setChords(detectChord(notes));
  }, [notes]);

  return (
    <>
      <TuningSelect />
      <Box sx={{mt: 2 }}>
        <Button onClick={() => setKey(key + 1)}>Reset</Button>
        { chords.length === 0 ? <StyledItem>No chord found</StyledItem> :
        chords.map(chord => <StyledItem key={chord}>{beautifyNote(chord)}</StyledItem>) }
      </Box>
      <StringsContainer>
        <Strings key={key} selectMode={true} noteSelected={setNotes} tuning={tuning} />
      </StringsContainer>
    </>
    );
}
