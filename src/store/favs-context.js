import { createContext, useEffect, useState } from "react";

let firstRun = true;

const FavsContext = createContext();

export const FavsContextProvider = ({ children }) => {
  const [favCities, setFavCities] = useState([]);

  const addCityToFavs = (cityData) => {
    setFavCities((prevCities) => [...prevCities, cityData]);
  };

  const removeCityFromFavs = ({ cityName, cityLat, cityLon }) => {
    const currentCities = [...favCities];
    const newCities = currentCities.filter(
      (city) =>
        city.cityName !== cityName &&
        city.cityLat !== cityLat &&
        city.cityLon !== cityLon
    );

    setFavCities(newCities);
  };

  const getFavCitiesFromStorage = () => {
    const localFavCities = localStorage.getItem("favCities");
    if (!localFavCities) return;

    setFavCities(JSON.parse(localFavCities));
  };

  //checking local storage for favorite cities at the app start
  useEffect(() => {
    getFavCitiesFromStorage();
  }, []);

  //updating local storage every time user modify the favCities
  useEffect(() => {
    if (firstRun) {
      firstRun = false;
      return;
    }

    localStorage.setItem("favCities", JSON.stringify(favCities));
  }, [favCities]);

  const contextValue = {
    favCities,
    addCityToFavs,
    removeCityFromFavs,
  };

  return (
    <FavsContext.Provider value={contextValue}>{children}</FavsContext.Provider>
  );
};

export default FavsContext;
