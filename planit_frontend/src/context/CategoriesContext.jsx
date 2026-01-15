import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

const DEFAULT_CATEGORIES = ["Work", "Personal", "Study", "Health", "Finance"];

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("categories");
    if (saved) {
      setCategories([...DEFAULT_CATEGORIES, ...JSON.parse(saved)]);
    }
  }, []);

  const addCategory = (name) => {
    if (!name.trim()) return;

    setCategories((prev) => {
      if (prev.includes(name)) return prev;

      const updated = [...prev, name];
      localStorage.setItem(
        "categories",
        JSON.stringify(updated.filter((c) => !DEFAULT_CATEGORIES.includes(c)))
      );
      return updated;
    });
  };

  const deleteCategory = (name) => {
    if (DEFAULT_CATEGORIES.includes(name)) return;

    const updated = categories.filter((c) => c !== name);
    setCategories(updated);
    localStorage.setItem(
      "categories",
      JSON.stringify(updated.filter((c) => !DEFAULT_CATEGORIES.includes(c)))
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
