import reactDom from "react-dom";
import React, { useContext } from "react";
import FavContext from "../store/fav-context";
import FavCity from "./FavCity";
import styles from "./Sidebar.module.css";
import { FiX } from "react-icons/fi";

const SidebarContent = ({ onCloseSidebar }) => {
  const { favCities } = useContext(FavContext);

  return (
    <React.Fragment>
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Favorites</h2>
        <ul className={styles.cities}>
          {favCities.map((item, index) => {
            return (
              <FavCity
                key={index}
                cityDetails={item}
                onCloseSidebar={onCloseSidebar}
              />
            );
          })}
        </ul>
        <FiX size={80} className={styles.closeBtn} onClick={onCloseSidebar} />
      </aside>
    </React.Fragment>
  );
};

const Sidebar = ({ onCloseSidebar }) => {
  return (
    <React.Fragment>
      {reactDom.createPortal(
        <SidebarContent onCloseSidebar={onCloseSidebar} />,
        document.getElementById("sidebar")
      )}
    </React.Fragment>
  );
};

export default Sidebar;
