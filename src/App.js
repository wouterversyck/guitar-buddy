import React from "react";
import "./App.css";
import MainView from "./views/MainView.js";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MainView />
      </ThemeProvider>
    </div>
  );
}

export default App;
