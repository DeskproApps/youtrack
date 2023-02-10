import { baseRequest } from "./baseRequest";
import { ISSUE_FIELDS } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "./types";

const getIssueService = (
  client: IDeskproClient,
  issueId: Issue["id"],
) => {
  return baseRequest<Issue>(client, {
    url: `/issues/${issueId}`,
    queryParams: {
      fields: ISSUE_FIELDS.join(","),
    },
  });
};

export { getIssueService };
