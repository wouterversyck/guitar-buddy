import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import Strings from "../components/Strings";
import useTuningSelect from "../components/TuningSelect";
import { beautifyNote, detectChord } from "../services/helper-functions";
import { soundNotesWithHeight } from "../services/audio-service";

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
    setChords(detectChord(notes.filter(e => e).map(e => e.note)));
  }, [notes]);

  const handlePlayChord = () => {
    const notesToPlay = notes.filter(e => e).map(e => e.note + e.height);
    soundNotesWithHeight(notesToPlay);
  }

  return (
    <>
      <TuningSelect />
      <Box sx={{mt: 2 }}>
        <Button onClick={() => setKey(key + 1)}>Reset</Button>
        { chords.length === 0 ? <StyledItem>No chord found</StyledItem> :
        chords.map(chord => <StyledItem onClick={handlePlayChord} key={chord}>{beautifyNote(chord)}</StyledItem>) }
      </Box>
      <StringsContainer>
        <Strings key={key} selectMode={true} noteSelected={setNotes} tuning={tuning} />
      </StringsContainer>
    </>
    );
}
