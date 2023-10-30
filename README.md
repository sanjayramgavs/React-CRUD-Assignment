## Project Name
##[Click here to redirect the working demo video](https://youtu.be/KyKJ7sBJT8w)

This is a simple user management web application built with React for the front end and an Express.js server for the back end. It allows you to perform basic CRUD (Create, Read, Update, Delete) operations on user data. Users can be created, edited, and deleted. The project is integrated with a MySQL database to store and retrieve user data.

## Technologies Used

- **Front End**:
  - React.js
  - Axios (for making API requests)
  - React Toastify (for displaying notifications)
  - Tailwind CSS (for styling)

- **Back End**:
  - Express.js (Node.js framework)
  - MySQL (as the database)

## How the Project Works

The project consists of a React front end and an Express.js back end. The React app allows users to interact with the data stored in the MySQL database.

1. **Front End**:
   - The main application is a user form where you can input a User ID, Email, and Password. You can create a new user by filling in these details and clicking "Create User." Alternatively, you can update an existing user by clicking "Update User" after selecting a user from the list.
   - The user list is displayed in a table, where you can search for users based on User ID or Email.
   - Each user in the list has actions to read, edit, and delete.

2. **Back End**:
   - The Express.js back end serves as the API for the React front end.
   - It handles the CRUD operations for user data stored in the MySQL database.
   - The server listens on port 9900.

## Setting Up the Project

To set up and run the project, follow these steps:

1. Clone the project repository.

2. Install the required dependencies for both the front end and back end:
   - For the front end (React), navigate to the project directory and run `npm install`.

3. Configure the MySQL database:
   - Make sure you have a MySQL server running.
   - Update the database connection details in the Express.js server code (the `connection` object) to match your MySQL server.

4. Run the Express.js server:
   - Navigate to the `server` directory and run `npm install` to install server dependencies.
   - Start the server with `npm start`.

5. Run the React front end:
   - Navigate to the project root directory.
   - Start the front end with `npm start`.

6. Access the application:
   - Open your browser and go to `http://localhost:3000` to interact with the application.


Feel free to add more sections, such as a "Deployment" section if you plan to deploy the project, or any other relevant information to help users understand and use your project.
