import { useContext } from "react";
import WeatherContext from "../../store/weather-context";
import styles from "./TodayWeather.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import FavsContext from "../../store/favs-context";

const TodayWeather = () => {
  const { weatherData } = useContext(WeatherContext);
  const { favCities, addCityToFavs, removeCityFromFavs } =
    useContext(FavsContext);

  const { cityName, weatherInfo } = weatherData;
  const { temp, feels_like, weather, sunrise, sunset } = weatherInfo.current;
  const iconCode = weather[0].icon;
  const isCityInFavorites = favCities.some(
    (item) => item.cityName === cityName
  );

  const sunriseDate = new Date(sunrise * 1000);
  const sunriseHour = sunriseDate.getHours();
  const sunriseMin = sunriseDate.getMinutes();

  const sunsetDate = new Date(sunset * 1000);
  const sunsetHour = sunsetDate.getHours();
  const sunsetMin = sunsetDate.getMinutes();

  const handleAddToFavs = () => {
    addCityToFavs({
      cityName,
      cityLat: weatherInfo.lat,
      cityLon: weatherInfo.lon,
    });
  };

  const handleRemoveFromFavs = () => {
    removeCityFromFavs({
      cityName,
      cityLat: weatherInfo.lat,
      cityLon: weatherInfo.lon,
    });
  };

  const favIcon = isCityInFavorites ? (
    <FaHeart className={styles.favIcon} size={25} onClick={handleRemoveFromFavs} />
  ) : (
    <FaRegHeart className={styles.favIcon} size={25} onClick={handleAddToFavs} />
  );

  return (
    <div className={styles.weather}>
      <div className={styles.weather__info}>
        <div className={styles.title}>
          <h3>{cityName}</h3>
          {favIcon}
        </div>
        <div className={styles.temp}>
          <h1>{temp.toFixed(0)}</h1>
          <h3>°C</h3>
        </div>
        <div className={styles.sun}>
          <div className={styles.sun__sunrise}>
            <FiSunrise />
            <h4>
              {sunriseHour}:{sunriseMin}
            </h4>
          </div>
          <div className={styles.sun__sunset}>
            <FiSunset />
            <h4>
              {sunsetHour}:{sunsetMin}
            </h4>
          </div>
        </div>
        <div className={styles.description}>
          <h4>{weather[0].description}</h4>
        </div>
        <div>
          <h4>Feels like: {feels_like.toFixed(0)}°C</h4>
        </div>
      </div>
      <div className={styles.weather__image}>
        <img
          src={`http://openweathermap.org/img/wn/${iconCode}@4x.png`}
          alt="weather icon"
        />
      </div>
    </div>
  );
};

export default TodayWeather;
