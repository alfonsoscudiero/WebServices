/* ******************************************
 * This is the application server
 * ******************************************/
const express = require('express');
const app = express();

/* ***********************
 * Routes
 *************************/
const lesson1Routes = require('./routes/lesson1');
app.use('/', lesson1Routes);

/* ******************************************
 * Server port
 * ***************************************** */
const PORT = process.env.PORT || 3000;

/* ***********************
 * Log statement to confirm server operation
 * *********************** */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
