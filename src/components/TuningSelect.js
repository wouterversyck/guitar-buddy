import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { getTunings, tunings } from "../services/helper-functions";

export default function useTuningSelect(defaultTuning = tunings.standard) {
  const [tuning, setTuning] = useState(defaultTuning);
  const handleTuningChange = (event) => {
    setTuning(event.target.value);
  };
  const component = () => (
    <Select
      id="tuning"
      value={tuning}
      onChange={handleTuningChange}>
        {getTunings().map(element => <MenuItem value={element} key={element.label}>{element.label}</MenuItem>)}
    </Select>
  );


  return [component, tuning];
}
