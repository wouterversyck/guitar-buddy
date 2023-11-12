import React, { useState } from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import Chords from "../components/Chords.js";
import Strings from "../components/Strings";
import useKeySelect from "../components/KeySelect.js";
import styled from "@emotion/styled";

const StyledString = styled(Strings)`
  margin-top: 100px;
  color: red;
`;

export default function MainView() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const [KeySelect, mode] = useKeySelect();

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Chords" />
          <Tab label="Fretboard" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 5 }}>
        <KeySelect style={{margin: '100px'}} />
      </Box>

      {mode ? (
        <Box sx={{ mt: 5 }} >
          <Box hidden={tab !== 0}>
            <Chords mode={mode} />
          </Box>
          <Box sx={{ mt: 5 }} hidden={tab !== 1}>
            <StyledString mode={mode} />
          </Box>
        </Box>
      ) : (
        <span>Please select a scale</span>
      )}

    </Container>);
}
