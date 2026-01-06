/* ******************************************
 * This is the application server
 * ******************************************/
const express = require('express');

const app = express();

/* ******************************************
 * Default GET route
 * ***************************************** */
app.get('/', (req, res) => {
    res.send('Welcome to the CSE 341 Course!');
});

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
