import styled from "@emotion/styled";

export const NavBar = () => {
  return (
    <StyledNav>
      <h2 className="title">GeoJSON features</h2>
    </StyledNav>
  );
};

const StyledNav = styled.nav({
  backgroundColor: "#072732",
  position: "sticky",
  top: 0,
  padding: "20px",
  zIndex: 100,

  "& .title": {
    color: "#A4EAFF",
    margin: 0,
    fontWeight: 400,
  },
});
