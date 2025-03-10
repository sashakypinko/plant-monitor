import {styled, Card, Box, Typography, IconButton} from "@mui/material";
import {WaterDropOutlined, DeviceThermostatOutlined, LightModeOutlined, SpeedOutlined, SettingsOutlined, KeyboardBackspaceRounded} from "@mui/icons-material";
import Sensor from "../sensor";
import {useNavigate} from "react-router-dom";
import React from "react";
import {RouteEnum} from "../../routes/enums/route.enum";

const StyledCard = styled(Box)({
  margin: '8px 0',
  padding: 16,
  color: 'white',
});

const Monitor = ({data}) => {
  const navigate = useNavigate();

  return (
    <StyledCard>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <IconButton size="large" onClick={() => navigate(RouteEnum.MONITORS)}>
          <KeyboardBackspaceRounded fontSize="large" />
        </IconButton>
        <Typography sx={{mb: 2}} variant="h6">Air parameters</Typography>
        <Box sx={{ padding: '29px'}}/>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <LightModeOutlined color="info" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={20} highThreshold={25} value={Math.round(data.light)} unit=""/>
          <IconButton size="large">
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <SpeedOutlined color="info" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={Math.round(data.pressure)} unit=""/>
          <IconButton size="large">
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box marginTop={3} display="flex" alignItems="center" justifyContent="center" gap={4}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <DeviceThermostatOutlined color="info" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.airTemperature.toFixed(1)} unit="°C"/>
          <IconButton size="large">
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <WaterDropOutlined color="info" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.airMoisure} unit="%"/>
          <IconButton size="large">
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Typography sx={{my: 2}} variant="h6" textAlign="center">Soil parameters</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <DeviceThermostatOutlined color="success" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.soilTemperature} unit="°C"/>
          <IconButton size="large">
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <WaterDropOutlined color="success" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={10} highThreshold={30} value={data.soilMoisture} unit="%"/>
          <IconButton size="large">
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </StyledCard>
  );
};

export default Monitor;
