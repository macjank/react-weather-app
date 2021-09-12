import { useContext, useEffect, useCallback } from "react";
import WeatherContext from "../store/weather-context";
import styles from "./TodayWeather.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import FavContext from "../store/fav-context";

const TodayWeather = () => {
  const { weatherData } = useContext(WeatherContext);
  const { cityName, weatherInfo } = weatherData;
  const { temp, feels_like, weather, sunrise, sunset } = weatherInfo.current;
  const iconCode = weather[0].icon;

  console.log(weatherData);

  const { favCities, onAddToFavs, onRemoveFromFavs } = useContext(FavContext);
  const isCityInFavorites = favCities.some(item => item.cityName === cityName);

  const sunriseDate = new Date(sunrise * 1000);
  const sunriseHour = sunriseDate.getHours();
  const sunriseMin = sunriseDate.getMinutes();

  const sunsetDate = new Date(sunset * 1000);
  const sunsetHour = sunsetDate.getHours();
  const sunsetMin = sunsetDate.getMinutes();

  const favIcon = isCityInFavorites ? (
    <FaHeart
      size={25}
      onClick={() =>
        onRemoveFromFavs({
          cityName,
          cityLat: weatherInfo.lat,
          cityLon: weatherInfo.lon,
        })
      }
    />
  ) : (
    <FaRegHeart
      size={25}
      onClick={() =>
        onAddToFavs({
          cityName,
          cityLat: weatherInfo.lat,
          cityLon: weatherInfo.lon,
        })
      }
    />
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
