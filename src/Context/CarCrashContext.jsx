import React, { createContext, useState } from "react";

const CarCrashContext = createContext();

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
  },
};

function CarCrashContextProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  const value = {
    currentTheme,
    toggleTheme,
    theme: themeValue[currentTheme],
  };

  return (
    <CarCrashContext.Provider value={value}>
      {children}
    </CarCrashContext.Provider>
  );
}
export { CarCrashContextProvider, CarCrashContext };
