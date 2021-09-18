import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Css/CarCrash.module.css";

function CarCrash() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsEroor] = useState(false);

  const getCrashData = () => {
    setIsLoading(true);

    return axios
      .get(`https://data.cityofnewyork.us/resource/h9gi-nx95.json`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsEroor(true);
        setIsLoading(false);
      })
      .finally(() => {
        setIsEroor(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCrashData();
  }, []);

  return (
    <div className={styles.carCrashCont}>
      <header className={styles.headerCont}>
        <h1>Car Crash Data</h1>

        <section>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : isError ? (
            <h3>Something went wrong...</h3>
          ) : (
            <section>
              <div className={styles.tableHeader}>
                <div>Car type - 1</div>
                <div>Car type - 2</div>
                <div>Crash Date</div>
                <div>Crash Time</div>
              </div>
              <div>
                {data.map((item) => {
                  return (
                    <Link
                      key={item.collision_id}
                      className={styles.tableRows}
                      to={item.collision_id}
                    >
                      <div>{item.vehicle_type_code1}</div>
                      <div>{item.vehicle_type_code2}</div>
                      <div>{item.crash_date}</div>
                      <div>{item.crash_time}</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </section>
      </header>
    </div>
  );
}

export { CarCrash };
