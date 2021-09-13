import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/favs-redux";
import { WeatherContextProvider } from "./store/weather-context";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
