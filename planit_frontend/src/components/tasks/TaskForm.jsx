import { useState } from "react";

export const TaskForm = ({ onAdd, onCancel, category }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) return;

    onAdd({
      title: trimmedTitle,
      description: trimmedDescription,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow"
    >
      <p className="text-xs text-gray-500 mb-2">
        Adding to <b className="text-gray-700">{category}</b>
      </p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 outline-none px-3 py-2 rounded-lg mb-3"
        placeholder="Task title"
        autoFocus
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 outline-none px-3 py-2 rounded-lg resize-none"
        rows={3}
        placeholder="Description (optional)"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
