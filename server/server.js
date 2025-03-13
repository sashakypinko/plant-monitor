import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import cors from 'cors';
import 'dotenv/config';
import {connectDB} from "./src/config/db.js";
import monitorRoutes from './src/routes/monitor-routes.js'

const comPort = process.env.COM_PORT || 'COM1';
const baudRate = process.env.BAUD_RATE ? parseInt(process.env.BAUD_RATE) : 115200;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serialPort = new SerialPort({ path: comPort, baudRate });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (data) => {
  try {
    io.emit('sensorData', JSON.parse(data.trim()));
  } catch (error) {
    console.error(error)
    console.error("Error parsing JSON:", error.message);
  }
});

io.on('connection', (socket) => {
  socket.on('controlDevice', (command) => {
    serialPort.write(`${command}\n`);
  });
});

app.use('/api/monitors', monitorRoutes);

server.listen(4000, () => console.log('🚀 Server running on port 4000 with WebSockets!'));
