import { cleanup, renderHook, act } from "@testing-library/react";
import { createIssueCommentService } from "../../../services/youtrack";
import { useAutoCommentLinkedIssue } from "../../useAutoCommentLinkedIssue";
import type { Result } from "../../useAutoCommentLinkedIssue";

jest.mock("../../../services/youtrack/createIssueCommentService");

jest.mock("@deskpro/app-sdk", () => ({
  ...jest.requireActual("@deskpro/app-sdk"),
  useDeskproLatestAppContext: () => ({
    context: {
      settings: { add_comment_when_linking_issue: false },
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

  test("shouldn't to called the service to create an automatic comment (link issue)", async () => {
    (createIssueCommentService as jest.Mock).mockResolvedValueOnce(() => Promise.resolve());

    const { result } = renderHook<Result, unknown>(() => useAutoCommentLinkedIssue());

    await act(async () => {
      await result.current.addLinkCommentIssue("2-40");
    });

    expect(createIssueCommentService).not.toHaveBeenCalled();
  });

  test("shouldn't to called the service to create an automatic comment (unlink issue)", async () => {
    (createIssueCommentService as jest.Mock).mockResolvedValueOnce(() => Promise.resolve());

    const { result } = renderHook<Result, unknown>(() => useAutoCommentLinkedIssue());

    await act(async () => {
      await result.current.addUnlinkCommentIssue("2-40");
    });

    expect(createIssueCommentService).not.toHaveBeenCalled();
  });
});
