import { NavBar } from "pages/common/Navbar";
import { GeolocationBox } from "pages/geolocation-box/GeolocationBox";
import { GeoJsonList } from "pages/geojson-list/GeoJsonList";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

const api = axios.create();

export const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getGeojsonFeatures = async (bbox) => {
    try {
      setError("");
      setIsLoading(true);
      const { data } = await api.get(
        `https://www.openstreetmap.org/api/0.6/map?bbox=${bbox}`
      );
      // console.log({ data });
      const osmJson = osmtogeojson(data);
      setData(osmJson);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setData(null);
      setError(error.response?.data || "Something went wrong");
    }
  };

  return (
    <main>
      <NavBar />
      <StyledContainer>
        <GeolocationBox getData={getGeojsonFeatures} />
        {error && (
          <StyledErrorMsgDiv>
            <p role="alert">{error}</p>
          </StyledErrorMsgDiv>
        )}
        <GeoJsonList isLoading={isLoading} data={data} />
      </StyledContainer>
    </main>
  );
};

const StyledContainer = styled.div({
  paddingLeft: "20px",
  paddingRight: "20px",
});

const StyledErrorMsgDiv = styled.div({
  marginTop: "84px",
  textAlign: "center",
  color: "#E55D3D",
});
