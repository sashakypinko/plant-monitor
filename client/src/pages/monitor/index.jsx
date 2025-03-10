import {Box, Container, Grid} from "@mui/material";
import Monitor from "../../components/monitor";
import React, {useContext, useMemo} from "react";
import {useParams} from "react-router-dom";
import {SensorDataContext} from "../../App";

const MonitorPage = () => {
  const { id } = useParams();
  const { data } = useContext(SensorDataContext);

  const sensorData = useMemo(() => {
    return id ? data.find((item) => item.id === parseInt(id)) : null;
  }, [id, data]);

  if (!sensorData) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Monitor data={sensorData}/>
    </Container>
  );
};

export default MonitorPage;
