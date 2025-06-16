import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
vi.mock("../../services/utils", () => ({
  __esModule: true,
  displayDate: vi.fn().mockReturnValue("15 June 2025"),
}));
import TaskItem from "./TaskItem";
import * as dateUtils from "../../services/utils";
import React from "react";

interface mockTask {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  dueDate?: string;
  isCompleted: boolean;
  isArchived: boolean;
  category: mockCategory;
}

interface mockCategory {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  tasks: mockTask[];
}

describe("SideBarItem", () => {
  const createMockData = () => {
    const categoryData = {
      id: 1,
      createdAt: "2025-06-13",
      updatedAt: "2025-06-14",
      type: "chores",
      tasks: [] as mockTask[],
    };

    const taskData: mockTask = {
      id: 1,
      createdAt: "2025-06-13",
      updatedAt: "2025-06-13",
      description: "pick up dog",
      dueDate: "2025-06-15",
      isCompleted: true,
      isArchived: true,
      category: categoryData,
    };

    const noDueDateTaskData: mockTask = {
      id: 2,
      createdAt: "2025-06-13",
      updatedAt: "2025-06-13",
      description: "pick up groceries",
      isCompleted: false,
      isArchived: false,
      category: categoryData,
    };

    categoryData.tasks = [taskData];
    return { categoryData, taskData, noDueDateTaskData };
  };

  const { taskData, noDueDateTaskData } = createMockData();

  const mockCompletedTasks = [1, 2, 3];

  const mockProps = {
    task: taskData,
    completedTasks: mockCompletedTasks,
    onChange: vi.fn(),
    onUpdate: vi.fn(),
    onDuplicate: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays task description, dueDate, category", () => {
    render(<TaskItem {...mockProps} />);
    expect(screen.getByText("pick up dog")).toBeInTheDocument();
    screen.debug();
    expect(screen.getByTestId("dateDisplay")).toBeInTheDocument();
    expect(screen.getByTestId("dateDisplay")).toHaveTextContent("15 June 2025");
    expect(screen.getByText("chores")).toBeInTheDocument();
  });

  test("calls onChange when the checkbox is clicked", async () => {
    render(<TaskItem {...mockProps} />);
    const user = userEvent.setup();
    const clicked = screen.getByRole("checkbox");
    await user.click(clicked);
    expect(mockProps.onChange).toHaveBeenCalled();
  });

  test("does not display dueDate if there is no dueDate", () => {
    render(<TaskItem {...mockProps} task={noDueDateTaskData} />);
    expect(dateUtils.displayDate).toHaveBeenCalledTimes(0);
    expect(screen.queryByTestId("dateDisplay")).not.toBeInTheDocument();
  });
});
