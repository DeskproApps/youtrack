import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../testing";
import { IssueForm } from "../IssueForm";
import mockProjects from "./mockProjects";
import mockIssue from "./mocks/mockIssue.json";

jest.mock("../../../services/youtrack", () => ({
  getProjectsService: () => Promise.resolve(mockProjects),
}));

describe("IssueForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render create issue form", async () => {
    const mockOnSubmit = jest.fn();
    mockOnSubmit.mockImplementation(() => Promise.resolve());

    const { findByRole } = render((
      <IssueForm onSubmit={mockOnSubmit} onCancel={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });

    const submitButton = await findByRole("button", { name: /Create/i });
    expect(submitButton).toBeInTheDocument();
  });

  test("render update issue form", async () => {
    const mockOnSubmit = jest.fn();
    mockOnSubmit.mockImplementation(() => Promise.resolve());

    const { findByRole } = render((
      <IssueForm isEditMode issue={mockIssue as never} onSubmit={mockOnSubmit} onCancel={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });
    const submitButton = await findByRole("button", { name: /Save/i });

    expect(submitButton).toBeInTheDocument();
  });

  test("shouldn't submit if the required fields are not filled", async () => {
    const mockOnSubmit = jest.fn();
    mockOnSubmit.mockImplementation(() => Promise.resolve());

    const { findByRole } = render((
      <IssueForm onSubmit={mockOnSubmit} onCancel={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });
    const submitButton = await findByRole("button", { name: /Create/i });

    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
  });

  test("should submit if the required fields are filled", async () => {
    const mockOnSubmit = jest.fn();
    mockOnSubmit.mockImplementation(() => Promise.resolve());

    const { findByRole } = render((
      <IssueForm isEditMode issue={mockIssue as never} onSubmit={mockOnSubmit} onCancel={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });
    const submitButton = await findByRole("button", { name: /Save/i });

    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
