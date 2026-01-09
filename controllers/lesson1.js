/* ******************************************
 * controllers/lesson1.js
 * ***************************************** */

// GET /
const welcomeRoute = (req, res) => {
    res.send('Welcome to the CSE 341 Course!');
};

// GET /student
const studentRoute = (req, res) => {
    res.send('Welcome Back Alfonso!');
};

// GET /hello
const helloRoute = (req, res) => {
    res.send('Hello from your Express server!!');
};

// Export controller funtions
module.exports = {
    welcomeRoute,
    studentRoute,
    helloRoute, 
}