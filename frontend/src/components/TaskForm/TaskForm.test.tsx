import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import TaskForm from "./TaskForm";
import userEvent from "@testing-library/user-event";

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

describe("TaskForm", () => {
  const createMockData = () => {
    const categoryData: mockCategory = {
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
    categoryData.tasks = [taskData];
    return { categoryData, taskData };
  };

  const { categoryData } = createMockData();
  const createFormMockProps = {
    onSubmit: vi.fn(),
    categories: [categoryData],
    formType: "create",
    dueDate: "2025-10-10",
  };

  const editFormMockProps = {
    onSubmit: vi.fn(),
    categories: [categoryData],
    formType: "edit",
    existingTask: {
      description: "codewars",
      category: "study",
      dueDate: "2025-10-10",
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders input fields and submit button", () => {
    render(<TaskForm {...createFormMockProps} />);
    expect(screen.getByPlaceholderText("Add new task")).toBeInTheDocument();
    expect(screen.getByTestId("date-input")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders the correct icon for create mode", () => {
    render(<TaskForm {...createFormMockProps} />);
    const icon = screen.getByTestId("form-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("fa-square-plus");
  });

  test("renders the correct icon for edit mode", () => {
    render(<TaskForm {...editFormMockProps} />);
    const icon = screen.getByTestId("form-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("fa-circle-check");
  });

  test("submits form with valid input"),
    async () => {
      render(<TaskForm {...createFormMockProps} />);
      const description = screen.getByPlaceholderText("Add new task");
      await userEvent.type(description, "do laundry");
      const date = screen.getByTestId("date-input");
      fireEvent.change(date, {
        target: { value: createFormMockProps.dueDate },
      });
      expect(date).toHaveValue("2025-10-10");
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: "chores" })
      );
      const choresOption = screen.getByRole("option", {
        name: "chores",
      }) as HTMLOptionElement;
      expect(choresOption.selected).toBe(true);
      const submitBtn = screen.getByRole("button");
      await userEvent.click(submitBtn);
      await waitFor(() => {
        expect(createFormMockProps.onSubmit).toHaveBeenCalledTimes(1);
        expect(createFormMockProps.onSubmit).toHaveBeenLastCalledWith(
          editFormMockProps.existingTask
        );
      });
    };

  test("does not submit form with invalid input"),
    async () => {
      render(<TaskForm {...createFormMockProps} />);
      const submitBtn = screen.getByRole("button");
      await userEvent.click(submitBtn);
      await waitFor(() => {
        expect(createFormMockProps.onSubmit).toHaveBeenCalledTimes(1);
        expect(
          screen.getByText("Task description is required")
        ).toBeInTheDocument();
        expect(screen.getByText("Category is required")).toBeInTheDocument();
      });
    };
});
