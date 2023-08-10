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

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Code to GET data to the database
app.get("/users", (req, res)=>{
  const sql = "SELECT * FROM `users`";
  connection.query(sql,(err, results) =>{
    if (err) {
      res.status(500).send('Internal Server Error', err);
    } else {
      res.send(results);
    }
  }
)})
// Code to insert data to the database
app.post('/register', (req, res) => {
  const { fname, phone, email, pword, actpword } = req.body;
  
  const sql = "INSERT INTO `users`(`fname`, `phone`, `email`, `pword`, `actpword`) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [fname, phone, email, pword, actpword], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendFile(path.join(__dirname, "../frontend/index.html"));
    }
  });
});

//CODE TO FETCH DATA

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length > 0 && results[0].password === password) {
        res.json({ success: true, user: results[0] });
      } else {
        res.sendFile(path.join(__dirname, "../frontend/index.html"));
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server errors, wueh' });
  }
});


// STEP LAST: listen for the port
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
