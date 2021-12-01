import { useContext, useEffect, useState } from "react";
import WeatherContext from "../../store/weather-context";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const {
    doesCityNameExist,
    fetchCityCoords,
    onShowWeatherFromSearchForm,
  } = useContext(WeatherContext);

  //local state for form input
  const [enteredCity, setEnteredCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //we can submit only if the coords for provided city name are OK (if this city exists)
    if (!doesCityNameExist) return;

    onShowWeatherFromSearchForm();
    setEnteredCity("");
  };

  const handleChangeEnteredCity = (e) => {
    setEnteredCity(e.target.value);
  };

  //we fetch city data while user enteres some city name
  useEffect(() => {
    if (enteredCity.trim() === "") return;

    //timeout is set up to avoid to many request
    const timeout = setTimeout(() => fetchCityCoords(enteredCity), 500);
    return () => clearTimeout(timeout);
  }, [enteredCity, fetchCityCoords]);

  const alertMessage = doesCityNameExist ? "Show weather" : "No results";
  const isSuccess = doesCityNameExist ? styles["alert--success"] : "";

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={enteredCity}
          onChange={handleChangeEnteredCity}
          placeholder="Enter a city name"
        />
      </form>
      {enteredCity.trim() !== "" && (
        <div className={`${styles.alert} ${isSuccess}`} onClick={handleSubmit}>
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
