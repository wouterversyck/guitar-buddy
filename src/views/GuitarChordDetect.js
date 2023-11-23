import Strings from "../components/Strings";
import styled from "@emotion/styled";

const StringsContainer = styled.div`
  overflow-x: auto;
  padding-top: 20px;
  overflow-y: hidden;
`;

export default function GuitarChordDetect () {
  return (
    <StringsContainer>
      <Strings selectMode={true} />
    </StringsContainer>
    );
}
