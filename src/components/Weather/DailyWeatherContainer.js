import { useContext } from "react";
import WeatherContext from "../../store/weather-context";
import DailyWeatherItem from "./DailyWeatherItem";
import styles from "./DailyWeatherContainer.module.css";

const DailyWeatherContainer = () => {
  const { weatherData } = useContext(WeatherContext);
  const { daily: dailyData } = weatherData.weatherInfo;

  return (
    <div className={styles.days}>
      {/* slice(1), bc dont want to get data for current day */}
      {dailyData.slice(1).map((item, index) => {
        const { temp, dt } = item;
        return (
          <DailyWeatherItem
            key={index}
            temp={temp.day}
            timestamp={dt}
            iconCode={item.weather[0].icon}
          />
        );
      })}
    </div>
  );
};

export default DailyWeatherContainer;
