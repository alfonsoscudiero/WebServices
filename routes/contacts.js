/* ***************************
 *  routes/contacts.js
 * ************************** */
const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

// GET /contacts
router.get("/", 
  /* #swagger.summary = 'Get all contacts' */
  /* #swagger.description = 'Returns an array of all contacts stored in MongoDB.' */
  contactsController.getContacts);

// GET /contacts/:id
router.get("/:id", 
  /* #swagger.summary = 'Get contact by id' */
  /* #swagger.description = 'Returns a single contact document by MongoDB ObjectId.' */
  contactsController.getContactById);

// POST /contacts
router.post("/", 
  /* #swagger.summary = 'Create a new contact' */
  /* #swagger.description = 'Creates a new contact in MongoDB and returns the inserted id.' */
  contactsController.createContact);

// PUT /contacts/:id
router.put("/:id", 
  /* #swagger.summary = 'Update contact by id' */
  /* #swagger.description = 'Updates an existing contact by MongoDB ObjectId. Returns 204 if updated.' */
  contactsController.updateContact);

// DELETE /contacts/:id
router.delete("/:id", 
  /* #swagger.summary = 'Delete contact by id' */
  /* #swagger.description = 'Deletes a contact by MongoDB ObjectId. Returns 204 if deleted.' */
  contactsController.deleteContact);


module.exports = router;
