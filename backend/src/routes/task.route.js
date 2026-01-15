const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  addTask,
  deleteTask,
  getTaskByUser,
  toggleCompleted,
  updateTask,
} = require("../controllers/task.controller");

router.use(auth);
router.post("/tasks", addTask);
router.get("/tasks", getTaskByUser);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/completed", toggleCompleted);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
