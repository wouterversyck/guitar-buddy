import React, { useState } from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import Chords from "./Chords.js";
import Strings from "./KeyGuitarView.js";
import useKeySelect from "../components/KeySelect.js";
import styled from "@emotion/styled";
import ChordDetect from "./GuitarChordDetect.js";

const StyledString = styled(Strings)`
  margin-top: 100px;
  color: red;
`;

const tabs = [
  { label: 'Fretboard', component: StyledString },
  { label: 'Chords', component: Chords },
  { label: 'Detect chords', component: ChordDetect }
];

export default function MainView() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const [KeySelect, mode] = useKeySelect();

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
          { tabs.map(tab => <Tab key={tab.label} label={tab.label} />) }
        </Tabs>
      </Box>
      {/* Dont show KeySelect on chord detect screen */}
      <Box sx={{ mt: 5 }} hidden={selectedTab === 2}>
        <KeySelect style={{margin: '100px'}} />
      </Box>

      {mode ? (
        <Box sx={{ mt: 5 }} >
          { tabs.map((tab, index) => (
            <Box key={tab.label} sx={{ mt: 5 }} hidden={selectedTab !== index}>
              <tab.component mode={mode} />
            </Box>
          )) }
        </Box>
      ) : (
        <span>Please select a scale</span>
      )}

    </Container>);
}
