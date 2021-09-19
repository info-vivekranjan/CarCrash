import React, { createContext, useState } from "react";

const CarCrashContext = createContext(); //Context Api for creating context so that data can be transfer from this file to all the componenets

const themeValue = {
  light: {
    bodyBackground: "white",
    navBackground: "#F6F6F7",
    bodyBackgroundCrashDetails: "#f3f7f7",
  },
  dark: {
    bodyBackground: "#0E141E",
    navBackground: "#1E1E30",
    bodyBackgroundCrashDetails: "#0E141E",
    tableBorder: "1px solid #003c80",
    tableBorderBottom: "none",
    tableBorderTop: "none",
    headerColor: "#c4c4c4",
    gridsBackground: "#0E141E",
    gridBackground: "#161625",
  },
};

function CarCrashContextProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("light"); // useState hook to change the state at anytime we call setCurrentTheme it will change the theme form light to dark

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  const value = {
    // this is data which is given to the value attribute of CarCrashContext.Provider so that we can use it by extracting using useContext hook in the other components
    currentTheme,
    toggleTheme,
    theme: themeValue[currentTheme],
  };

  return (
    // Context Provider to provide data to its children components

    <CarCrashContext.Provider value={value}>
      {children}
    </CarCrashContext.Provider>
  );
}
export { CarCrashContextProvider, CarCrashContext };
