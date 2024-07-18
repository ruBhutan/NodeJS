const express = require("express");
const app = express();
//import the db pool
const pool = require("./db");

//to perse the json body
app.use(express.json());

//Define Routes
//create
app.post("/todo", async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  console.log(req.body);
  try {
    const row = await pool.query(
      "insert into to_list (name, description) values ($1, $2) Returning * ",
      [name, description]
    );
    console.log("DB COnnected");
    res.json(row);
  } catch (err) {
    console.log(err);
  }
});

//get_all
app.get("/todos-list", async (req, res) => {
  try {
    const row = await pool.query(
      "select * from to_list where name is not null"
    );
    console.log("DB COnnected");
    res.json(row.rows);
  } catch (err) {
    console.log(err);
  }
});

//get_one
app.get("/todo-list/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const row = await pool.query("select * from to_list where id = $1", [id]);
    res.json(row.rows);
  } catch (err) {
    console.log(err);
  }
});

//update
app.put("/update-todo/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  console.log(id);
  try {
    const row = await pool.query(
      "update to_list set name = $1, description = $2 where id = $3",
      [name, description, id]
    );
    res.json({ message: "Updated" });
  } catch (err) {
    console.log(err);
  }
});

//delete
app.delete("/delete-todo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const row = await pool.query("delete from to_list where id = $1", [id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
