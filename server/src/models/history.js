import mongoose, { Schema } from 'mongoose';

const historySchema = new Schema({
  monitorIndex: [{ type: Number, requird: true }],
  light: { type: Number, default: 0 },
  pressure: { type: Number, default: 0 },
  airTemperature: { type: Number, default: 0 },
  airMoisture: { type: Number, default: 0 },
  soilTemperature: { type: Number, default: 0 },
  soilMoisture: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('History', historySchema);