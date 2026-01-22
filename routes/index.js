/* ******************************************
 * routes/index.js
 * ***************************************** */
const express = require("express");
const router = express.Router();
// Import the controller
const lesson1Controller = require("../controllers/lesson1");

// Route: GET /
// http://localhost:3000/
router.get("/", lesson1Controller.welcomeRoute);

// Route: GET /alfonso
// http://localhost:3000/alfonso
router.get("/alfonso", lesson1Controller.studentRoute);

// Route: GET /hello
// http://localhost:3000/hello
router.get("/hello", lesson1Controller.helloRoute);

// Export the router so server.js
module.exports = router;
