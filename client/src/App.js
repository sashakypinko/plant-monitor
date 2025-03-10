import React, {useState, useEffect, createContext} from "react";
import io from "socket.io-client";
import Monitor from "./components/monitor";
import {BrowserRouter as Router} from 'react-router-dom';
import {Container, Grid, ThemeProvider, createTheme} from "@mui/material";
import Routes from "./routes/routes";

const socket = io("http://localhost:4000");

export const SensorDataContext = createContext({
  data: [],
});

function App() {
  const [data, setData] = useState([]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    socket.on("sensorData", (newData) => {
      setData(newData);
    });

    return () => socket.off("sensorData");
  }, []);

  const sendCommand = (command) => {
    socket.emit("controlDevice", command);
  };

  return (
    <SensorDataContext.Provider value={{data}}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes/>
        </Router>
      </ThemeProvider>
    </SensorDataContext.Provider>
  );
}

export default App;
