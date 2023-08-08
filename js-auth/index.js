const express = require('express');
const app = express();
const port = 3000; // Change this to your preferred port

// Set up middleware
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});