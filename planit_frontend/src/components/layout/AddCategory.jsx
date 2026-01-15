import { useState } from "react";
import { useCategory } from "../../context/CategoriesContext";

export const AddCategory = () => {
  const [name, setName] = useState("");
  const { addCategory } = useCategory();

  const handleAdd = () => {
    if (!name.trim()) return;
    addCategory(name.trim());
    setName("");
  };

  return (
    <div className="flex gap-2 px-2 mt-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add category"
        className="flex-1 text-sm px-3 py-1.5
        border rounded-md outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button
        onClick={handleAdd}
        className="text-sm px-3 py-1.5
        bg-teal-500 text-white rounded-md"
      >
        +
      </button>
    </div>
  );
};
