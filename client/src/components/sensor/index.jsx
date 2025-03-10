import {Box, Typography, styled} from "@mui/material";
import CircularProgress, {circularProgressClasses} from '@mui/material/CircularProgress';

function CustomCircularProgress(props) {
  return (
    <Box sx={{position: 'relative'}}>
      <CircularProgress
        variant="determinate"
        sx={(theme) => ({
          color: theme.palette.grey[200],
          ...theme.applyStyles('dark', {
            color: theme.palette.grey[800],
          }),
        })}
        thickness={5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        })}
        thickness={5}
        {...props}
      />
    </Box>
  );
}

const getColor = (lowThreshold, highThreshold, value) => {
  if (value < lowThreshold || value > highThreshold) return 'error';
  if (value < lowThreshold + 4 || value > highThreshold - 4) return 'warning';

  return 'success';
};

const Sensor = ({lowThreshold, highThreshold, value, unit, small = false}) => {
  const color = getColor(lowThreshold, highThreshold, value);

  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CustomCircularProgress
        size={small ? 50 : 128}
        variant="determinate"
        color={color}
        value={value - (highThreshold - lowThreshold)}
        thickness={small ? 3 : 6}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{color: `${color}.main`}} fontSize={small ? 12 : 22} fontWeight={600}>{value}{unit}</Typography>
      </Box>
    </Box>
  );
};

export default Sensor;
