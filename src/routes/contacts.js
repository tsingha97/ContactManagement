const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");
const contactValidator = require("../validators/contactValidator");

router.get("/", contactsController.getAllContacts);
router.post(
  "/",
  contactValidator.validateContact,
  contactsController.createContact
);
router.get("/:id", contactsController.getContactById);
router.put(
  "/:id",
  contactValidator.validateContact,
  contactsController.updateContact
);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
