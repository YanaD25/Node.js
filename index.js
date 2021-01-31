const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const contactRoutes = require("./routes/contact.route");
const  contacts = require('./contacts.js');


const PORT = 8080;
class Server {
  constructor() {
    this.server = null;
  }
  start() {
    this.server = express();
    this.initMiddlewares();
    this.initRoutes();
    this.listen();
  }
  initMiddlewares() {
    this.server.use(cors());
    this.server.use(morgan());
    this.server.use(express.json());
  }
  initRoutes() {
    this.server.use("/api/contacts", contactRoutes);
  }
  listen() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port: ", PORT);
    });
  }
}
const server = new Server();
server.start();

