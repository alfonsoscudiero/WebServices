/* ***************************
 *  controllers/contacts.js
 * ************************** */
// Used to validate request body for contacts endpoints
const Joi = require("joi");

// Schema for validating contact data
const contactSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(30),
  lastName: Joi.string().trim().min(1).max(30),
  email: Joi.string().trim().email(),
  favoriteColor: Joi.string().trim().min(1).max(30),
  birthday: Joi.date().iso().min("1900-01-01").max("now").messages({
    "date.base": "birthday must be a valid date",
    "date.format": "birthday must be in YYYY-MM-DD format",
    "date.min": "birthday must be after January 1, 1900",
    "date.max": "birthday cannot be in the future",
  }),
});

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
    // Validate body with Joi
    const { value, error } = contactSchema.validate(req.body, {
      abortEarly: false, // Joi returns all validation errors
      convert: false, // Joi does not change types
      stripUnknown: true, // Joi removes fields not in the schema
      presence: "required", // Joi makes all schema fields required by default
      errors: { wrap: { label: false } }, // Remove quotes in message
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map((d) => d.message),
      });
    }

    // Build new contact object
    const newContact = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email.toLowerCase(),
      favoriteColor: value.favoriteColor,
      birthday: value.birthday,
    };

    // Insert
    const db = await connectToDatabase();
    const result = await db.collection("contacts").insertOne(newContact);

    // Return 201 + id
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("[controllers/createContact] error:", err);
    return res.status(500).json({ message: "Failed to create contact" });
  }
};

// Controller for DELETE /contacts/:id
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Mongo ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "[controllers/deleteContact] Invalid contact id format.",
      });
    }

    const db = await connectToDatabase();

    const result = await db
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "[controllers/deleteContact] Contact does not exist.",
      });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("[controllers/deleteContact] error:", err);
    return res
      .status(500)
      .json({ message: "[controllers/deleteContact] Server error." });
  }
};

// Controller for UPDATE /contacts/:id
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "[controllers/updateContact] Invalid contact id format.",
      });
    }
    // Validate body with Joi
    const { value, error } = contactSchema.validate(req.body, {
      abortEarly: false,
      convert: false,
      stripUnknown: true,
      presence: "required",
      errors: { wrap: { label: false } },
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map((d) => d.message),
      });
    }

    const updatedContact = {
      ...value,
      email: value.email.toLowerCase(),
    };

    const db = await connectToDatabase();

    const contactId = new ObjectId(id);

    const result = await db
      .collection("contacts")
      .updateOne({ _id: contactId }, { $set: updatedContact });

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "[controllers/updateContact] Contact not found." });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("[controllers/updateContact] error:", err);
    return res
      .status(500)
      .json({ message: "[controllers/updateContact] Server error." });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
