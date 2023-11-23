import { getTunings, tunings } from "../services/helper-functions";
import useStickyState from "../components/stickyState";
import Strings from "../components/Strings";
import { Switch, FormControlLabel, Select, MenuItem, Slider } from "@mui/material";
import { useState } from "react";
import styled from "@emotion/styled";

const StringsContainer = styled.div`
  overflow-x: auto;
  padding-top: 20px;
  overflow-y: hidden;
`;

export default function KeyGuitarView({ mode }) {
  const [showNotes, setShowNotes] = useStickyState(false, "showNotes");
  const [tuning, setTuning] = useState(tunings.standard);
  const [fretsRange, setFretsRange] = useStickyState([0, 24], "fretsRange");
  const handleShowNotesToggle = (event) => {
    setShowNotes(event.target.checked);
  };
  const handleTuningChange = (event) => {
    setTuning(event.target.value);
  };
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setFretsRange(newValue);
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
      <Select
        id="tuning"
        value={tuning}
        onChange={handleTuningChange}>
          {getTunings().map(element => <MenuItem value={element} key={element.label}>{element.label}</MenuItem>)}
      </Select>
      <Slider
        getAriaLabel={() => 'Frets'}
        value={fretsRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks
        max={24}
        disableSwap
      />
      <StringsContainer>
        <div style={{marginTop: '20px', marginLeft: '10px'}}>
          <Strings mode={mode} tuning={tuning} showNotes={showNotes} fretsRange={fretsRange} />
        </div>
      </StringsContainer>
    </div>
  );
}
