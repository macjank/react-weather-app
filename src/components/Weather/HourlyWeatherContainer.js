import { useContext } from "react";
import WeatherContext from "../../store/weather-context";
import styles from "./HourlyWeatherContainer.module.css";
import HourlyWeatherItem from "./HourlyWeatherItem";

const HourlyWeatherContainer = () => {
  const { weatherData } = useContext(WeatherContext);
  const { hourly: hourlyData } = weatherData.weatherInfo;

  return (
    <div className={styles.hours}>
      {/* slice(1), bc dont want to get data for current hour */}
      {hourlyData.slice(1).map((item, index) => {
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
