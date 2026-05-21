const express = require("express");
const connectDB = require("./db/conn");
const dotenv = require("dotenv");
const User = require("./models/User");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
connectDB();

/*
  TEST ROUTE
*/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*
  CREATE USER (POST)
*/
app.post("/api/users", async (req, res) => {
  try {
    const { firstName, lastName, contact } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      contact,
    });

    res.json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

/*
  GET ALL USERS
*/
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});