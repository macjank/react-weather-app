import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import DailyWeatherContainer from "./components/DailyWeatherContainer";
import Header from "./components/Header";
import HourlyWeatherContainer from "./components/HourlyWeatherContainer";
import NothingToShow from "./components/NothingToShow";
import TodayWeather from "./components/TodayWeather";
import {
  favsActions,
  getFavsFromStorage,
  setFavsInStorage,
} from "./store/favs-redux";
import WeatherContext from "./store/weather-context";

function App() {
  const { weatherData } = useContext(WeatherContext);

  const favs = useSelector(state => state.favs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavsFromStorage());
  }, []);

  useEffect(() => {
    dispatch(setFavsInStorage(favs));
  }, [favs]);

  const content = weatherData ? (
    <>
      <TodayWeather />
      <HourlyWeatherContainer />
      <DailyWeatherContainer />
    </>
  ) : (
    <NothingToShow />
  );

  return (
    <div className="App">
      <Header />
      {content}
    </div>
  );
}

export default App;
