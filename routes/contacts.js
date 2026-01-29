/* ***************************
 *  routes/contacts.js
 * ************************** */
const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

// GET /contacts
router.get(
  "/",
  /* #swagger.summary = 'Get all contacts' */
  /* #swagger.description = 'Returns an array of all contacts stored in MongoDB.' */
  /* #swagger.responses[200] = {
      description: 'List of contacts'
  } */
  /* #swagger.responses[404] = {
        description: 'No contacts found'
  } */

  /* #swagger.responses[500] = {
        description: 'Internal server error'
  } */
  contactsController.getContacts,
);

// GET /contacts/:id
router.get(
  "/:id",
  /* #swagger.summary = 'Get contact by id' */
  /* #swagger.description = 'Returns a single contact document by MongoDB ObjectId.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact id',
        required: true,
        type: 'string'
  } */
  /* #swagger.responses[200] = {
        description: 'Contact found'
  } */
  /* #swagger.responses[400] = {
        description: 'Invalid id format'
  } */
  /* #swagger.responses[404] = {
        description: 'Contact not found'
  } */
  /* #swagger.responses[500] = {
      description: 'Internal server error'
} */
  contactsController.getContactById,
);

// POST /contacts
router.post(
  "/",
  /* #swagger.summary = 'Create a new contact' */
  /* #swagger.description = 'Creates a new contact in MongoDB and returns the inserted id.' */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Contact data to create',
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
  } */
  /* #swagger.responses[201] = {
        description: 'Contact created',
        schema: { id: '697bd5e18cdb34d6de7175fe' }
  } */
  /* #swagger.responses[400] = {
        description: 'Validation failed'
  } */
  /* #swagger.responses[500] = {
        description: 'Internal server error'
  } */
  contactsController.createContact,
);

// PUT /contacts/:id
router.put(
  "/:id",
  /* #swagger.summary = 'Update contact by id' */
  /* #swagger.description = 'Updates an existing contact by MongoDB ObjectId. Returns 204 if updated.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact id',
        required: true,
        type: 'string'
  } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated contact data',
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
  } */
  /* #swagger.responses[204] = {
        description: 'Contact updated successfully'
  } */
  /* #swagger.responses[400] = {
        description: 'Validation failed'
  } */
  /* #swagger.responses[404] = {
        description: 'Contact not found'
  } */
  /* #swagger.responses[500] = {
        description: 'Internal server error'
  } */
  contactsController.updateContact,
);

// DELETE /contacts/:id
router.delete(
  "/:id",
  /* #swagger.summary = 'Delete contact by id' */
  /* #swagger.description = 'Deletes a contact by MongoDB ObjectId. Returns 204 if deleted.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact id',
        required: true,
        type: 'string'
  } */
  /* #swagger.responses[204] = {
        description: 'Contact deleted successfully'
  } */
  /* #swagger.responses[400] = {
        description: 'Invalid contact id format'
  } */
  /* #swagger.responses[404] = {
        description: 'Contact not found'
  } */
  /* #swagger.responses[500] = {
        description: 'Internal server error'
  } */
  contactsController.deleteContact,
);

module.exports = router;
