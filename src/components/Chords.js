
import { Box } from "@mui/material";
import { beautifyNote } from "../services/helper-functions";

export default function Chords({mode}) {
  return (
  <>
    <Box>
      {mode.notes.map(e => <Element key={e} value={e} />)}
    </Box>
    <Box>
      {mode.chords.map(e => <Element key={e} value={e} />)}
    </Box>
    <Box>
      {mode.seventChords.map(e => <Element key={e} value={e} />)}
    </Box>
  </>
)
}

function Element({value}) {
  return <span style={{margin: '5px'}}>{beautifyNote(value)}</span>
}
