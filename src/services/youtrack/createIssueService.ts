import { baseRequest } from "./baseRequest";
import { ISSUE_FIELDS } from "./constants";
import type { Issue } from "./types";
import type { IssueValues } from "../../components/IssueForm";
import type { IDeskproClient } from "@deskpro/app-sdk";

const createIssueService = (client: IDeskproClient, data: IssueValues) => {
  return baseRequest<Issue>(client, {
    url: `/issues`,
    method: "POST",
    data,
    queryParams: {
      fields: ISSUE_FIELDS.join(","),
    },
  })
};

export { createIssueService };
