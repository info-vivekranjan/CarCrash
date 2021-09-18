import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CarCrashContext } from "../Context/CarCrashContext";
import styles from "./Css/Navbar.module.css";

function Navbar() {
  const { currentTheme, toggleTheme } = useContext(CarCrashContext);

  return (
    <nav className={styles.navCont}>
      <section className={styles.leftNav}>
        <div>
          <Link className={styles.navLogo} to="/">
            Vehicle Crash
          </Link>
        </div>
      </section>

      <section className={styles.rightNav}>
        <div>
          <Link className={styles.DosDont} to="/dos&Don't">
            DO's & Don't
          </Link>
        </div>

        <div>
          <div className={styles.lightModeCont}>
            {currentTheme === "light" && (
              <i onClick={toggleTheme} className="ri-moon-line"></i>
            )}
          </div>

          <div className={styles.darkModeCont}>
            {currentTheme === "dark" && (
              <i onClick={toggleTheme} className="ri-sun-line"></i>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
}

export { Navbar };
