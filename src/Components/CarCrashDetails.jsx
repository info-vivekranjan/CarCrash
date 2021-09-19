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
      <section className={styles.crashSection}>
        <header className={styles.crashHeader}>
          <h1>Car Crash Details</h1>
        </header>

        {/* Showing the stored data in "data" array by mapping through it */}

        <section>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : isError ? (
            <h3>Something went wrong...</h3>
          ) : (
            <section>
              {/* Using conditional check so that if that perticular field is not available it will not go for the next step */}

              <h1>Vehicle type code1: {data[0]?.vehicle_type_code1}</h1>
              <h1>Vehicle type code2: {data[0]?.vehicle_type_code2}</h1>
              <h1>Crash date: {data[0]?.crash_date}</h1>
              <h1>Crash time: {data[0]?.crash_time}</h1>
              <h1>On street name: {data[0]?.on_street_name}</h1>
              <h1>
                Contributing factor vehicle 1:{" "}
                {data[0]?.contributing_factor_vehicle_1}
              </h1>
              <h1>
                Contributing factor vehicle 2:{" "}
                {data[0]?.contributing_factor_vehicle_2}
              </h1>
              <h1>
                Number of persons injured: {data[0]?.number_of_persons_injured}
              </h1>
              <h1>
                Number of persons killed: {data[0]?.number_of_persons_killed}
              </h1>
              <h1>
                Number of pedestrians injured:{" "}
                {data[0]?.number_of_pedestrians_injured}
              </h1>
              <h1>
                Number of pedestrians killed:{" "}
                {data[0]?.number_of_pedestrians_killed}
              </h1>
              <h1>
                Number of cyclist injured: {data[0]?.number_of_cyclist_injured}
              </h1>
              <h1>
                Number of cyclist killed: {data[0]?.number_of_cyclist_killed}
              </h1>
              <h1>
                Number of motorist injured:{" "}
                {data[0]?.number_of_motorist_injured}
              </h1>
              <h1>
                Number of motorist killed: {data[0]?.number_of_motorist_killed}
              </h1>
              <h1>
                Number of pedestrians injured:{" "}
                {data[0]?.number_of_pedestrians_injured}
              </h1>
            </section>
          )}
        </section>
      </section>
    </div>
  );
}

export { CarCrashDetails };
