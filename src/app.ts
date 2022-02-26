import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from 'morgan'
import process from "process";

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json({limit: '31mb'}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());// Implement CORS

dotenv.config()


process.on('uncaughtException', err => {// uncaught exceptions are meant to stop the server
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});



const port = process.env.PORT || 5100;
const server = app.listen(port, () => {
  console.log(`Server Running on Port: http://localhost:${port}\n`);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(reason, promise);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
