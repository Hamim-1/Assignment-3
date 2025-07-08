📚 Library Management API
A RESTful API for managing library books and borrowing records built with Express, TypeScript, and MongoDB (Mongoose).

🚀 Features
Add, update, delete, and retrieve books

Borrow books with business logic enforcement

MongoDB aggregation for borrow summaries

Genre-based filtering, sorting, and pagination

Schema validation, static methods, and middleware

Complete error handling with consistent response structure

📦 Tech Stack
Backend: Node.js, Express.js

Language: TypeScript

Database: MongoDB (via Mongoose)

Tools: Nodemon, dotenv

🛠️ Setup Instructions
1. 📁 Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
2. 📦 Install dependencies
bash
Copy
Edit
npm install
3. ⚙️ Configure environment variables
Create a .env file in the root directory and add the following:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
Replace the MongoDB URI with your connection string if needed.

4. ▶️ Run the server in development
bash
Copy
Edit
npm run dev
