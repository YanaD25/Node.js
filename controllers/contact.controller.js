// const contacts = require('../models/contact');
const Joi = require('joi');
class ContactController {
  getContacts(req, res) {
    res.json('contacts');
  }
}

module.exports = new ContactController();
