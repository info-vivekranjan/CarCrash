import React, { createContext, useState } from "react";

const CarCrashContext = createContext();

const themeValue = {
  light: {
    bodyBackground: "white",
    navBackground: "#F6F6F7",
  },
  dark: {
    bodyBackground: "#161625",
    navBackground: "#1E1E30",
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
