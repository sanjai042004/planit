const Task = require("../modals/task.model");


const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.uid;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTaskByUser = async (req, res) => {
  try {
    const userId = req.user.uid;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },   
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      userId, 
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const toggleCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTask,
  getTaskByUser,
  updateTask,
  deleteTask,
  toggleCompleted,
};
