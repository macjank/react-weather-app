import styles from "./NothingToShow.module.css";

const NothingToShow = () => {
  return (
    <div className={styles.note}>
      <h2>Nothing to show here...</h2>
      <h3>Type a city name to find weather info</h3>
    </div>
  );
};

export default NothingToShow;
