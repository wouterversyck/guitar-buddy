import { Slider } from "@mui/material";
import useStickyState from "./stickyState";

export default function useFretsSlider(storageKey) {
  const [fretsRange, setFretsRange] = useStickyState([0, 24], storageKey);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setFretsRange(newValue);
  };
  const component = () => (
    <Slider
      getAriaLabel={() => 'Frets'}
      value={fretsRange}
      onChange={handleChange}
      valueLabelDisplay="auto"
      marks
      max={24}
      disableSwap
    />
  );


  return [component, fretsRange];
}
