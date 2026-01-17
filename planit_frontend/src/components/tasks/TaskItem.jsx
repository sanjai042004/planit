import { useState } from "react";
import { useTask } from "../../context/TaskContext";

export const TaskItem = ({ task }) => {
  const { toggleTask, updateTask, deleteTask } = useTask();

  const createdDate = new Date(task.createdAt);

  const date = createdDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const time = createdDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let completedInfo = null;
  if (task.completed && task.completedAt) {
    const completedDate = new Date(task.completedAt);

    const cDate = completedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });

    const cTime = completedDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    completedInfo = `Completed on ${cDate} · ${cTime}`;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
    category: task.category || "All",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editData.title.trim()) return;

    updateTask(task._id, {
      title: editData.title.trim(),
      description: editData.description.trim(),
      category: editData.category,
    });

    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
      <div className="flex items-start gap-3">
        <div
          onClick={() => toggleTask(task._id)}
          className={`
            w-5 h-5 rounded-full border-2 cursor-pointer
            flex items-center justify-center mt-1
            ${
              task.completed
                ? "bg-teal-500 border-teal-500"
                : "border-gray-400"
            }
          `}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </div>

        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                name="title"
                value={editData.title}
                onChange={handleChange}
                className="
                  w-full border rounded-md px-2 py-1
                  outline-none focus:ring-2 focus:ring-teal-400
                "
              />

              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
                rows={2}
                className="
                  w-full border rounded-md px-2 py-1 mt-2 resize-none
                  outline-none focus:ring-2 focus:ring-teal-400
                "
                placeholder="Description"
              />
            </>
          ) : (
            <>
              <h3
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="text-sm text-gray-500">
                  {task.description}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-1">
                {date} · {time}
              </p>

              {completedInfo && (
                <p className="text-xs text-green-600 mt-1">
                  {completedInfo}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 text-sm">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-teal-600 hover:underline"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};
