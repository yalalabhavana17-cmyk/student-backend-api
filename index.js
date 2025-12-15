require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());



// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));



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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

