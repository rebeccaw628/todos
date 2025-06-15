export const displayDate = (dueDate: string) => {
  const formattedDate = new Date(dueDate).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

export const SideBarFilter = {
  ALL: "ALL TASKS",
  COMPLETED: "Completed",
  PROGRESS: "In Progress",
};
