import React from "react";
import { Box, Container } from "@mui/material";
import Chords from "../components/Chords.js";
import Strings from "../components/Strings";
import useKeySelect from "../components/KeySelect.js";
import styled from "@emotion/styled";

const StyledString = styled(Strings)`
  margin-top: 100px;
  color: red;
`;

export default function MainView() {

  const [KeySelect, mode] = useKeySelect();

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <KeySelect style={{margin: '100px'}} />
      </Box>

      {mode ? (
        <Box sx={{ mt: 5 }}>
          <Chords mode={mode} />
          <Box sx={{ mt: 5 }}>
            <StyledString mode={mode} />
          </Box>
        </Box>
      ) : (
        <span>Please select a scale</span>
      )}

    </Container>);
}
