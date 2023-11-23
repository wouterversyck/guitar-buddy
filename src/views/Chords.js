import { Box, Paper } from "@mui/material";
import PlayIcon from '@mui/icons-material/PlayArrowRounded';
import { useEffect, useState } from "react";
import { Progression, Chord } from "tonal";
import styled from "@emotion/styled";
import { beautifyNote } from "../services/helper-functions";
import { soundNotes } from "../services/audio-service";

const Table = styled.table`
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Thead = styled.thead`
  border-bottom: 1px solid;
`;

const Td = styled.td`
  padding: 15px;
  cursor: pointer;
`;

const Note = styled.span`
  padding: 5px;
`;

export default function Chords({mode}) {
  const [chord, setChord] = useState();

  const selectChord = (e) => {
    const chord = Chord.get(e);
    setChord(chord);
  }

  useEffect(() => {
    setChord(null);
  }, [mode]);

  return (
  <>
    <Box>
      {mode.scaleNotes.map(e => <Note key={e.note}>{beautifyNote(e.note)}</Note>)}
    </Box>
    <Box>
      <Table>
        <Thead><tr>{Progression.toRomanNumerals(mode.key, mode.chords).map(e => <th key={e}>{e}</th>)}</tr></Thead>
        <tbody>
          <tr>{mode.chords.map(e => <Td key={e} onClick={() => selectChord(e)}>{beautifyNote(e)}</Td>)}</tr>
        </tbody>
      </Table>
    </Box>
    <Box>
      <Table>
        <Thead><tr>{Progression.toRomanNumerals(mode.key, mode.seventhChords).map(e => <th key={e}>{e}</th>)}</tr></Thead>
        <tbody>
          <tr>{mode.seventhChords.map(e => <Td key={e} onClick={() => selectChord(e)}>{beautifyNote(e)}</Td>)}</tr>
        </tbody>
      </Table>
    </Box>
    {chord && (<Paper elevation={10}>
      <div>{chord.name}</div>
      {chord.notes.map(note => <Note key={note}>{beautifyNote(note)}</Note>)}
      <PlayIcon style={{cursor: 'pointer'}} onClick={() => soundNotes(chord.notes)} />
    </Paper >)}
  </>
)
}
