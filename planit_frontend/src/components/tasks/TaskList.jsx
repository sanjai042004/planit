import { useCategory } from "../../context/CategoriesContext";
import { useTask } from "../../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ view }) => {
  const { tasks } = useTask();
  const { selectedCategory } = useCategory();

  let filteredTasks = tasks;

  // 🔹 Status filter
  if (view === "pending") {
    filteredTasks = filteredTasks.filter((t) => !t.completed);
  }

  if (view === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.completed);
  }

  // 🔹 Category filter
  if (selectedCategory !== "All") {
    filteredTasks = filteredTasks.filter(
      (t) => t.category === selectedCategory
    );
  }

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
