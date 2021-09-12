import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WeatherContextProvider } from "./store/weather-context";
import { FavContextProvider } from "./store/fav-context";

ReactDOM.render(
  <React.StrictMode>
    <FavContextProvider>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </FavContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
