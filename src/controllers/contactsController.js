const Contact = require("../models/Contact");

exports.getAllContacts = async (req, res) => {
  try {
    // Extract 'search' parameter from the query string of the request
    const { search } = req.query;

    // Construct a query object based on the 'search' parameter
    const query = search
      ? {
          // If 'search' is provided, search for contacts where
          // the name or email contains the search string (case-insensitive)
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Fetch contacts from the database that match the query
    const contacts = await Contact.find(query);

    // Respond with the found contacts and a 200 status code
    res.status(200).json(contacts);
  } catch (error) {
    // Handle any errors by responding with a 500 status code
    // and a generic server error message
    res.status(500).json({ message: "Server error" });
  }
};

exports.createContact = async (req, res) => {
  try {
    // Create a new instance of the Contact model using the request body
    const contact = new Contact(req.body);

    // Save the new contact to the database
    await contact.save();

    // Respond with the created contact and a 201 status code to indicate successful creation
    res.status(201).json(contact);
  } catch (error) {
    // If there's an error, respond with a 400 status code and the error message
    res.status(400).json({ message: error.message });
  }
};

exports.getContactById = async (req, res) => {
  try {
    // Attempt to retrieve a contact document from the database by ID
    const contact = await Contact.findById(req.params.id);

    // If no contact with the given ID is found, respond with a 404 status code
    // and a message indicating that the contact was not found
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // If the contact is found, respond with a 200 status code and the contact document
    res.status(200).json(contact);
  } catch (error) {
    // If the error is a CastError (i.e., the provided ID is not a valid ObjectId),
    // respond with a 400 status code and a message indicating that the provided ID is invalid
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    // If there's any other kind of error, respond with a 500 status code and a generic
    // server error message
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateContact = async (req, res) => {
  // Attempt to find and update a contact document in the database based on the provided ID
  try {
    // Use the findByIdAndUpdate method to update the contact, passing in:
    // 1. The ID of the contact to update (from the request URL)
    // 2. The request body containing the updated contact data
    // 3. An options object that tells Mongoose to return the updated contact document
    //    (with the new: true option) and to run model validators on the updated data
    //    (with the runValidators: true option)
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated contact document (not the original one)
      runValidators: true, // Run model validators on the updated data
    });

    // If no contact with the given ID is found, respond with a 404 status code
    // and a message indicating that the contact was not found
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // If the contact is found and updated successfully, respond with a 200 status code
    // and the updated contact document
    res.status(200).json(contact);
  } catch (error) {
    // If the error is a CastError (i.e., the provided ID is not a valid ObjectId),
    // respond with a 400 status code and a message indicating that the provided ID is invalid
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    // If there's any other kind of error, respond with a 400 status code and the error message
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  // Attempt to delete a contact document from the database based on the provided ID
  try {
    // Use the findByIdAndDelete method to delete the contact, passing in the ID of the contact
    // to delete (from the request URL)
    const contact = await Contact.findByIdAndDelete(req.params.id);

    // If no contact with the given ID is found, respond with a 404 status code
    // and a message indicating that the contact was not found
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // If the contact is found and deleted successfully, respond with a 200 status code
    // and a message indicating that the contact was deleted successfully
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    // If the error is a CastError (i.e., the provided ID is not a valid ObjectId),
    // respond with a 400 status code and a message indicating that the provided ID is invalid
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    // If there's any other kind of error, respond with a 500 status code
    // and a generic server error message
    res.status(500).json({ message: "Server error" });
  }
};
