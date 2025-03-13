import {styled, Card, Box, Typography, IconButton} from "@mui/material";
import {WaterDropOutlined, DeviceThermostatOutlined, LightModeOutlined, SpeedOutlined, SettingsOutlined, KeyboardBackspaceRounded} from "@mui/icons-material";
import Sensor from "../sensor";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {RouteEnum} from "../../routes/enums/route.enum";
import SensorSettings from "../sensor-settings";
import {SensorDataContext} from "../../App";

const StyledCard = styled(Box)({
  margin: '8px 0',
  padding: 16,
  color: 'white',
});

const Monitor = ({data, settings}) => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  
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
          <Sensor lowThreshold={settings.light.lowThreshold} highThreshold={settings.light.highThreshold} value={Math.round(data.light)} unit=""/>
          <IconButton size="large" onClick={() => setSelectedSensor('light')}>
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <SpeedOutlined color="info" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={settings.pressure.lowThreshold} highThreshold={settings.pressure.highThreshold} value={Math.round(data.pressure)} unit=""/>
          <IconButton size="large" onClick={() => setSelectedSensor('pressure')}>
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box marginTop={3} display="flex" alignItems="center" justifyContent="center" gap={4}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <DeviceThermostatOutlined color="info" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={settings.airTemperature.lowThreshold} highThreshold={settings.airTemperature.highThreshold} value={data.airTemperature.toFixed(1)} unit="°C"/>
          <IconButton size="large" onClick={() => setSelectedSensor('airTemperature')}>
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <WaterDropOutlined color="info" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={settings.airMoisture.lowThreshold} highThreshold={settings.airMoisture.highThreshold} value={data.airMoisture} unit="%"/>
          <IconButton size="large" onClick={() => setSelectedSensor('airMoisture')}>
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Typography sx={{my: 2}} variant="h6" textAlign="center">Soil parameters</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <DeviceThermostatOutlined color="success" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={settings.soilTemperature.lowThreshold} highThreshold={settings.soilTemperature.highThreshold} value={data.soilTemperature} unit="°C"/>
          <IconButton size="large" onClick={() => setSelectedSensor('soilTemperature')}>
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <WaterDropOutlined color="success" sx={{fontSize: 64}}/>
          <Sensor lowThreshold={settings.soilMoisture.lowThreshold} highThreshold={settings.soilMoisture.highThreshold} value={data.soilMoisture} unit="%"/>
          <IconButton size="large" onClick={() => setSelectedSensor('soilMoisture')}>
            <SettingsOutlined fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <SensorSettings open={!!selectedSensor} selectedSensor={selectedSensor} settings={settings} onClose={() => setSelectedSensor(null)} />
    </StyledCard>
  );
};

export default Monitor;
