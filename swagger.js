// swagger.js
const swaggerAutogen = require("swagger-autogen")();

const isProd = process.env.NODE_ENV === "production";

// - Local:  http://localhost:3000
// - Render: https://cse341-winter26.onrender.com
const PUBLIC_HOST =
  process.env.PUBLIC_HOST ||
  (isProd ? "cse341-winter26.onrender.com" : "localhost:3000");

const PUBLIC_SCHEME = process.env.PUBLIC_SCHEME || (isProd ? "https" : "http");

const doc = {
  info: {
    title: "Contacts API Documentation",
    description: "CSE 341 – Contacts routes API documentation",
  },
  host: PUBLIC_HOST,
  schemes: [PUBLIC_SCHEME],

  // Reusable data model
  definitions: {
    // Request Body Schema (POST/PUT)
    // What the client SENDS (no _id)
    ContactInput: {
      type: "object",
      required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
      properties: {
        firstName: { type: "string", example: "Gerald" },
        lastName: { type: "string", example: "Causee" },
        email: { type: "string", example: "gcausee@churchhq.org" },
        favoriteColor: { type: "string", example: "Red" },
        birthday: { type: "string", example: "1963-05-20" }, // ISO date string
      },
    },

    // Response Schema (GET)
    // What the API RETURNS (a ContactInput + _id)
    Contact: {
      // Combination (merge) of other schemas
      allOf: [
        { $ref: "#/definitions/ContactInput" },
        {
          type: "object",
          properties: {
            _id: { type: "string", example: "696a7f5b7e14e3873ceb09c3" },
          },
        },
      ],
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"]; // entry point

swaggerAutogen(outputFile, endpointsFiles, doc);
