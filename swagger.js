const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API Documentation',
    description: 'CSE 341 – Contacts routes API documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // entry point

swaggerAutogen(outputFile, endpointsFiles, doc);
