import { useRef } from "react";
import { Spinner } from "pages/common/Spinner";
import styled from "@emotion/styled";
import { ViewportList } from "react-viewport-list";
import { DataDisplay } from "pages/geojson-list/common/DataDisplay";
import { TreeDataDisplay } from "pages/geojson-list/common/TreeDataDisplay";

export const renderListFunction = (item) => {
  return (
    <div key={item.id} className="item" role="listitem">
      <DataDisplay title="id" value={item.id} />
      <DataDisplay title="type" value={item.type} />
      <TreeDataDisplay title="geometry" data={item.geometry} />
      <TreeDataDisplay title="properties" data={item.properties} />
    </div>
  );
};
export const GeoJsonList = ({ isLoading, data }) => {
  const ref = useRef(null);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <StyledDataSetContainer dataLength={data?.features.length || 0}>
          {data?.features && (
            <StyledHeader>
              <h4 className="heading">Collection</h4>
              <h4 className="count">
                <span className="count__title">Count:</span>{" "}
                <span className="count__value">{data?.features.length}</span>
              </h4>
            </StyledHeader>
          )}
          <div className="sizer" ref={ref} role="list">
            <ViewportList
              viewportRef={ref}
              items={data?.features || []}
              // itemMinSize={42}
              overscan={2}
              children={renderListFunction}
            />
          </div>
        </StyledDataSetContainer>
      )}
    </>
  );
};

const StyledDataSetContainer = styled("div")(({ dataLength }) => ({
  width: "100%",
  maxWidth: "1260px",
  margin: "54px auto auto",

  "& .sizer": {
    height: dataLength > 4 ? 760 : "auto",
    // display: "flex",
    // flexDirection: "column",
    overflowY: "auto",
    scrollBehavior: "smooth",
    marginBottom: 50,

    "& .item": {
      // flex: "0 0 auto",
      overflow: "hidden",
      marginBottom: "24px",
    },
  },
}));

const StyledHeader = styled.header({
  display: "flex",
  flexWrap: "wrap",
  columnGap: "24px",
  rowGap: "24px",
  justifyContent: "space-between",

  "& .heading": {
    color: "#072731",
  },

  "& .count": {
    "&__title": {
      color: "#728c95",
    },
    "&__value": {
      color: "#072731",
    },
  },
});
