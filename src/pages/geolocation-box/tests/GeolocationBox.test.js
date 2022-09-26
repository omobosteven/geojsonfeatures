import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GeolocationBox } from "pages/geolocation-box/GeolocationBox";

test("Checking four input fields are rendered on initial render", () => {
  render(<GeolocationBox />);

  const inputs = screen.getAllByRole("spinbutton");
  expect(inputs).toHaveLength(4);
});

test("should display required value when value is invalid", async () => {
  render(<GeolocationBox />);

  const submitBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(submitBtn);

  const spanError = await screen.findAllByText(/enter a valid number/i);
  expect(spanError).toHaveLength(4);
  //:TODO expect submit function not to be called
});

test("should display error if maximum input values are lesser than minimum input values", async () => {
  render(<GeolocationBox />);

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

  userEvent.type(minLongitudeInput, "5.0");
  userEvent.type(minLatitudeInput, "6.0");
  userEvent.type(maxLongitudeInput, "1.0");
  userEvent.type(maxLatitudeInput, "2.0");

  const submitBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(submitBtn);

  const LatitudeError = await screen.findByText(/should be greater than 6/i);
  const LongitudeError = await screen.findByText(/should be greater than 5/i);

  expect(LatitudeError).toBeInTheDocument();
  expect(LongitudeError).toBeInTheDocument();
});

test("should display error if input values are out of range", async () => {
  render(<GeolocationBox />);

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

  userEvent.type(minLongitudeInput, "-190.0");
  userEvent.type(minLatitudeInput, "-100.0");
  userEvent.type(maxLongitudeInput, "190.0");
  userEvent.type(maxLatitudeInput, "100.0");

  const submitBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(submitBtn);

  const minLatitudeError = await screen.findByText(
    /should be greater than -90/i
  );
  const minLongitudeError = await screen.findByText(
    /should be greater than -180/i
  );
  const maxLatitudeError = await screen.findByText(/should be lesser than 90/i);
  const maxLongitudeError = await screen.findByText(
    /should be lesser than 180/i
  );

  expect(minLatitudeError).toBeInTheDocument();
  expect(minLongitudeError).toBeInTheDocument();
  expect(maxLatitudeError).toBeInTheDocument();
  expect(maxLongitudeError).toBeInTheDocument();
});

test("inputs should be cleared when clear button is clicked", () => {
  render(<GeolocationBox />);

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

  userEvent.type(minLongitudeInput, "5.0");
  userEvent.type(minLatitudeInput, "6.0");
  userEvent.type(maxLongitudeInput, "7.0");
  userEvent.type(maxLatitudeInput, "8.0");

  const clearBtn = screen.getByRole("button", { name: /clear/i });
  userEvent.click(clearBtn);

  expect(minLongitudeInput.value).toBe("");
  expect(minLatitudeInput.value).toBe("");
  expect(maxLongitudeInput.value).toBe("");
  expect(maxLatitudeInput.value).toBe("");
});

//:TODO test for when inputs are valid submit function should be called
