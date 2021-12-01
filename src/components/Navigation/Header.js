import Navbar from "./Navbar";
import { daysOfWeek, months } from "../../data/days-and-months";
import styles from "./Header.module.css";

const Header = () => {
  const today = new Date();

  const todayDayOfMonth = today.getDate();
  const todayMonth = months[today.getMonth()];
  const todayYear = today.getFullYear();
  const todayDayOfWeek = daysOfWeek[today.getDay()];

  return (
    <div className={styles.header}>
      <h4
        className={styles.date}
      >{`${todayDayOfWeek}, ${todayMonth} ${todayDayOfMonth} ${todayYear}`}</h4>
      <Navbar />
    </div>
  );
};

export default Header;
