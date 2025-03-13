import mongoose, { Schema } from 'mongoose';

const sensorParamsSchema = {
  type: Object,
  schema: {
    lowThreshold: {type: Number, default: 0},
    highThreshold: {type: Number, default: 0},
    lowAlarm: {type: Number, default: 0},
    highAlarm: {type: Number, default: 0},
  }
};

const monitorSchema = new Schema({
  monitorIndex: {type: Number, required: true, unique: true},
  light: sensorParamsSchema,
  pressure: sensorParamsSchema,
  airTemperature: sensorParamsSchema,
  airMoisture: sensorParamsSchema,
  soilTemperature: sensorParamsSchema,
  soilMoisture: sensorParamsSchema,
}, {timestamps: true});

export default mongoose.model('Monitor', monitorSchema);