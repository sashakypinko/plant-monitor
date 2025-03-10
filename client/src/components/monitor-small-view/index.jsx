import {Card, Box, Grid, Typography, styled} from "@mui/material";
import {
  WaterDropOutlined,
  DeviceThermostatOutlined,
  LightModeOutlined,
  FilterDramaOutlined,
  SpeedOutlined
} from "@mui/icons-material";
import Sensor from "../sensor";
import React from "react";
import {useNavigate, generatePath} from "react-router-dom";
import {RouteEnum} from "../../routes/enums/route.enum";

const StyledCard = styled(Card)({
  padding: 16,
});

const MonitorSmallView = ({data}) => {
  const navigate = useNavigate();

  return (
    <StyledCard onClick={() => navigate(generatePath(RouteEnum.MONITOR_VIEW, { id: data.id }))}>
      <Typography sx={{mb: 1}} >Air</Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <SpeedOutlined color="info" sx={{fontSize: 20}}/>
          <Sensor lowThreshold={20} highThreshold={25} value={Math.round(data.light)} unit="" small/>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <LightModeOutlined color="info" sx={{fontSize: 20}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={Math.round(data.pressure)} unit="" small/>
        </Box>
      </Box>

      <Box marginTop={3} display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <DeviceThermostatOutlined color="info" sx={{fontSize: 20}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.airTemperature.toFixed(1)} unit="°C" small/>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <WaterDropOutlined color="info" sx={{fontSize: 20}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.light} unit="%" small/>
        </Box>
      </Box>

      <Typography sx={{my: 1}}>Soil</Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <DeviceThermostatOutlined color="success" sx={{fontSize: 20}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.soilTemperature} unit="°C" small/>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <WaterDropOutlined color="success" sx={{fontSize: 20}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.soilMoisture} unit="%" small/>
        </Box>
      </Box>
    </StyledCard>
  );
};

export default MonitorSmallView;
