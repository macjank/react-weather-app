import { createContext, useState } from "react";

const API_KEY = "9ef060e62bc06bb67fe0a2849a8215a8";

const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
  const [doesCityNameExist, setDoesCityNameExist] = useState(false);
  const [latestCityData, setLatestCityData] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  //function is checking if entered city name is correct (if exists)
  //and setting the coords for this city
  const fetchCityCoords = async (name) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        setDoesCityNameExist(false);
        setLatestCityData(null);
        throw Error("Incorrect city name");
      }

      const responseData = await response.json();
      setDoesCityNameExist(true);

      setLatestCityData({
        cityName: responseData.name,
        cityLat: responseData.coord.lat,
        cityLon: responseData.coord.lon,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //function for fetching the weather data using the coords established previously
  //parameter 'cityName' has default value, bc the function can be called in two ways:
  //from search bar or by clicking the favorite city
  const fetchWeatherData = async ({
    cityLon,
    cityLat,
    cityName = latestCityData.cityName,
  }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude={part}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw Error("Something went wrong");
      }

      const responseData = await response.json();
      const dataFormated = {
        cityName,
        weatherInfo: responseData,
      };
      setWeatherData(dataFormated);
    } catch (error) {
      console.log(error.message);
    }
  };

  const reset = () => {
    setDoesCityNameExist(false);
    setLatestCityData(null);
  };

  const onShowWeatherFromSearchForm = () => {
    fetchWeatherData({
      cityLon: latestCityData.cityLon,
      cityLat: latestCityData.cityLat,
    });
    reset();
  };

  const onShowWeatherFromFavs = ({ cityName, cityLat, cityLon }) => {
    fetchWeatherData({ cityName, cityLon, cityLat });
    reset();
  };

  const contextValue = {
    fetchCityCoords,
    doesCityNameExist,
    weatherData,
    onShowWeatherFromSearchForm,
    onShowWeatherFromFavs,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
