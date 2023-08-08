const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'js_auth'
  });

   // Code to insert data to the database
app.post('/submit', (req, res) => {
  const { name, phone, email, pword, actpword } = req.body;
   // Dummy values for testing
   const fName = 'John Doe';
   const Phone = '1234567890';
   const Email = 'john@example.com';
   const Pword = 'password123';
   const actPword = 'password123';
 

  const sql = "INSERT INTO `users`(`fname`, `phone`, `email`, `pword`, `actpword`) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [fName, Phone, Email, Pword, actPword], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data inserted:', result);
      res.send('Form submitted successfully');
    }
  });
});
  