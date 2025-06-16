import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SideBarItem from "./SideBarItem";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("SideBarItem", () => {
  const mockData = {
    title: ["ALL TASKS", "In progress", "Completed"],
    number: { allTasks: 11, inProgress: 5, completed: 6 },
    active: true,
    onClick: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("displays ALL TASKS when all tasks filer selected and corresponding number of tasks", () => {
    render(
      <SideBarItem
        title={mockData.title[0]}
        number={mockData.number.allTasks}
        icon={faCircleXmark}
        active={true}
        onClick={mockData.onClick}
      />
    );
    expect(screen.getByText("ALL TASKS")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
  });

  test("calls onClick when the container is clicked", async () => {
    render(
      <SideBarItem
        title={mockData.title[0]}
        number={mockData.number.allTasks}
        icon={faCircleXmark}
        active={true}
        onClick={mockData.onClick}
      />
    );
    const user = userEvent.setup();
    const clicked = screen.getByTestId("clickedItem");
    await user.click(clicked);
    expect(mockData.onClick).toHaveBeenCalled;
  });

  test("calls onDelete when the cross (x) icon is clicked", async () => {
    render(
      <SideBarItem
        title={mockData.title[0]}
        number={mockData.number.allTasks}
        icon={faCircleXmark}
        active={true}
        onClick={mockData.onClick}
      />
    );
    const user = userEvent.setup();
    const icon = screen.getByLabelText("delete-icon");
    await user.click(icon);
    expect(mockData.onDelete).toHaveBeenCalled;
  });
});
