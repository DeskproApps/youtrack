import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "./types";

const searchIssuesService = (
  client: IDeskproClient,
  q: string,
) => {
  return baseRequest<Issue[]>(client, {
    url: `/issues`,
    queryParams: {
      fields: [
        "id",
        "idReadable",
        "summary",
        "description",
        "project(id,shortName,name)",
        "comments(text,textPreview)",
        "customFields(id,name,value(id,name,value))",
      ].join(","),
      query: q
    }
  });
};

const searchIssuesBySummaryService = (
  client: IDeskproClient,
  summary: NonNullable<Issue["summary"]>,
) => {
  return searchIssuesService(client, `summary:${summary}`);
};

const searchIssuesByIdsService = (
  client: IDeskproClient,
  readableIds: Array<Issue["idReadable"]>,
) => {
  return searchIssuesService(client, `issue id:${readableIds.join(",")}`);
};

export { searchIssuesBySummaryService, searchIssuesByIdsService };
