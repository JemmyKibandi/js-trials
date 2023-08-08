const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;
// code for opening the server
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//code to connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'js_auth'
  });
  app.post('/submit', (req, res) => {
    const { name, email } = req.body;
  
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(sql, [name, email], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Data inserted:', result);
        res.send('Form submitted successfully');
      }
    });
  });
  