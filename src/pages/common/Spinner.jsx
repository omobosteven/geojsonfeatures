import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

export const Spinner = () => {
  return (
    <StyledDiv role="progressbar">
      <FontAwesomeIcon icon={faCircleNotch} spin size="2x" color="#157390" />
    </StyledDiv>
  );
};

const StyledDiv = styled.div({
  textAlign: "center",
  marginTop: "84px",
});
