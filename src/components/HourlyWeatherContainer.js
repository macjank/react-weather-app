import { useContext } from "react";
import WeatherContext from "../store/weather-context";
import styles from "./HourlyWeatherContainer.module.css";
import HourlyWeatherItem from "./HourlyWeatherItem";

const HourlyWeatherContainer = () => {
  const { weatherData } = useContext(WeatherContext);
  const { hourly: hourlyData } = weatherData.weatherInfo;

  return (
    <div className={styles.hours}>
      {hourlyData.map((item, index) => {
        //dont want to get data for current hour
        if (index === 0) return;
        const { temp, dt } = item;
        return (
          <HourlyWeatherItem
            key={index}
            temp={temp}
            timestamp={dt}
            iconCode={item.weather[0].icon}
          />
        );
      })}
    </div>
  );
};

export default HourlyWeatherContainer;
