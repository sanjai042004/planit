import { useTask } from "../../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const CompletedList = ({ view }) => {
  const { tasks } = useTask();

  const completedTasks = tasks.filter((task) => {
    if (!task.completed) return false;
    if (view === "completed") return true;
    if (view === "all") return true;

    return task.category === view;
  });

  if (completedTasks.length === 0) {
    return <p className="text-gray-400 mt-4">No Completed Tasks</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {completedTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

