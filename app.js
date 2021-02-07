const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const contactRouter = require("./Contact/contact.router");

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.a5e51.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8080;
let server;
start();
function start() {
  initServer();
  initMiddlewares();
  declareRoutes();
  connectDatabase();
  listen();
}
function initServer() {
  server = express();
}
function initMiddlewares() {
  server.use(express.json());
}
function declareRoutes() {
  server.use("/contacts", contactRouter);
}

async function connectDatabase() {
  try{
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
    
  } catch(error){
    console.log(error);
    process.exit(1);
  } 
}
function listen() {
  server.listen(PORT, () => {
    console.log(
      "Server is listening on port: ",
      PORT
    );
  });
}
