import { useTask } from "../../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ view }) => {
  const { tasks } = useTask();

  const filteredTasks = tasks.filter((task) => {
    if (view === "pending") return !task.completed;
    if (view === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <p className="text-gray-400 mt-4 text-center">
        No Tasks
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
