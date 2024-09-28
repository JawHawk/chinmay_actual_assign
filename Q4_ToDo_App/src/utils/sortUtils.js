export const sortByPriority = (items) => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return items.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};

export const sortByDueDate = (items) => {
  return items.sort(
    (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
  );
};
