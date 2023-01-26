import { render, screen, waitFor, within } from "@testing-library/react";
import { GeoJsonList } from "pages/geojson-list/GeoJsonList";
import { App } from "../../../App";
import userEvent from "@testing-library/user-event";
import { server } from "mocks/server";
import { rest } from "msw";
import { MockViewportList } from "mocks/react-viewport-list";
import { renderListFunction as mockRenderListFunction } from "pages/geojson-list/GeoJsonList";

jest.mock("react-viewport-list", () => {
  const lib = jest.requireActual("react-viewport-list");

  return {
    __esModule: true,
    ...lib,
    ViewportList: ({ items }) => (
      <MockViewportList items={items} children={mockRenderListFunction} />
    ),
  };
});
test("should show spinner if spinner is true", () => {
  render(<GeoJsonList isLoading data={data} />);

  const spinner = screen.getByRole("progressbar");
  expect(spinner).toBeInTheDocument();
});

test("should render data if spinner is false", async () => {
  render(<GeoJsonList isLoading={false} data={data} />);

  const countHeading = await screen.findByRole("heading", {
    name: /count: 2/i,
  });

  const list = await screen.findByRole("list");
  const locationItem = within(list).getByRole("treeitem", {
    name: /id node\/3815077900/i,
  });
  const locationItem2 = within(list).getByRole("treeitem", {
    name: /id node\/3815077910/i,
  });

  expect(countHeading).toBeInTheDocument();
  expect(list).toBeInTheDocument();
  expect(locationItem).toBeInTheDocument();
  expect(locationItem2).toBeInTheDocument();
});

test("should be able to open and close geometry and properties item", async () => {
  render(<GeoJsonList isLoading={false} data={data} />);

  const propertiesItem = await screen.findAllByRole("heading", {
    name: /properties/i,
  });
  const geomentryItem = await screen.findAllByRole("heading", {
    name: /geometry point/i,
  });

  userEvent.click(propertiesItem[0]);
  const versionProperty = screen.getByRole("heading", { name: /version/i });

  userEvent.click(geomentryItem[0]);
  const coordinatesProperty = screen.getByRole("heading", {
    name: /coordinates/i,
  });

  expect(versionProperty).toBeInTheDocument();
  expect(coordinatesProperty).toBeInTheDocument();

  userEvent.click(propertiesItem[0]);
  expect(versionProperty).not.toBeInTheDocument();

  userEvent.click(geomentryItem[0]);
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

  const noCountHeading = screen.queryByRole("heading", {
    name: /count: 2/i,
  });
  expect(noCountHeading).not.toBeInTheDocument();

  const submitBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(submitBtn);

  await waitFor(async () =>
    expect(
      await screen.findByRole("heading", {
        name: /count: 2/i,
      })
    ).toBeInTheDocument()
  );

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

  const countHeading = await screen.findByRole("heading", {
    name: /count: 1/i,
  });
  expect(countHeading).toBeInTheDocument();
});

test("error response from server when bbox is too large", async () => {
  server.resetHandlers(
    rest.get("https://www.openstreetmap.org/api/0.6/map", (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.text(
          "The maximum bbox size is 0.250000, and your request was too large. Either request a smaller area, or use planet.osm"
        )
      );
    })
  );

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
  server.resetHandlers(
    rest.get("https://www.openstreetmap.org/api/0.6/map", (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.text(
          "You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm"
        )
      );
    })
  );

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
