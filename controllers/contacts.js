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

// Controller for POST /contacts
const createContact = async (req, res) => {
  try {
    // Pull fields from the request body
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate all fields required
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message:
          "[controllers/createContact] All fields are required: firstName, lastName, email, favoriteColor, birthday.",
      });
    }

    // Build the document
    const newContact = {
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim().toLowerCase(),
      favoriteColor: String(favoriteColor).trim(),
      birthday: String(birthday).trim(),
    };

    // Insert into MongoDB
    const db = await connectToDatabase();
    const result = await db.collection("contacts").insertOne(newContact);

    // Return 201 + new id
    return res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error("[controllers/createContact] Create contact error:", error);
    return res.status(500).json({
      message: "[controllers/createContact] Failed to create contact.",
    });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
};
