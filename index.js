const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const contactRoutes = require("./routes/contact.route");

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
    this.server.use("/contacts", contactRoutes);
  }
  listen() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port: ", PORT);
    });
  }
}
const server = new Server();
server.start;

// const  app = express();
// app.use(require('morgan')('dev'));
// app.use(require('cors')());
// app.use(express.json());

// app.listen(PORT, ()=>{
//   console.log('Server is listening on port: ', PORT)
// })
// app.post('/weather', (req, res)=> {
//   console.log('body', req.body);
//   res.json(req.body)
// })

// // TODO: рефакторить
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case 'list':
//       // ...
//       contacts.listContacts();
//       break;

//     case 'get':
//       // ... id
//       contacts.getContactById(id);
//       break;

//     case 'add':
//       // ... name email phone
//       contacts.addContact(name, email, phone);
//       break;

//     case 'remove':
//       // ... id
//       contacts.removeContact(id);
//       break;

//     default:
//       console.warn('\x1B[31m Unknown action type!');
//   }
// }

// invokeAction(argv);
