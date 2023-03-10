import { baseRequest } from "./baseRequest";
import { ISSUE_FIELDS } from "./constants";
import type { Issue } from "./types";
import type { IssueValues } from "../../components/IssueForm";
import type { IDeskproClient } from "@deskpro/app-sdk";

const updateIssueService = (
  client: IDeskproClient,
  issueId: Issue["id"],
  data: IssueValues,
) => {
  return baseRequest<Issue>(client, {
    url: `/issues/${issueId}`,
    method: "POST",
    data,
    queryParams: {
      fields: ISSUE_FIELDS.join(","),
    },
  })
};

export { updateIssueService };
