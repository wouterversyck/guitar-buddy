import React from "react";
import logo from "./logo.svg";
import { Scale, Mode } from "tonal";
import "./App.css";
import { keys } from "./helper-functions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function App() {
  const [key, setKey] = React.useState(keys[0]);

  const handleChange = (event) => {
    setKey(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={key}
              onChange={handleChange}
            >
              {keys.map(e => <MenuItem value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
          {Scale.get(key + " major").notes
              .map(e => <span>{e}</span>)}
          <hr/>
          {Mode.notes("dorian", "C").map(e => <span>{e.replace("b", "♭")} - </span>)}
        </div>
      </header>
    </div>
  );
}

export default App;
