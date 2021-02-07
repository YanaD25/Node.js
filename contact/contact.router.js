const { Router } = require("express");
const ContactController = require("./contact.controller");
const router = Router();

router.get("/", ContactController.getContacts);
router.get(
  "/:id",
  ContactController.validateContactID,
  ContactController.getContact
);
router.post(
  "/",
  ContactController.validateContact,
  ContactController.createContact
);
router.put(
  "/:id",
  ContactController.validateContactID,
  ContactController.updateContact
);
router.delete(
  "/:id",
  ContactController.validateContactID,
  ContactController.deleteContact
);

module.exports = router;
