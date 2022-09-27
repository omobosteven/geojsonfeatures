import styled from "@emotion/styled";

export const DataDisplay = ({ title, value }) => {
  return (
    <StyledDiv role="treeitem">
      <h5 className="title">{title}</h5>
      <p className="value">{value}</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div({
  backgroundColor: "#F3F7F8",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  columnGap: "12px",
  padding: "12px 16px",
  marginBottom: "4px",

  "& .title": {
    textTransform: "uppercase",
    margin: 0,
    fontSize: "11px",
    color: "#728C95",
  },

  "& .value": {
    margin: 0,
    fontSize: "15px",
    color: "#072731",
  },
});
