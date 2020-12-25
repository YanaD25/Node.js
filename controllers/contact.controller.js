// const contacts = require("../db/contacts.json");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../contacts.js");

class ContactController {
  getContacts(req, res) {
    const data = listContacts();
    if (!data) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(data);
  }
  findContactById(req, res) {
    const data = getContactById(req.params.contactId);
    if (!data) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(data);
  }
  postContact(req, res) {
    const data = addContact(req.body);
    return res.status(201).json(data);
  }
  validatePostContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send("Missing required name field");
    }
    next();
  }

  //delete contact  by ID
  deleteContact(req, res) {
    const data = removeContact(req.params.contactId);
    if (!data) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({ message: "contact deleted" });
  }

  // update contact by ID
  updateContactById(req, res) {
    const data = updateContact(req.params.contactId, req.body);
    if (!data) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(data);
  }
  validateUpdateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const validationResult = validationRules.validate(req.body);
    const isResultEmpty = Object.keys(validationResult.value).length === 0;
    if (isResultEmpty) {
      return res.status(400).send("missing fields");
    }
    next();
  }
  validatePostContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send("Missing required name field");
    }
    next();
  }
}
module.exports = new ContactController();
