import React from "react";
import { Container } from "@mui/material";
import Chords from "../components/Chords.js";
import Strings from "../components/Strings";
import useKeySelect from "../components/KeySelect.js";

export default function MainView() {

  const [KeySelect, mode] = useKeySelect();

  return (
    <Container maxWidth="sm">
      <KeySelect />
      {mode ? (
        <>
          <Chords mode={mode} />
          <Strings scale={mode.notes} />
        </>
      ) : (
        <span>Please select a scale</span>
      )}

    </Container>);
}
