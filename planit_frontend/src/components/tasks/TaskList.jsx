import { useTask } from "../../context/TaskContext";
import { useCategory } from "../../context/CategoriesContext";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "../ui/EmptyState";

export const TaskList = ({ view }) => {
  const { tasks } = useTask();
  const { selectedCategory } = useCategory();

  const filteredTasks = tasks
    .filter((task) => {
      if (view === "pending") return !task.completed;
      if (view === "completed") return task.completed;
      return true;
    })
    .filter((task) => {
      if (selectedCategory !== "All") {
        return task.category === selectedCategory;
      }
      return true;
    });

  if (filteredTasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3 mt-4">
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
