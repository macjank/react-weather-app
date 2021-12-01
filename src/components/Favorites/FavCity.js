import { useContext } from "react";
import WeatherContext from "../../store/weather-context";
import styles from "./FavCity.module.css";

const FavCity = ({ cityDetails, onCloseSidebar }) => {
  const { onShowWeatherFromFavs } = useContext(WeatherContext);

  const handleShowWeather = () => {
    onCloseSidebar();
    onShowWeatherFromFavs(cityDetails);
  };

  return (
    <li className={styles.city} onClick={handleShowWeather}>
      {cityDetails.cityName}
    </li>
  );
};

export default FavCity;
