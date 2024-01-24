import { cleanup, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { IssueForm } from "../IssueForm";
import mockProjects from "./mockProjects";
import mockIssue from "./mocks/mockIssue.json";
import { Props } from "../types";

const renderIssueForm = (props?: Partial<Props>) => render((
  <IssueForm
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    isEditMode={props?.isEditMode || false}
    issue={props?.issue}
    error={props?.error || null}
    onUploadFile={props?.onUploadFile || jest.fn()}
  />
), { wrappers: { appSdk: true, query: true } });

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

    const { findByRole } = renderIssueForm({ onSubmit: mockOnSubmit });

    const submitButton = await findByRole("button", { name: /Create/i });
    expect(submitButton).toBeInTheDocument();
  });

  test("render update issue form", async () => {
    const mockOnSubmit = jest.fn();
    mockOnSubmit.mockImplementation(() => Promise.resolve());

    const { findByRole } = renderIssueForm({
      isEditMode: true,
      issue: mockIssue as never,
      onSubmit: mockOnSubmit,
    });
    const submitButton = await findByRole("button", { name: /Save/i });

    expect(submitButton).toBeInTheDocument();
  });

  test("shouldn't submit if the required fields are not filled", async () => {
    const mockOnSubmit = jest.fn();
    mockOnSubmit.mockImplementation(() => Promise.resolve());

    const { findByRole } = renderIssueForm({ onSubmit: mockOnSubmit });
    const submitButton = await findByRole("button", { name: /Create/i });

    act(() => {
      userEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
  });

  test("should submit if the required fields are filled", async () => {
    const mockOnSubmit = jest.fn();
    mockOnSubmit.mockImplementation(() => Promise.resolve());

    const { findByRole } = renderIssueForm({
      isEditMode: true,
      issue: mockIssue as never,
      onSubmit: mockOnSubmit,
    });

    await act(async () => {
      const submitButton = await findByRole("button", { name: /Save/i });
      await userEvent.click(submitButton);
    });

    waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
