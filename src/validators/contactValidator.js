const { check, validationResult } = require("express-validator");

// Validation rules for contact data
exports.validateContact = [
  // Trim whitespace from the name field and ensure it's not empty
  check("name").trim().notEmpty().withMessage("Name is required"),

  // Validate the email field using the isEmail() method from express-validator
  // and trim whitespace from it
  check("email").trim().isEmail().withMessage("Invalid email address"),

  // Trim whitespace from the phone number field and ensure it's not empty
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  // Function to be called after all validation rules are executed
  // If there are any errors, return a 400 response with the errors array
  // Otherwise, call the next middleware in the stack
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
