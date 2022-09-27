import styled from "@emotion/styled";

export const InputField = ({ name, label, error, register }) => {
  return (
    <StyledFormGroup className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="number"
        name={name}
        id={name}
        className="form-input"
        step="0.0000001"
        onWheel={(e) => e.target.blur()}
        {...register(name)}
      />
      <span className="helper-text">{error}</span>
    </StyledFormGroup>
  );
};

const StyledFormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "200px",
  position: "relative",

  "& .form-label": {
    color: "#728C95",
    fontSize: "11px",
    textTransform: "uppercase",
    lineHeight: 2,
    marginBottom: "4px",
    marginLeft: "4px",
  },

  "& .form-input": {
    borderRadius: "8px",
    minHeight: "38px",
    boxShadow: "0 0 0 1px rgb(114 140 149 / 10%), 0 2px 8px rgb(7 39 49 / 8%)",
    border: "none",
    paddingLeft: "12px",
    paddingRight: "12px",

    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },

    "&[type=number]": {
      MozAppearance: "textfield",
    },

    "&:focus-visible": {
      outlineStyle: "solid",
      outlineColor: "#EBECF0",
    },
  },

  "& .helper-text": {
    display: "inline-block",
    fontSize: "11px",
    marginTop: "5px",
    color: "#E55D3D",
    position: "absolute",
    bottom: -15,
    left: 5,
  },
});
