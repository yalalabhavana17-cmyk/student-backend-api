const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());



// CONNECT DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log(" MongoDB Connected"))
.catch((err) => console.log(" DB Error:", err));



// CREATE SCHEMA
const studentSchema = new mongoose.Schema({
  name: String,
  branch: String,
  year: String
});

const Student = mongoose.model("Student", studentSchema);



// ROOT API
app.get("/", (req, res) => {
  res.send("Backend + Database working ");
});



// SAVE STUDENT
app.post("/student", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(" Student saved to database");
});



// FETCH STUDENTS
app.get("/student", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});



app.listen(5000, () => {
  console.log(" Server running at http://localhost:5000");
});

