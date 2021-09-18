import React from "react";
import styles from "./Css/CarCrash.module.css";

function CarCrash() {
  return (
    <div className={styles.carCrashCont}>
      <header className={styles.headerCont}>
        <h1>Car Crash Data</h1>
      </header>
    </div>
  );
}

export { CarCrash };
