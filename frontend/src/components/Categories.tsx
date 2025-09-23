import type { TCategories } from "../types/category";

export const Categories = ({
  setCategory,
  selectedCategory,
}: {
  setCategory: (category: TCategories) => void;
  selectedCategory: TCategories;
}) => {
  const categories: TCategories[] = [
    "all",
    "pizzas",
    "wings",
    "burgers",
    "desserts",
    "combos",
    "ribs",
  ];

  return (
    <div id="category" className=" text-center text-white">
      {categories.map((category) => {
        return (
          <button
            key={category}
            onClick={() => {
              setCategory(category);
            }}
            className={`border mr-3 border-white px-3.5 py-1.5 text-2xl rounded-3xl cursor-pointer ${
              category == selectedCategory ? "bg-white text-black" : ""
            }`}
          >
            {category.slice(0, 1).toUpperCase() + category.slice(1)}
          </button>
        );
      })}
    </div>
  );
};
