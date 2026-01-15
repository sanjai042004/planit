import { useState } from "react";
import { useCategory } from "../../context/CategoriesContext";

export const TaskForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { selectedCategory } = useCategory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    onAdd({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: selectedCategory === "All" ? "General" : selectedCategory,
    });

    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-3"
    >
      <input
        type="text"
        name="title"
        placeholder="What needs to be done?"
        value={formData.title}
        onChange={handleChange}
        autoFocus
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
      />

      <textarea
        name="description"
        placeholder="Add a description (optional)"
        value={formData.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none resize-none"
      />
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:bg-gray-100 rounded-lg px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!formData.title.trim()}
          className="bg-teal-500 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          + Add Task
        </button>
      </div>
    </form>
  );
};
