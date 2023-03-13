import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "./types";
import type { components } from "./openapi";

const createIssueCommentService = (
  client: IDeskproClient,
  issueId: Issue["id"],
  data: {
    text: NonNullable<components["schemas"]["IssueComment"]["text"]>,
  },
) => {
  return baseRequest(client, {
    url: `/issues/${issueId}/comments`,
    method: "POST",
    data,
  });
};

export { createIssueCommentService };
