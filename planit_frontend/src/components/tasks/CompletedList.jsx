import { useTask } from "../../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const CompletedList = () => {
  const { tasks } = useTask();

  const completedTask = tasks.filter((task) => task.completed);
  if (completedTask.length === 0) {
    return <p className="text-gray-400 mt-4">No Completed Tasks</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {completedTask.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
