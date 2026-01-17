import { useState } from "react";
import { useCategory } from "../../context/CategoriesContext";
import { NotebookPen } from "lucide-react";

export const AddCategory = () => {
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { addCategory } = useCategory();

  const handleAdd = () => {
    if (!name.trim()) return;
    addCategory(name.trim());
    setName("");
    setShowInput(false);
  };

  return (
    <div className="flex gap-2 px-2 mt-2">
      {showInput ? (
        <div className="">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add category"
            className="flex text-sm px-2 py-1.5 border rounded-md outline-none"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />

          
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="text-gray-400 size-2.5"
        >
          <NotebookPen />
        </button>
      )}
    </div>
  );
};
