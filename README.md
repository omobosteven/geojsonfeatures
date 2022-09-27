# Get Geojson Features

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technologies / Libraries used
- [osmtogeojson](https://github.com/tyrasd/osmtogeojson): Converts OSM data to GeoJSON
- [emotion/styled](https://emotion.sh/docs/styled): Create React conmponents that have styles attached to them.
- [react hook form](https://react-hook-form.com/): Build performant, flexible, and extensible forms with easy-to-use validation.
- [react viewport list](https://github.com/oleggrishechkin/react-viewport-list): Build virtualized list component in React that works perfectly with Flexbox, dynamic item height and width.
- [react testing library](https://testing-library.com/docs/react-testing-library/intro): Test React application.
- [yup](https://github.com/jquense/yup): A schema builder for runtime value parsing and validation.
- [axios](https://axios-http.com/): Promise based HTTP client for the browser and nodejs.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Improvements that can be made
- Add a `scroll to top` button when scrolling through the dataset
- Find a way to properly test the dataset render inside the `ViewportList` component. Currently, only one item is rendered in the `ViewportList` component during testing.
