import { useContext } from "react";
import WeatherContext from "../store/weather-context";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const { enteredCity, onChangeEnteredCity, doesEnteredCityExist, onShowWeatherFromSearchForm } = useContext(WeatherContext);

  const handleSubmit = e => {
    e.preventDefault();
    onShowWeatherFromSearchForm();
  };

  const handleChangeEnteredCity = e => {
    onChangeEnteredCity(e.target.value);
  };

  const alertMessage = doesEnteredCityExist ? "Show weather" : "No results";
  const isSuccess = doesEnteredCityExist ? styles["alert--success"] : "";

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
