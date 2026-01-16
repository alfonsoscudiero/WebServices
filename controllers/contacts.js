/* ***************************
 *  controllers/contacts.js
 * ************************** */
const { connectToDatabase } = require('../db/connection');

// Controller for GET '/contacts'
const getContacts = async (req, res) => {
  try {
    const db = await connectToDatabase();

    // Array of documents
    const contactsInfo = await db.collection('contacts').find({}).toArray();

    if (!contactsInfo || contactsInfo.length === 0) {
      return res.status(404).json({ message: '[controllers/contacts] No contacts found.'});
    }

    return res.status(200).json(contactsInfo);
  } catch (error) {
    console.error('[controllers/contacts] Error fetching contacts:', error);
    return res.status(500).json({ message: '[controllers/contacts] Server error.'});
  }
};

module.exports = {
  getContacts
};