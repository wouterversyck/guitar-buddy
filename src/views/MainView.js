import React from "react";
import { Container } from "@mui/material";
import Chords from "../components/chords/Chords.js";
import KeySelect, { useKeySelect, useModeSelect } from "../components/KeySelect.js";

export default function MainView() {

  const [key, setKey] = useKeySelect();
  const [mode, setMode] = useModeSelect();

  return (
    <Container maxWidth="sm">
      <KeySelect musicKey={key} setKey={setKey} mode={mode} setMode={setMode} />
      <Chords mode={mode} musicKey={key} />
    </Container>);
}
