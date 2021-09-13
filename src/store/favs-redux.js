import { configureStore, createSlice } from "@reduxjs/toolkit";

export const favsSlice = createSlice({
  name: "favs",
  initialState: { favs: [] },
  reducers: {
    addCityToFavs(state, action) {
      state.favs.push(action.payload);
    },
    removeCityFromFavs(state, action) {
      const { cityName, cityLat, cityLon } = action.payload;
      state.favs = state.favs.filter(
        item =>
          item.cityName !== cityName &&
          item.cityLat !== cityLat &&
          item.cityLon !== cityLon
      );
    },
    replaceAllFavs(state, action) {
      state.favs = action.payload;
    },
  },
});

export const getFavsFromStorage = () => {
  return dispatch => {
    const localFavCities = localStorage.getItem("favCities");
    if (!localFavCities) return;

    dispatch(favsActions.replaceAllFavs(JSON.parse(localFavCities)));
  };
};

export const setFavsInStorage = favs => {
  return () => {
    localStorage.setItem("favCities", JSON.stringify(favs));
  };
};

const store = configureStore({ reducer: favsSlice.reducer });

export const favsActions = favsSlice.actions;

export default store;
