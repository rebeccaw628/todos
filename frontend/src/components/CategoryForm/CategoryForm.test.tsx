import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import CategoryForm from "./CategoryForm";
import userEvent from "@testing-library/user-event";

describe("SideBarItem", () => {
  const mockProps = {
    onFormSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("CategoryForm"),
    test("renders input fields and submit button", () => {
      render(<CategoryForm {...mockProps} />);
      expect(screen.getByPlaceholderText("ADD CATEGORY")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

  test("submits form with valid input"),
    async () => {
      render(<CategoryForm {...mockProps} />);
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "chores");
      const submitBtn = screen.getByRole("button");
      await userEvent.click(submitBtn);
      await waitFor(() => {
        expect(mockProps.onFormSubmit).toHaveBeenCalledTimes(1);
        expect(mockProps.onFormSubmit).toHaveBeenLastCalledWith("chores");
      });
    };

  test("does not submit form with invalid input"),
    async () => {
      render(<CategoryForm {...mockProps} />);
      const submitBtn = screen.getByRole("button");
      await userEvent.click(submitBtn);
      await waitFor(() => {
        expect(mockProps.onFormSubmit).toHaveBeenCalledTimes(1);
        expect(
          screen.getByText("Category type is required")
        ).toBeInTheDocument();
      });
    };
});
