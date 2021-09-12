import { useContext } from "react/cjs/react.development";
import WeatherContext from "../store/weather-context";
import styles from "./FavCity.module.css";

const FavCity = ({ cityDetails, onCloseSidebar }) => {
  const { onShowWeatherFromFavs } = useContext(WeatherContext);

  const handleShowWeather = () => {
    onCloseSidebar();
    //console.log(cityDetails);
    onShowWeatherFromFavs(cityDetails);
  };

  return (
    <li className={styles.city} onClick={handleShowWeather}>
      {cityDetails.cityName}
    </li>
  );
};

export default FavCity;
