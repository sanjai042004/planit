import { useTask } from "../../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ view }) => {
  const { tasks } = useTask();

  const filteredTasks = tasks.filter((task) => {
    if (view === "pending") return !task.completed;
    if (view === "completed") return false;
    if (view === "all") return !task.completed;

    return !task.completed && task.category === view;
  });

  if (filteredTasks.length === 0) {
    return <p className="text-gray-400 mt-4">No Tasks Found</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

