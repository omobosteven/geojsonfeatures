import { useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { CoordinatesDisplay } from "pages/geojson-list/common/CoordinatesDisplay";

export const TreeDataDisplay = ({ title, data }) => {
  const [showData, setShowData] = useState(false);

  const handleDataVisibility = () => {
    setShowData((prevState) => !prevState);
  };

  return (
    <StyledDiv role="treegrid">
      <h5 className="title" onClick={handleDataVisibility}>
        {title} <span className="title__sub">{data?.type}</span>
        <FontAwesomeIcon
          icon={showData ? faCaretDown : faAngleDown}
          size="xl"
          color="#157390"
        />
      </h5>
      <>
        {showData &&
          Object.entries(data).map((property, index) => {
            const isCoordinates = property[0]?.toLowerCase() === "coordinates";

            return (
              <div
                className={`data ${isCoordinates ? "data-column" : ""}`}
                key={`${property[0]}${index}`}
              >
                <h5 className="data__title">{property[0]}</h5>
                {isCoordinates ? (
                  <CoordinatesDisplay coordinates={data.coordinates} />
                ) : (
                  <span className="data__value">{property[1]}</span>
                )}
              </div>
            );
          })}
      </>
    </StyledDiv>
  );
};

const StyledDiv = styled.div({
  backgroundColor: "#F3F7F8",
  borderRadius: "12px",
  padding: "12px 16px",
  marginBottom: "4px",

  "& .title": {
    textTransform: "uppercase",
    fontSize: "11px",
    color: "#728C95",
    margin: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    columnGap: "8px",

    "&__sub": {
      color: "#a6b9bf",
      textTransform: "none",
    },
  },

  "& .data": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "8px",
    columnGap: "12px",
    marginTop: "12px",

    "&.data-column": {
      flexDirection: "column",
    },

    "&__title": {
      margin: 0,
      textTransform: "uppercase",
      color: "#728C95",
      fontSize: "11px",
      lineHeight: 1.5,
      wordBreak: "break-word",
    },

    "&__value": {
      margin: 0,
      fontSize: "15px",
      color: "#072731",
      wordBreak: "break-word",
    },

    "@media screen and (min-width: 768px)": {
      flexDirection: "row",
    },
  },
});
