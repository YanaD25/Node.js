const dotenv = require("dotenv");
const { MongoClient, ObjectID } = require("mongodb");
const express = require("express");
const Joi = require("joi");
dotenv.config();

const DB_NAME = process.env.DB_NAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PASSWORD = "8eeeRVIOMsvQZxQ1";

const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.a5e51.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8080;
let contacts;

async function start() {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db("db-contacts");
  contacts = db.collection("contacts");
  //  const  result = await contacts.find().toArray();
  //  console.log('result', result);

  const server = express();
  server.use(express.json());

  server.get("/contacts", getContacts);
  server.post("/contacts", validateContact, createContact);
  server.put("/contacts/:id", updateContact);
  server.listen(PORT, () => {
    console.log("Server  is listening on port: ", PORT);
  });
}
async function getContacts(req, res) {
  const data = await contacts.find().toArray();
  res.json(data);
}
async function createContact(req, res) {
  const data = await contacts.insertOne(req.body);
  res.json(data);
}
function validateContact(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const validationResult = validationRules.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
}
async function updateContact(req, res) {
  const {
    params: { id },
  } = req;
  if(!ObjectID.isValid(id)) {
      return res.status(400).send('ID is  not valid')
  }
  const result = await contacts.updateOne(
    { _id: ObjectID(id) },
    { $set: req.body }
  );
  console.log("result ", result);
  if(!result.modifiedCount) {
      return res.status(404).send('User is  not found');
  }
  res.json(result);
}
start();
