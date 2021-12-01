import styles from "./NothingToShow.module.css";

const NothingToShow = () => {
  return (
    <div className={styles.note}>
      <h3>Nothing to show here...</h3>
      <h4>Type a city name to find weather info</h4>
    </div>
  );
};

export default NothingToShow;
