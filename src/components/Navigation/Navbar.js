import styles from "./Navbar.module.css";
import SearchForm from "./SearchForm";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Sidebar from "../Favorites/Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <SearchForm />
      <FiMenu className={styles.menu} size={30} onClick={handleOpenSidebar} />
      {isSidebarOpen && <Sidebar onCloseSidebar={handleCloseSidebar} />}
    </nav>
  );
};

export default Navbar;
