const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req,res) => {
  res.json({
    message: 'Hello World!'
  });
});

//connect to databse
const db = mysql.createConnection (
  {
    host: 'localhost',
    //your mysql username,
    user: 'root',
    //your mysql passcode
    password: 'Texanaggie_210',
    database: 'election'
  },
  console.log('Connected to the election database.')
);

// db.query(`SELECT * from candidates`, (err,rows) => {
//   console.log(rows);
// });

//get a single candidate 
db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

//delete a candidate
// db.query(`DELETE FROM candidates WHERE id=?`, 1, (err,result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

//Default response for any other request (not found)
app.use((req,res) => {
  res.status(404).end();
});

//belongs at bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

