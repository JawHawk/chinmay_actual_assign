import data from "../../data/todo.json" assert { type: "json" };

export const getInitialData = () => {
  const storedData = localStorage.getItem("todoItems");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return data;
};

export const saveData = (items) => {
  localStorage.setItem("todoItems", JSON.stringify(items));
};
