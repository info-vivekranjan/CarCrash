import React from "react";
import { Route, Switch } from "react-router";
import { CarCrash } from "./CarCrash";
import { Navbar } from "./Navbar";
function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Navbar />
        <CarCrash />
      </Route>

      <Route>
        <Navbar />
        <div style={{ textAlign: "center", paddingTop: "35vh" }}>
          <h3>404 | Page Not Found</h3>
        </div>
      </Route>
    </Switch>
  );
}

export { Routes };
