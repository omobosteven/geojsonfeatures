import { rest } from "msw";

export const handlers = [
  rest.get("https://www.openstreetmap.org/api/0.6/map", (req, res, ctx) => {
    const bbox = req.url.searchParams.get("bbox");

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
