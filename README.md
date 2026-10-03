# Expense Tracker
 is a web application that assists users in keeping track of their expenses. The web application allows users to add, delete, and edit expenses, and provides filtering and summary features. The summary features show the total amount of expenses, the number of expenses, and the highest expense. Data is stored in a PostgreSQL database. The frontend and backend are connected using a REST API.
## How to run

<!-- Write the exact steps someone needs to run your project from scratch.
     Assume they have Node.js, PostgreSQL, and VS Code, and nothing else.
     Include: creating the database, running schema.sql, writing the .env file,
     starting the backend, and opening the frontend. -->

**Backend**

How to run Backend

1. Ensure Node.js and PostgreSQL are installed and PostgreSQL is running.

2. Open the backend folder in VS Code.

3. Open PostgreSQL/pgAdmin and create a database called:
Expense_tracker

4. Open the schema.sql file and run it inside the expense_tracker database to create the expenses table and load the sample data.

5. Create a file named .env in the backend folder.

6. Add your PostgreSQL connection details to the .env file:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=Expense_tracker

7. Open the terminal in the backend folder.

8. Run the command:
npm install

9. Start the server:
node server.js

10. The server will run on:
http://localhost:3000

**Frontend**

1. Open the frontend folder in VS Code.

2. Make sure the backend server is running.

3. Open index.html using the VS Code Live Server extension.

4. The Expense Tracker application will open in the browser.

5. The frontend will communicate with the backend through:
http://localhost:3000/api/expenses

## Features

- [yes] Add an expense (with validation)
- [yes] Delete an expense
- [yes] Edit an expense
- [yes] Filter by category
- [yes] Summary cards (total, count, highest)
- [yes] Data is saved in a PostgreSQL database
- [yes] Bootstrap spinner while loading data
- [yes] Bootstrap alerts for errors
- [yes] REST API with GET, POST, PUT, and DELETE
- [yes] Responsive Bootstrap interface
- [yes] Dark mode
- [yes] Expenses chart by category
- [yes] Export expenses to CSV

## Screenshots
-  Screenshots in a separate file
## What was the hardest part?

The hardest part was connecting the frontend with the backend and showing data on the frontend with data stored in PostgreSQL. I learned how fetch and async/await with HTTP status codes and REST API endpoints work together. I learned some other things on my own including Promises, fetch(), JSON.stringify() and JSON.parse(), Express, CORS, and how to connect Node.js with PostgreSQL using the pg library. Some things were hard to learn at first because they were new to me, but I learned them by reading documents, looking for examples, and testing the code myself. The main issue was how to connect the frontend with the backend to have expenses data and show it on the frontend. This was done by creating API functions for getting, adding, updating, and deleting expenses and calling the API for each change. This project showed me how the frontend, backend, API, and database work together as a whole.