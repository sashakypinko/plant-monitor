import React, {useContext, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {SensorDataContext} from "../../App";

const SensorSettings = ({ open, selectedSensor, settings, onClose}) => {
  const [formData, setFormData] = useState({});
  const { updateMonitorSettings } = useContext(SensorDataContext);

  useEffect(() => {
    setFormData(settings[selectedSensor] || {});
  }, [selectedSensor, settings]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleClose = () => {
    onClose();
  };
  
  const handleSave = () => {
    updateMonitorSettings(settings._id, {
      ...settings,
      [selectedSensor]: formData,
    }).then(onClose)
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Edit {selectedSensor} settings</DialogTitle>
      <DialogContent sx={{ display: 'flex', gap: 2 }}>
        <TextField
          autoFocus
          required
          margin="dense"
          name="lowThreshold"
          label="Low Threshold"
          type="number"
          value={formData.lowThreshold}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          name="highThreshold"
          label="High Threshold"
          type="number"
          value={formData.highThreshold}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          name="lowAlarm"
          label="Low Alarm"
          type="number"
          value={formData.lowAlarm}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          name="highAlarm"
          label="High Alarm"
          type="number"
          value={formData.highAlarm}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SensorSettings;
