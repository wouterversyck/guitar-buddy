import { useState } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Chord } from "tonal";
import Strings from "../components/Strings";
import useTuningSelect from "../components/TuningSelect";

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
  return (
    <>
      <TuningSelect />
      <ChordsAndNotes notes={notes} />
      <StringsContainer>
        <Strings selectMode={true} noteSelected={setNotes} tuning={tuning} />
      </StringsContainer>
    </>
    );
}

function ChordsAndNotes({ notes }) {
  const chords = Chord.detect(notes, { assumePerfectFifth: true })?.sort((a, b) => a.length - b.length).map(removeMFromMajorChords);
  return (
    <Box sx={{ mt: 2 }}>
      <Box>
        { chords.length === 0 ? <StyledItem>No chord found</StyledItem> :
          chords.map(chord => <StyledItem key={chord}>{chord}</StyledItem>) }
      </Box>
    </Box>
  );
}

function removeMFromMajorChords(chord) {
  if (!chord) {
    return chord;
  }

  if (chord.length === 2 && chord[1] === 'M') {
    return chord[0];
  }

  return chord;
}
