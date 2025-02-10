# Contact Management API

## 📌 Project Overview

This is a **Node.js & Express.js** backend application that allows users to **create, update, delete, and view contacts**. The application uses **MongoDB** for data storage and follows **RESTful API design principles** with proper validation and error handling.

---

## 🚀 Setup & Installation

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Node.js** (Download: https://nodejs.org/)
- **MongoDB** (Download: https://www.mongodb.com/try/download/community)

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/tsingha97/ContactManagement.git
cd ContactManagement
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/contactdb
```

### 5️⃣ Start the Server

```bash
npm start  # For production
# OR
npm run dev  # For development (auto-restart on changes using nodemon)
```

### 6️⃣ Test the API

Use **Postman**, **cURL**, or a browser to test the API at:

```
http://localhost:3000/
```

---

## 📌 API Endpoints

### 1️⃣ Get All Contacts

**GET /contacts**

```bash
curl -X GET http://localhost:3000/contacts
```

**Response:**

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "createdAt": "2024-02-10T10:00:00.000Z",
    "contactId": "67aa4685f656beb363c18780"
  }
]
```

### 2️⃣ Get Contact by ID

**GET /contacts/:id**

```bash
curl -X GET http://localhost:3000/contacts/67aa4685f656beb363c18780
```

### 3️⃣ Create a Contact

**POST /contacts**

```bash
curl -X POST http://localhost:3000/contacts \
     -H "Content-Type: application/json" \
     -d '{ "name": "Jane Doe", "email": "jane@example.com", "phone": "987-654-3210" }'
```

**Response:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "987-654-3210",
  "createdAt": "2024-02-10T10:10:00.000Z",
  "contactId": "67aa4685f656beb363c18780"
}
```

### 4️⃣ Update a Contact

**PUT /contacts/:id**

```bash
curl -X PUT http://localhost:3000/contacts/67aa4685f656beb363c18780 \
     -H "Content-Type: application/json" \
     -d '{ "name": "Jane Smith", "email": "janesmith@example.com", "phone": "123-555-6789" }'
```

### 5️⃣ Delete a Contact

**DELETE /contacts/:id**

```bash
curl -X DELETE http://localhost:3000/contacts/67aa4685f656beb363c18780
```

**Response:**

```json
{ "message": "Contact deleted successfully" }
```

---

## 🧠 Thought Process & Design Considerations

### 🔹 Modular Code Structure

- The project is **organized** into separate files for configuration, routes, controllers, models, and validation.
- **MongoDB with Mongoose** is used for data storage.
- **Joi** is used for input validation to prevent bad data.
- **Express.js** is used to handle routing and middleware.

### 🔹 Error Handling & Validation

- API returns proper **HTTP status codes** (`200`, `201`, `400`, `404`, `500`).
- **Express error-handling middleware** ensures clean and structured responses.

### 🔹 Scalability & Maintainability

- The code follows **MVC architecture** (Model, View, Controller), making it **easy to extend**.
- API supports **searching by name/email** (can be extended further).

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Validation:** express-validator
- **Version Control:** Git & GitHub
