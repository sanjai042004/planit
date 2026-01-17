const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
      default: "All",
      index: true, 
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    userId: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Task", taskSchema);
