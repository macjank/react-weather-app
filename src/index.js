import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WeatherContextProvider } from "./store/weather-context";
import { FavsContextProvider } from "./store/favs-context";

ReactDOM.render(
  <React.StrictMode>
      <FavsContextProvider>
        <WeatherContextProvider>
          <App />
        </WeatherContextProvider>
      </FavsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
