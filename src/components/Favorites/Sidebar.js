import reactDom from "react-dom";
import React, { useContext } from "react";
import FavCity from "./FavCity";
import styles from "./Sidebar.module.css";
import { FiX } from "react-icons/fi";
import FavsContext from "../../store/favs-context";

const SidebarContent = ({ onCloseSidebar }) => {
  const { favCities } = useContext(FavsContext);

  return (
    <>
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
    </>
  );
};

const Sidebar = ({ onCloseSidebar }) => {
  return (
    <>
      {reactDom.createPortal(
        <SidebarContent onCloseSidebar={onCloseSidebar} />,
        document.getElementById("sidebar")
      )}
    </>
  );
};

export default Sidebar;
