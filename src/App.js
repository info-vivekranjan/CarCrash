import "./App.css";
import { Routes } from "./Components/Routes";
import { useContext } from "react";
import { CarCrashContext } from "./Context/CarCrashContext";

function App() {
  const { theme } = useContext(CarCrashContext);

  return (
    <div className="App" style={{ backgroundColor: theme.bodyBackground }}>
      <Routes />
    </div>
  );
}

export default App;
