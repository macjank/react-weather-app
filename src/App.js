import { useContext } from "react";
import "./App.css";
import DailyWeatherContainer from "./components/Weather/DailyWeatherContainer";
import Header from "./components/Navigation/Header";
import HourlyWeatherContainer from "./components/Weather/HourlyWeatherContainer";
import NothingToShow from "./components/NothingToShow";
import TodayWeather from "./components/Weather/TodayWeather";
import WeatherContext from "./store/weather-context";

function App() {
  const { weatherData } = useContext(WeatherContext);

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
