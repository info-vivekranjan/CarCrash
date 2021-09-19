import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarCrashContext } from "../Context/CarCrashContext";
import styles from "./Css/CarCrash.module.css";

import collision1 from "./Img/collision1.jpg";

function CarCrash() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsEroor] = useState(false);

  const [page, setPage] = useState(0);

  const { theme } = useContext(CarCrashContext);

  const [showCard, setShowCard] = useState(true);

  const getCrashData = (page = 0) => {
    setIsLoading(true);

    return axios
      .get(
        `https://data.cityofnewyork.us/resource/h9gi-nx95.json?&$offset=${page}&$limit=15`
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
    getCrashData(page);
  }, [page]);

  return (
    <div className={styles.carCrashCont}>
      <section className={styles.mainImgCont}>
        <div className={styles.backgroundText}>
          <div style={{ color: theme.headerColor }}>VEHICAL COLLISION DATA</div>
        </div>
      </section>

      <header className={styles.headerCont}>
        <h1>Vehical Crash Data</h1>
      </header>

      <section className={styles.showCardCont}>
        {showCard ? (
          <div className={styles.showCardGrid}>
            <i
              onClick={() => setShowCard(!showCard)}
              className="ri-layout-grid-fill"
            ></i>
          </div>
        ) : (
          <div className={styles.showCardRow}>
            <i
              onClick={() => setShowCard(!showCard)}
              className="ri-layout-row-fill"
            ></i>
          </div>
        )}
      </section>

      <>
        {showCard ? (
          <section>
            {isLoading ? (
              <h3>Loading...</h3>
            ) : isError ? (
              <h3>Something went wrong...</h3>
            ) : (
              <section>
                <div
                  className={styles.tableHeader}
                  style={{ border: theme.tableBorder }}
                >
                  <div style={{ border: theme.tableBorder }}>Car type - 1</div>
                  <div style={{ border: theme.tableBorder }}>Car type - 2</div>
                  <div style={{ border: theme.tableBorder }}>Crash Date</div>
                  <div style={{ border: theme.tableBorder }}>Crash Time</div>
                </div>
                <div>
                  {data.map((item) => {
                    return (
                      <Link
                        key={item.collision_id}
                        className={styles.tableRows}
                        to={item.collision_id}
                        style={{
                          border: theme.tableBorder,
                          borderBottom: theme.tableBorderBottom,
                          borderTop: theme.tableBorderTop,
                        }}
                      >
                        <div style={{ border: theme.tableBorder }}>
                          {item.vehicle_type_code1}
                        </div>
                        <div style={{ border: theme.tableBorder }}>
                          {item.vehicle_type_code2}
                        </div>
                        <div style={{ border: theme.tableBorder }}>
                          {item.crash_date}
                        </div>
                        <div style={{ border: theme.tableBorder }}>
                          {item.crash_time}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className={styles.paginationCont}>
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 15)}
                  >
                    Prev
                  </button>

                  <button onClick={() => setPage(page + 15)}>Next</button>
                </div>
              </section>
            )}
          </section>
        ) : (
          <section>
            {isLoading ? (
              <h3>Loading...</h3>
            ) : isError ? (
              <h3>Something went wrong...</h3>
            ) : (
              <section>
                <div className={styles.cardCont}>
                  {data.map((item) => {
                    return (
                      <div className={styles.cardLinkCont}>
                        <Link
                          key={item.collision_id}
                          to={item.collision_id}
                          className={styles.cardLink}
                        >
                          <div>Car type -1 : {item.vehicle_type_code1}</div>
                          <div>Car type -2 : {item.vehicle_type_code2}</div>
                          <div>Crash date : {item.crash_date}</div>
                          <div>Crash time: {item.crash_time}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.paginationCont}>
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 15)}
                  >
                    Prev
                  </button>

                  <button onClick={() => setPage(page + 15)}>Next</button>
                </div>
              </section>
            )}
          </section>
        )}
      </>
    </div>
  );
}

export { CarCrash };
