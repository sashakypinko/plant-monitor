import {Box, Container, Grid} from "@mui/material";
import Monitor from "../../components/monitor";
import React, {useContext, useMemo} from "react";
import {useParams} from "react-router-dom";
import {SensorDataContext} from "../../App";

const MonitorPage = () => {
  const { id } = useParams();
  const { sensorsData, monitorSettings } = useContext(SensorDataContext);

  const data = useMemo(() => {
    return id ? sensorsData.find((item) => item.id === parseInt(id)) : null;
  }, [id, sensorsData]);

  const settings = useMemo(() => {
    return id ? monitorSettings.find((item) => item.monitorIndex === parseInt(id)) : null;
  }, [id, monitorSettings]);

  if (!data || !settings) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Monitor data={data} settings={settings}/>
    </Container>
  );
};

export default MonitorPage;
