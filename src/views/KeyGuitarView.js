import { Switch, FormControlLabel } from "@mui/material";
import styled from "@emotion/styled";
import useStickyState from "../components/stickyState";
import useFretsSlider from "../components/FretsSlider";
import Strings from "../components/Strings";
import useTuningSelect from "../components/TuningSelect";

const StringsContainer = styled.div`
  overflow-x: auto;
  padding-top: 20px;
  overflow-y: hidden;
`;

export default function KeyGuitarView({ mode }) {
  const [showNotes, setShowNotes] = useStickyState(false, "showNotes");
  const [FretsSlider, fretsRange] = useFretsSlider("keyGuitarViewFretsSlider");
  const [TuningSelect, tuning] = useTuningSelect();

  const handleShowNotesToggle = (event) => {
    setShowNotes(event.target.checked);
  };

  return(
    <div>
      <FormControlLabel control={
        <Switch
          color="secondary"
          checked={showNotes}
          inputProps={{ 'aria-label': 'Color switch demo' }}
          onChange={handleShowNotesToggle}
        />
      } label="Show notes" />
      <TuningSelect />
      <FretsSlider />
      <StringsContainer>
        <div style={{marginTop: '20px', marginLeft: '10px'}}>
          <Strings mode={mode} tuning={tuning} showNotes={showNotes} fretsRange={fretsRange} />
        </div>
      </StringsContainer>
    </div>
  );
}
