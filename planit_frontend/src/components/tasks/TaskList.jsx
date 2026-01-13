import React from "react";
import { useTask } from "../../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { tasks } = useTask();

  const pendingTask = tasks.filter(
    (task) => !task.completed
  );
  return (
    <div className="mt-4 space-y-3">
      {pendingTask.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
