import styles from "./DailyWeatherItem.module.css";
import { daysOfWeek } from "../data/days-and-months";

const DailyWeatherItem = ({ temp, timestamp, iconCode }) => {
  const date = new Date(timestamp * 1000);
  const dayOfWeek = daysOfWeek[date.getDay()];

  return (
    <div className={styles.day}>
      <h4 className={styles.day__name}>{dayOfWeek}</h4>
      <img
        className={styles.day__image}
        src={`http://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt="weather icon"
      />
      <h4 className={styles.day__temp}>{temp.toFixed(0)}°C</h4>
    </div>
  );
};

export default DailyWeatherItem;
