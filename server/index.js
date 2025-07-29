const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

// load env variables
require("dotenv").config({ path: "../.env" });

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173/","http://localhost:5000"],
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(express.json());

// Mongodb connection
const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);

if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Mongodb Connected"))
  .catch((e) => console.log("Mongodb connection error: ", e));

// Routes
app.get("/", (req, res) => {
  res.send("Congratulation");
});

// auth routes
app.use("/api/auth/", authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
