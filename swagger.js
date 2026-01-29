const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API Documentation',
    description: 'CSE 341 – Contacts routes API documentation',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js']; // entry point

swaggerAutogen(outputFile, endpointsFiles, doc);
