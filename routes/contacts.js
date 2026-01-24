/* ***************************
 *  routes/contacts.js
 * ************************** */
const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

// GET /contacts
router.get("/", contactsController.getContacts);

// GET /contacts/:id
router.get("/:id", contactsController.getContactById);

// POST /contacts
router.post("/", contactsController.createContact);

// DELETE /contacts/:id
router.delete("/:id", contactsController.deleteContact);

// PUT /contacts/:id
router.put("/:id", contactsController.updateContact);

module.exports = router;
