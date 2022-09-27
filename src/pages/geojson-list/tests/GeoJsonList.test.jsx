import { render, screen, within, waitFor } from "@testing-library/react";
import { GeoJsonList } from "pages/geojson-list/GeoJsonList";
import { App } from "../../../App";
import userEvent from "@testing-library/user-event";

test("should show spinner if spinner is true", async () => {
  render(<GeoJsonList isLoading data={data} />);

  const spinner = screen.getByRole("progressbar");
  expect(spinner).toBeInTheDocument();
});

test("should render data if spinner is false", () => {
  render(<GeoJsonList isLoading={false} data={data} />);

  const countHeading = screen.getByRole("heading", {
    name: /count: 2/i,
  });

  const list = screen.getByRole("list");
  const locationItem = within(list).getByRole("treeitem", {
    name: /id node\/3815077900/i,
  });

  expect(countHeading).toBeInTheDocument();
  expect(list).toBeInTheDocument();
  expect(locationItem).toBeInTheDocument();
});

test("should be able to open and close geometry and properties data", async () => {
  render(<GeoJsonList isLoading={false} data={data} />);

  const propertiesItem = screen.getByRole("heading", {
    name: /properties/i,
  });
  const geomentryItem = screen.getByRole("heading", {
    name: /geometry point/i,
  });

  userEvent.click(propertiesItem);
  const versionProperty = screen.getByRole("heading", { name: /version/i });

  userEvent.click(geomentryItem);
  const coordinatesProperty = screen.getByRole("heading", {
    name: /coordinates/i,
  });

  expect(versionProperty).toBeInTheDocument();
  expect(coordinatesProperty).toBeInTheDocument();

  userEvent.click(propertiesItem);
  expect(versionProperty).not.toBeInTheDocument();

  userEvent.click(geomentryItem);
  expect(coordinatesProperty).not.toBeInTheDocument();
});

test("get geojson feature happy path", async () => {
  render(<App />);

  const minLongitudeInput = screen.getByRole("spinbutton", {
    name: /min longitude/i,
  });
  const minLatitudeInput = screen.getByRole("spinbutton", {
    name: /min latitude/i,
  });
  const maxLongitudeInput = screen.getByRole("spinbutton", {
    name: /max longitude/i,
  });
  const maxLatitudeInput = screen.getByRole("spinbutton", {
    name: /max latitude/i,
  });

  userEvent.clear(minLongitudeInput);
  userEvent.clear(minLatitudeInput);
  userEvent.clear(maxLongitudeInput);
  userEvent.clear(maxLatitudeInput);

  userEvent.type(minLongitudeInput, "0");
  userEvent.type(minLatitudeInput, "0");
  userEvent.type(maxLongitudeInput, "0.1");
  userEvent.type(maxLatitudeInput, "0.1");

  const noHeader = screen.queryByRole("heading", {
    name: /count: 2/i,
  });
  expect(noHeader).not.toBeInTheDocument();

  const submitBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(submitBtn);

  const countHeading = await screen.findByRole("heading", {
    name: /count: 2/i,
  });
  expect(countHeading).toBeInTheDocument();

  const clearBtn = screen.getByRole("button", { name: /clear/i });
  userEvent.click(clearBtn);

  expect(minLongitudeInput.value).toBe("");
  expect(minLatitudeInput.value).toBe("");
  expect(maxLongitudeInput.value).toBe("");
  expect(maxLatitudeInput.value).toBe("");

  userEvent.type(minLongitudeInput, "0.1");
  userEvent.type(minLatitudeInput, "0.1");
  userEvent.type(maxLongitudeInput, "0.12");
  userEvent.type(maxLatitudeInput, "0.12");

  userEvent.click(submitBtn);

  const countHeading2 = await screen.findByRole("heading", {
    name: /count: 1/i,
  });
  expect(countHeading2).toBeInTheDocument();
});

test("error response from server when bbox is too large", async () => {
  render(<App />);

  const minLongitudeInput = screen.getByRole("spinbutton", {
    name: /min longitude/i,
  });
  const minLatitudeInput = screen.getByRole("spinbutton", {
    name: /min latitude/i,
  });
  const maxLongitudeInput = screen.getByRole("spinbutton", {
    name: /max longitude/i,
  });
  const maxLatitudeInput = screen.getByRole("spinbutton", {
    name: /max latitude/i,
  });

  userEvent.clear(minLongitudeInput);
  userEvent.clear(minLatitudeInput);
  userEvent.clear(maxLongitudeInput);
  userEvent.clear(maxLatitudeInput);

  userEvent.type(minLongitudeInput, "0");
  userEvent.type(minLatitudeInput, "0");
  userEvent.type(maxLongitudeInput, "1");
  userEvent.type(maxLatitudeInput, "1");

  const submitBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(submitBtn);

  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toBeInTheDocument();
  expect(errorAlert).toHaveTextContent(
    "The maximum bbox size is 0.250000, and your request was too large. Either request a smaller area, or use planet.osm"
  );
});

test("error message if too many nodes is requested", async () => {
  render(<App />);

  const minLongitudeInput = screen.getByRole("spinbutton", {
    name: /min longitude/i,
  });
  const minLatitudeInput = screen.getByRole("spinbutton", {
    name: /min latitude/i,
  });
  const maxLongitudeInput = screen.getByRole("spinbutton", {
    name: /max longitude/i,
  });
  const maxLatitudeInput = screen.getByRole("spinbutton", {
    name: /max latitude/i,
  });

  userEvent.clear(minLongitudeInput);
  userEvent.clear(minLatitudeInput);
  userEvent.clear(maxLongitudeInput);
  userEvent.clear(maxLatitudeInput);

  userEvent.type(minLongitudeInput, "10");
  userEvent.type(minLatitudeInput, "10");
  userEvent.type(maxLongitudeInput, "10.5");
  userEvent.type(maxLatitudeInput, "10.4");

  const submitBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(submitBtn);

  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toBeInTheDocument();
  expect(errorAlert).toHaveTextContent(
    "You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm"
  );
});

const data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "node/3815077900",
      geometry: { type: "Point", coordinates: [0, 0] },
      properties: {
        version: 125,
        name: "Soul Buoy",
      },
    },
    {
      type: "Feature",
      id: "node/3815077910",
      geometry: { type: "Point", coordinates: [0, 0] },
      properties: {
        version: 126,
        name: "Soul Bay",
      },
    },
  ],
};
