const contacts = require("../db/contacts.json");
const Joi = require("joi");

class ContactController {
  listContacts(req, res) {
    res.json(contacts);
  }
  addContact(req, res) {
    const { body } = req;
    const newContact = {
      id: contacts.length + 1,
      ...body,
    };
    contacts.push(newContact);
    res.json(newContact);
  }
  validateAddContact(req, res, next) {
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
  updateContact = (req, res) => {
    const { id } = req.params;
    // console.log("params ", req.params);

    const contactIndex = this.getContactIndex(id);

    const updatedContact = {
      ...contacts[contactIndex],
      ...req.body,
    };
    contacts[contactIndex] = updatedContact;
    res.json(updatedContact);
  };
  validateUpdateContact = (req, res, next) => {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(404).send(validationResult.error);
    }
    next();
  };
  getContactIndex(id) {
    const contactId = parseInt(id);
    return contacts.findIndex(({ id }) => id === contactId);
  }
  validateContactId = (req, res, next) => {
    const { id } = req.params;
    const contactIndex = this.getContactIndex(id);
    if (contactIndex === -1) {
      return res.status(404).send("Contact is not found");
    }
    next();
  };
  deleteContact = (req, res) => {
    const { id } = req.params;
    const contactIndex = this.getContactIndex(id);
    const deletedContact = contacts.splice(contactIndex, 1);
    res.json(deletedContact);
  };
  getContactById = (req, res) => {
    const {
      params: { id },
    } = req;
    
    const contactIndex = this.getContactIndex(id);
    const deletedContact = contacts[contactIndex];
    res.json(deletedContact);
  };
}

module.exports = new ContactController();
