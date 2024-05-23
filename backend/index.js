import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = 8800;

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"SQLPassword123",
  database:"test"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("backend");
});

app.get("/nurses", (req, res) => {
  const q = "SELECT * FROM nurses";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  })
});

app.post("/nurses", (req, res) => {
  const q = "INSERT INTO nurses (`name`, `licensenum`, `dob`, `age`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.licensenum,
    req.body.dob,
    req.body.age
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Nurse added successfully");
  })
});

app.put("/nurses/:id", (req, res) => {
  const nurseId = req.params.id;
  const q = "UPDATE nurses SET `name` = ?, `licensenum` = ?, `dob` = ?, `age` = ? WHERE id = ?";
  const values = [
    req.body.name,
    req.body.licensenum,
    req.body.dob,
    req.body.age
  ];
  db.query(q, [...values, nurseId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Nurse edited successfully");
  })
})

app.delete("/nurses/:id", (req, res) => {
  const nurseId = req.params.id;
  const q = "DELETE FROM nurses WHERE id = ?";
  db.query(q, [nurseId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Nurse deleted successfully");
  })
})

app.listen(PORT, () => {
  console.log("Connected to backend on port", PORT);
});