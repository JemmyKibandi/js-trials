// STEP 1: import express/ other variables
const express = require('express');
const path = require("path");
const mysql = require('mysql');
// STEP 2: declare a variable of it's method
const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true })); // For parsing form data


//STEP 4: code to connect to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'js_auth'
});

// STEP 5: Show that you've connected to the database
connection.connect((err, connection) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Connected to the database")
  }
})

app.post('/js-auth/backend/', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Query the database to find a user with the provided username
      const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (user.length > 0 && user[0].password === password) {
        res.json({ success: true, user: user[0] });
      } else {
        res.status(401).json({ success: false, message: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  // STEP LAST: listen for the port
  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
  