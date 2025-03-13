import React, {useState, useEffect, createContext} from "react";
import io from "socket.io-client";
import Monitor from "./components/monitor";
import {HashRouter as Router} from 'react-router-dom';
import {Container, Grid, ThemeProvider, createTheme} from "@mui/material";
import Routes from "./routes/routes";
import {MonitorApi} from "./services/monitor-service";

const socket = io("http://localhost:4000");

export const SensorDataContext = createContext({
  sensorsData: [],
  monitorSettings: [],
  fetchMonitorSettings: async () => {},
  updateMonitorSettings: async () => {},
});

function App() {
  const [sensorsData, setSensorsData] = useState([]);
  const [monitorSettings, setMonitorSettings] = useState([]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const fetchMonitorSettings = async () => {
    try {
       const monitorSettings = await MonitorApi.getAll();
      setMonitorSettings(monitorSettings);
    } catch (e) {
      console.error(e);
    }
  }
  
  const updateMonitorSettings = async (id, data) => {
    try {
      await MonitorApi.update(id, data);
      await fetchMonitorSettings();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMonitorSettings();
    
    socket.on("sensorData", (newData) => {
      setSensorsData(newData);
    });

    return () => socket.off("sensorData");
  }, []);

  return (
    <SensorDataContext.Provider value={{sensorsData, monitorSettings, fetchMonitorSettings, updateMonitorSettings }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes/>
        </Router>
      </ThemeProvider>
    </SensorDataContext.Provider>
  );
}

export default App;
