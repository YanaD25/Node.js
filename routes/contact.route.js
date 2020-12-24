const { Router } = require("express");
// const  contacts = require('../contacts.js');
const ContactController = require("../controllers/contact.controller");
const router = Router();

router.get("/", ContactController.listContacts);
router.get(
  "/:id",
  ContactController.validateContactId,
  ContactController.getContactById
);
router.post(
  "/",
  ContactController.validateAddContact,
  ContactController.addContact
);
router.delete(
  "/:id",
  ContactController.validateContactId,
  ContactController.deleteContact
);
router.patch(
  "/:id",
  ContactController.validateContactId,
  ContactController.validateUpdateContact,
  ContactController.updateContact
);

module.exports = router;
