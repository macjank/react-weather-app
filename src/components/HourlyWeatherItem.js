import styles from "./HourlyWeatherItem.module.css";

const HourlyWeatherItem = ({ temp, timestamp, iconCode }) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();

  return (
    <div className={styles.hour}>
      <h4 className={styles.time}>
        {hours}:00
      </h4>
      <img
        className={styles.image}
        src={`http://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt="weather icon"
      />
      <h4 className={styles.temp}>{temp.toFixed(0)}°C</h4>
    </div>
  );
};

export default HourlyWeatherItem;
