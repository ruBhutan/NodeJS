const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3306;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tashi",
  database: "flutter_crud",
});

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("MySQL connected...");
// });

// Create
app.post("/users", (req, res) => {
  let user = req.body;
  let sql = "INSERT INTO users SET ?";
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send("User added...");
  });
});

// Read
app.get("/users", (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update
app.put("/users/:id", (req, res) => {
  let sql = `UPDATE users SET ? WHERE id = ${req.params.id}`;
  let user = req.body;
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send("User updated...");
  });
});

// Delete
app.delete("/users/:id", (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("User deleted...");
  });
});

app.listen(port, () => {
  console.log(`Serveriiiii started on port ${port}`);
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL connected...");
  });
});
