import { createContext, useContext, useState } from "react";

const CategoryContext = createContext(null);

const DEFAULT_CATEGORIES = [
  "Work",
  "Personal",
  "Study",
  "Health",
  "Finance",
];

export const CategoryProvider = ({ children }) => {
  const [categories] = useState(["All", ...DEFAULT_CATEGORIES]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within CategoryProvider");
  }

  return context;
};
