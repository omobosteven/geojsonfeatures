import { rest } from "msw";

export const handlers = [
  rest.get("https://www.openstreetmap.org/api/0.6/map", (req, res, ctx) => {
    const bbox = req.url.searchParams.get("bbox");
    // console.log({ bbox });

    if (bbox === "0,0,1,1") {
      return res(
        ctx.status(400),
        ctx.text(
          "The maximum bbox size is 0.250000, and your request was too large. Either request a smaller area, or use planet.osm"
        )
      );
    }

    if (bbox === "10,10,10.5,10.4") {
      return res(
        ctx.status(400),
        ctx.text(
          "You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm"
        )
      );
    }
    return res(ctx.json(customResponseBasedonQueryParams[bbox]));
  }),
];

const customResponseBasedonQueryParams = {
  "0,0,0.1,0.1": {
    version: "0.6",
    generator: "CGImap 0.8.8 (1958229 spike-08.openstreetmap.org)",
    copyright: "OpenStreetMap and contributors",
    attribution: "http://www.openstreetmap.org/copyright",
    license: "http://opendatacommons.org/licenses/odbl/1-0/",
    bounds: {
      minlat: 0,
      minlon: 0,
      maxlat: 0.1,
      maxlon: 0.1,
    },
    elements: [
      {
        type: "node",
        id: 3815077900,
        lat: 0,
        lon: 0,
        version: 125,
        uid: 1778799,
        tags: {
          name: "Soul Buoy",
        },
      },
      {
        type: "node",
        id: 3815077910,
        lat: 0,
        lon: 0,
        version: 126,
        uid: 1778800,
        tags: {
          name: "Soul Boy",
        },
      },
    ],
  },

  "0.1,0.1,0.12,0.12": {
    version: "0.6",
    generator: "CGImap 0.8.8 (1958229 spike-08.openstreetmap.org)",
    copyright: "OpenStreetMap and contributors",
    attribution: "http://www.openstreetmap.org/copyright",
    license: "http://opendatacommons.org/licenses/odbl/1-0/",
    bounds: {
      minlat: 0.1,
      minlon: 0.1,
      maxlat: 0.12,
      maxlon: 0.12,
    },
    elements: [
      {
        type: "node",
        id: 3815077900,
        lat: 0,
        lon: 0,
        version: 125,
        uid: 1778799,
        tags: {
          name: "Soul Buoy",
        },
      },
    ],
  },
};
