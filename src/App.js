import { useContext } from "react";
import "./App.css";
import DailyWeatherContainer from "./components/DailyWeatherContainer";
import Header from "./components/Header";
import HourlyWeatherContainer from "./components/HourlyWeatherContainer";
import NothingToShow from "./components/NothingToShow";
import TodayWeather from "./components/TodayWeather";
import WeatherContext from "./store/weather-context";

function App() {
  const { weatherData } = useContext(WeatherContext);

  let content = weatherData ? (
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
