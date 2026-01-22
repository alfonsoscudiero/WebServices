/* ***************************
 *  controllers/contacts.js
 * ************************** */
// MongoDB ObjectId utility and database connection
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../db/connection");

// Controller for GET '/contacts'
const getContacts = async (req, res) => {
  try {
    const db = await connectToDatabase();

    // Array of documents
    const contactsInfo = await db.collection("contacts").find({}).toArray();

    if (!contactsInfo || contactsInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "[controllers/contacts] No contacts found." });
    }

    return res.status(200).json(contactsInfo);
  } catch (error) {
    console.error("[controllers/contacts] Error fetching contacts:", error);
    return res
      .status(500)
      .json({ message: "[controllers/contacts] Server error." });
  }
};

// Controller for GET '/contacts/:id'
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "[controllers/contacts] Missing id query parameter.",
      });
    }

    // Validate Mongo ObjectId format
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "[controllers/contacts] Invalid id format." });
    }

    const db = await connectToDatabase();

    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res
        .status(404)
        .json({ message: "[controllers/contacts] Contact not found." });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error(
      "[controllers/contacts] Error fetching contact by id:",
      error,
    );
    return res
      .status(500)
      .json({ message: "[controllers/contacts] Server error." });
  }
};

module.exports = {
  getContacts,
  getContactById,
};
