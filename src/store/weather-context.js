import { createContext, useEffect, useState } from "react";

const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
  const [enteredCity, setEnteredCity] = useState("");
  const [doesEnteredCityExist, setDoesEnteredCityExist] = useState(false);
  const [latestCityData, setLatestCityData] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  const key = "9ef060e62bc06bb67fe0a2849a8215a8";

  //function for checking if entered city name is correct and setting the coords for this city
  const fetchCityCoords = async ({ name, key }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=metric`
      );

      if (response.ok) {
        const responseData = await response.json();
        setDoesEnteredCityExist(true);

        setLatestCityData({
          cityName: responseData.name,
          cityLat: responseData.coord.lat,
          cityLon: responseData.coord.lon,
        });
      } else {
        setDoesEnteredCityExist(false);
        setLatestCityData(null);
        throw Error("Incorrect city name");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //function for fetching the weather data using the coords established previously
  const fetchWeatherData = async ({
    cityLon,
    cityLat,
    cityName = latestCityData.cityName,
  }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude={part}&appid=${key}&units=metric`
      );

      if (response.ok) {
        const responseData = await response.json();
        const dataFormated = {
          cityName,
          weatherInfo: responseData,
        };
        setWeatherData(dataFormated);
      } else {
        throw Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (enteredCity.trim() === "") return;
    fetchCityCoords({ name: enteredCity, key });
  }, [enteredCity]);

  const onChangeEnteredCity = value => {
    setEnteredCity(value);
  };

  const reset = () => {
    setEnteredCity("");
    setDoesEnteredCityExist(false);
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
    enteredCity,
    onChangeEnteredCity,
    doesEnteredCityExist,
    onShowWeatherFromSearchForm,
    weatherData,
    onShowWeatherFromFavs,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
