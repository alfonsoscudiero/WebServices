/* ******************************************
 * This is the application server
 * ******************************************/
// Load Environment variables
require("dotenv").config();

// Express imports
const express = require("express");

// Database Connection
const { connectToDatabase } = require("./db/connection");

// App creation
const app = express();

// Middleware
app.use(express.json());

/* ***********************
 * Routes
 *************************/
const lesson1Routes = require("./routes");
const contactRoute = require("./routes/contacts");

// Route registration
app.use("/", lesson1Routes);
app.use("/", contactRoute);

/* ******************************************
 * Server configuration
 * ***************************************** */
const PORT = process.env.PORT || 3000;

// Test MongoDB connection
connectToDatabase()
  .then(() => {
    console.log("[server] MongoDB connection verified");
  })
  .catch((error) => {
    console.error("[server] MongoDB connection failed on startup:", error);
  });

/* ***********************
 * Server start
 * *********************** */
app.listen(PORT, () => {
  console.log(`[server] Listening on port ${PORT}`);
});
