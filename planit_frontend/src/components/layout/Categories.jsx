import { useCategory } from "../../context/CategoriesContext";

export const Categories = ({ onClose = () => {} }) => {
  const { categories, selectedCategory, setSelectedCategory } = useCategory();

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
            className={`
              px-4 py-1 rounded-md cursor-pointer transition
              ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
              }
            `}
          >
            {cat}
          </div>
        );
      })}
    </div>
  );
};
