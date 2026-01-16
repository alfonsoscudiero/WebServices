/* ***************************
 *  routes/contacts.js
 * ************************** */
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// GET url/contacts
router.get('/contacts', contactsController.getContacts);

// GET '/contacts/single?id=<mongoObjectId>'
router.get('/contacts/:id', contactsController.getContactById)

module.exports = router;