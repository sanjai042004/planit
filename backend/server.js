require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;
const app = express();
app.use(express.json());
const taskRoutes = require("./src/routes/task.route")
app.use(cors({
  origin: "*", 
  credentials: true,
}));

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@planit.gtxy9jd.mongodb.net/?appName=planit`
    );
    console.log("MongoDB connected successfully ✔️");
  } catch (error) {
    console.log("DB error:", error.message);
    process.exit(1);
  }
};

app.get("/", (_, res) => res.send("Welcome to backend"));
app.use("/api", taskRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
