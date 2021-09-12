import { createContext, useEffect, useState } from "react";

const FavContext = createContext({
  favCities: [],
});

export const FavContextProvider = ({ children }) => {
  const [favCities, setFavCities] = useState([]);

  //initial updating favCities depending on the local storage
  useEffect(() => {
    const localFavCities = localStorage.getItem("favCities");
    setFavCities(localFavCities ? JSON.parse(localFavCities) : []);
  }, []);

  //updating the local storage after state changes
  useEffect(() => {
    localStorage.setItem("favCities", JSON.stringify(favCities));
  }, [favCities]);

  const onAddToFavs = addedItem => {
    setFavCities(prevItems => [...prevItems, addedItem]);
  };

  const onRemoveFromFavs = ({ cityName, cityLat, cityLon }) => {
    console.log("pizda");
    const currentItems = [...favCities];
    const newFavCities = currentItems.filter(
      item =>
        item.cityName !== cityName &&
        item.cityLat !== cityLat &&
        item.cityLon !== cityLon
    );
    setFavCities(newFavCities);
  };

  const contextValue = {
    favCities,
    onAddToFavs,
    onRemoveFromFavs,
  };

  return (
    <FavContext.Provider value={contextValue}>{children}</FavContext.Provider>
  );
};

export default FavContext;
