import {Box} from "@mui/material";
import {useContext} from "react";
import {SensorDataContext} from "../../App";
import MonitorSmallView from "../../components/monitor-small-view";

const AllMonitorsPage = () => {
  const { sensorsData } = useContext(SensorDataContext);

  return (
    <Box margin={1} display="grid" gridTemplateColumns="repeat(5, 1fr)" gridTemplateRows="1fr 1fr" gap={1}>
      {
        sensorsData.map((sensorData) => (
          <MonitorSmallView key={sensorData.id} data={sensorData} />
        ))
      }
    </Box>
  );
};

export default AllMonitorsPage;
