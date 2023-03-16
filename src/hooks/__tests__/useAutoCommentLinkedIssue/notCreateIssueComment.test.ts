import { cleanup } from "@testing-library/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAutoCommentLinkedIssue } from "../../useAutoCommentLinkedIssue";

jest.mock("../../../services/youtrack/createIssueCommentService");

jest.mock("@deskpro/app-sdk", () => ({
  ...jest.requireActual("@deskpro/app-sdk"),
  useDeskproLatestAppContext: () => ({
    context: {
      settings: { dont_add_comment_when_linking_issue: true },
      data: {
        ticket: { id: "215", subject: "Big ticket", permalinkUrl: "https://permalink.url" },
      },
    },
  }),
}));

describe("useAutoCommentLinkedIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test.todo("shouldn't to called the service to create an automatic comment (link issue)");

  test.todo("shouldn't to called the service to create an automatic comment (unlink issue)");
});
