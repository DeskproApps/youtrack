import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../testing";
import { IssueForm } from "../IssueForm";
import { getProjectsService } from "../../../services/youtrack";

jest.mock("../../../services/youtrack", () => ({
  getProjectsService: jest.fn(),
}));

describe("IssueForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render create issue form", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getProjectsService.mockImplementationOnce(() => Promise.resolve([]));
    const onSubmit = jest.fn();

    const { findByRole } = render((
      <IssueForm onSubmit={onSubmit} onCancel={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });

    const submitButton = await findByRole("button", { name: /Create/i });
    expect(submitButton).toBeInTheDocument();
  });

  test.todo("render update issue form");

  test("shouldn't submit if the required fields are not filled", async () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getProjectsService.mockImplementation(() => Promise.resolve([]))
    const onSubmit = jest.fn();
    const { findByRole } = render((
      <IssueForm onSubmit={onSubmit} onCancel={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });
    const submitButton = await findByRole("button", { name: /Create/i });

    // Act
    await act(async () => {
      await userEvent.click(submitButton);
    });

    // Assert
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test.todo("should submit if the required fields are filled");
});
