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
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
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
        { chords.length === 0 ? <StyledItem onClick={handlePlayChord} >No chord found</StyledItem> :
        (<span onClick={handlePlayChord}>
          { chords.map(chord => <StyledItem key={chord}>{beautifyNote(chord)}</StyledItem>) }
        </span>)}
      </Box>
      <StringsContainer>
        <Strings key={key} selectMode={true} noteSelected={setNotes} tuning={tuning} />
      </StringsContainer>
    </>
    );
}
