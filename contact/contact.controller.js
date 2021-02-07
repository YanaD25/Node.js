const {
  Types: { ObjectId },
} = require("mongoose");

const Contact = require("./Contact");
const Joi = require("joi");

async function getContacts(req, res) {
  const data = await Contact.find();
  res.json(data);
}
function validateContactID(req, res, next) {
  const {
    params: { id },
  } = req;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("ID is  not valid");
  }
  next();
}
async function getContact(req, res) {
  const {
    params: { id },
  } = req;
  const data = await Contact.findById(id);
  if (!data) {
    return res.status(404).send("User is  not found");
  }
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

async function createContact(req, res) {
  try {
    const data = await Contact.create(req.body);
    return res.status(201).json(data);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Email is duplicated");
    }
  }
  res.json(data);
}
async function updateContact(req, res) {
  const {
    params: { id },
  } = req;

  const result = await Contact.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );

  if (!result) {
    return res.status(404).send("User is  not found");
  }
  res.json(result);
}
async function deleteContact(req, res) {
  const {
    params: { id },
  } = req;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).send("User is  not found");
  }
  res.json(result);
}
module.exports = {
  getContacts,
  getContact,
  validateContactID,
  validateContact,
  createContact,
  updateContact,
  deleteContact,
};
