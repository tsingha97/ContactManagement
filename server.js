const express = require("express");
const connectDB = require("./src/config/db");
const contactsRouter = require("./src/routes/contacts");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Contact Management API",
    endpoints: {
      getAllContacts: "GET /contacts",
      createContact: "POST /contacts",
      getContact: "GET /contacts/:id",
      updateContact: "PUT /contacts/:id",
      deleteContact: "DELETE /contacts/:id",
    },
  });
});

// Contact Routes
app.use("/contacts", contactsRouter);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    suggestedEndpoint: "http://localhost:3000/contacts",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
