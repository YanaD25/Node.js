const { Router } = require("express");
const ContactController = require("../controllers/contact.controller");
const router = Router();

router.get("/", ContactController.getContacts);

module.exports = router;
