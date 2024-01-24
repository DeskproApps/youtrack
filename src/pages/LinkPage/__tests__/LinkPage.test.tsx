import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { App } from "../../../App";

jest.mock("../../../services/entityAssociation/getEntityIssueListService", () => ({
  getEntityIssueListService: () => Promise.resolve([]),
}));

jest.mock("../../../services/youtrack/getProjectsService", () => ({
  getProjectsService: () => Promise.resolve([]),
}));

describe("LinkPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("navigate to CreateIssuePage", async () => {
    // Arrange
    const { getByRole } = render(<App />, {
      wrappers: {
        theme: true,
        router: "/link",
        query: true,
      },
    });
    const button = await getByRole("button", { name: /Create Issue/i });

    // Act
    await act(async () => {
      await userEvent.click(button);
    });
    // const button = await getByRole("button", { name: /Find Issue/i });

    // Assert
    expect(window.location.hash).toEqual("#/create");
  });

  test("should navigate to HomePage", async () => {
    // Arrange
    const { getByRole, findByText } = render(<App />, {
      wrappers: {
        theme: true,
        router: "/link",
        query: true,
      },
    });
    const cancelButton = await getByRole("button", { name: /Cancel/i });

    // Act
    await act(async () => {
      await userEvent.click(cancelButton);
    });

    // Assert
    expect(window.location.hash).toEqual("#/home");
    expect(await findByText(/No YouTrack issues found/i)).toBeInTheDocument();
  });

  test("should nothing happen when try to go to the same page", async () => {
    // Arrange
    const { getByRole } = render(<App />, {
      wrappers: {
        theme: true,
        router: "/link",
        query: true,
      },
    });
    const linkButton = await getByRole("button", { name: /Find Issue/i });

    // Act
    await act(async () => {
      await userEvent.click(linkButton);
    });

    // Assert
    expect(window.location.hash).toEqual("#/link");
  });
});
