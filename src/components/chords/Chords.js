
import { Box } from "@mui/material";
import { Mode, Scale } from "tonal";

export default function Chords({mode, musicKey: key}) {
  return (
  <>
    <Box>
      {Scale.get(`${key} ${mode}`).notes.map(e => <Element key={e} value={e.replace("b", "♭")} />)}
    </Box>
    <Box>
      {Mode.triads(mode, key).map(e => <Element key={e} value={e} />)}
    </Box>
    <Box>
      {Mode.seventhChords(mode, key).map(e => <Element key={e} value={e} />)}
    </Box>
  </>
)
}

function Element({value}) {
  return <span style={{margin: '5px'}}>{value}</span>
}
