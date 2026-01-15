import { useCategory } from "../../context/CategoriesContext";
import { AddCategory } from "./AddCategory";

const DEFAULT_CATEGORIES = ["Work", "Personal", "Study", "Health", "Finance"];

export const Categories = ({ onClose = () => {} }) => {
  const { categories, selectedCategory, setSelectedCategory, deleteCategory } =
    useCategory();

  return (
    <div className="space-y-2 mt-6">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        Categories
      </h3>

      {categories.map((cat) => {
        const isActive = selectedCategory === cat;

        return (
          <div
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              onClose();
            }}
            className={`flex items-center justify-between
              rounded-md px-4 py-1 cursor-pointer
              transition group
              ${isActive ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50"}`}
          >
            <p className="text-sm font-medium">{cat}</p>

            {!DEFAULT_CATEGORIES.includes(cat) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategory(cat);
                }}
                className="text-xs text-red-400
                opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            )}
          </div>
        );
      })}
      <AddCategory />
    </div>
  );
};
