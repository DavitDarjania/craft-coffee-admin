import styles from "../modules/main-container.module.css";
import bgImg from "../assets/images/coffee-bg.jpg";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className={styles.mainContainer}>
      <nav className={styles.navigation}>
        <Link to={"/"}>Add Coffe</Link>
        <Link to={"/ingredient"}>Add Ingredient</Link>
      </nav>
      <img className={styles.mainImg} src={bgImg} alt="" />
      <Outlet />
    </main>
  );
};

export default Layout;
