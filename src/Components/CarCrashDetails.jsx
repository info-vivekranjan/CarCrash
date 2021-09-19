import React, { useContext } from "react";
import axios from "axios";
import styles from "./Css/CarCrashDetails.module.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { CarCrashContext } from "../Context/CarCrashContext";

function CarCrashDetails() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsEroor] = useState(false);
  const { id } = useParams(); // useParam hook for exctracting id which is getting from the api

  const { theme } = useContext(CarCrashContext);

  const getCrashData = () => {
    setIsLoading(true);

    return axios
      .get(
        `https://data.cityofnewyork.us/resource/h9gi-nx95.json/?collision_id=${id}`
      )
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

  console.log(data[0]);

  return (
    <div
      className={styles.crashDetailsCont}
      style={{ backgroundColor: theme.bodyBackgroundCrashDetails }}
    >
      <section
        className={styles.crashSection}
        style={{ backgroundColor: theme.gridBackground }}
      >
        <header className={styles.crashHeader}>
          <h1>Vehical Crash Details</h1>
        </header>

        {/* Showing the stored data in "data" array by mapping through it */}

        <section>
          {isLoading ? (
            <h3 style={{ width: "15%", margin: "auto" }}>Loading...</h3>
          ) : isError ? (
            <h3>Something went wrong...</h3>
          ) : (
            <section
              className={styles.detailsTable}
              style={{ backgroundColor: theme.gridBackground }}
            >
              {/* Using conditional check so that if that perticular field is not available it will not go for the next step */}

              <div className={styles.deatilsHeader}>
                <span>Title</span>
                <span>Data</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Vehicle type code1</span>
                <span>{data[0]?.vehicle_type_code1}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Vehicle type code2</span>
                <span>{data[0]?.vehicle_type_code2}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Crash date</span>
                <span>{data[0]?.crash_date}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Crash time</span>
                <span>{data[0]?.crash_time}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>On street name</span>
                <span>{data[0]?.on_street_name}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Contributing factor vehicle 1</span>
                <span>{data[0]?.contributing_factor_vehicle_1}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Contributing factor vehicle 2</span>
                <span>{data[0]?.contributing_factor_vehicle_2}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of persons injured</span>
                <span>{data[0]?.number_of_persons_injured}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of persons killed</span>
                <span>{data[0]?.number_of_persons_killed}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of pedestrians injured</span>
                <span>{data[0]?.number_of_pedestrians_injured}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of pedestrians killed</span>
                <span>{data[0]?.number_of_pedestrians_killed}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of cyclist injured</span>
                <span>{data[0]?.number_of_cyclist_injured}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of cyclist killed</span>
                <span>{data[0]?.number_of_cyclist_killed}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of motorist injured</span>
                <span>{data[0]?.number_of_motorist_injured}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of motorist killed</span>
                <span>{data[0]?.number_of_motorist_killed}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of pedestrians injured</span>
                <span>{data[0]?.number_of_pedestrians_injured}</span>
              </div>

              <div className={styles.deatilsRow}>
                <span>Number of pedestrians killed</span>
                <span>{data[0]?.number_of_pedestrians_killed}</span>
              </div>
            </section>
          )}
        </section>
      </section>
    </div>
  );
}

export { CarCrashDetails };
