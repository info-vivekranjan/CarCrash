import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarCrashContext } from "../Context/CarCrashContext";
import styles from "./Css/CarCrash.module.css";

function CarCrash() {
  const [data, setData] = useState([]); // useState hook for changing the state which is initially empty by using api, will push the data by calling setData function

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsEroor] = useState(false);

  const [page, setPage] = useState(0);

  const { theme } = useContext(CarCrashContext); // exctracting theme using useContext hook by destructuring

  const [showCard, setShowCard] = useState(true); // this is for toggling list to grid view by calling setShowCard(!showCard), which is initially true

  const [query, setQuery] = useState("2021-04-14");

  const getCrashData = (date = "2021-04-14", page = 0) => {
    setIsLoading(true);

    return axios
      .get(
        `https://data.cityofnewyork.us/resource/h9gi-nx95.json?crash_date=${date}T00:00:00.000&$offset=${page}&$limit=15`
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

  // useEffect hook for the after-effects which has the array dependency page to change the pages

  useEffect(() => {
    getCrashData(query, page);
  }, [page]);

  const handleFilter = () => {
    getCrashData(query);
  };

  console.log(data);

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      getCrashData(query);
    }
  };

  return (
    <div className={styles.carCrashCont}>
      <section className={styles.mainImgCont}>
        <div className={styles.backgroundText}>
          <div style={{ color: theme.headerColor }}>
            VEHICAL COLLISION RECORDS
          </div>
        </div>
      </section>

      <header className={styles.headerCont}>
        <h1>Vehical Crash Data</h1>
      </header>

      {/* Using ternery operator for toggling list view to grid by using toggle operator ! */}

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

      <section>
        <div>
          <div style={{ color: "#6C757D" }}>
            Search collision record by date
          </div>
          <div className={styles.filterCont}>
            <input
              placeholder="2014-01-21"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleFilter}>Search</button>
          </div>
        </div>
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
                      <div
                        className={styles.cardLinkCont}
                        style={{ backgroundColor: theme.gridsBackground }}
                      >
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
