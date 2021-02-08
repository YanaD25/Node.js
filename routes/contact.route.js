const { Router } = require("express");
const ContactController = require("../controllers/contact.controller");
const router = Router();

//get all contacts:
router.get("/", ContactController.getContacts);

// //get contact by ID:
router.get(
  "/:contactId",
  ContactController.findContactById
);

// //post contact:
router.post(
  "/",
  ContactController.validatePostContact,
  ContactController.postContact
);
// //delete contact by id:
router.delete(
  "/:contactId",
  ContactController.deleteContact
);
// //update contact by id:
router.patch(
  "/:contactId",
  ContactController.validateUpdateContact,
  ContactController.updateContactById
);

module.exports = router;
