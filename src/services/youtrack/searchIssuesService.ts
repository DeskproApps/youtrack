import { baseRequest } from "./baseRequest";
import { ISSUE_FIELDS } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "./types";
import type { RequestParams } from "../../types";

const searchIssuesService = (
  client: IDeskproClient,
  q: string,
  options: Pick<RequestParams, "skipParseQueryParams"> = {},
) => {
  return baseRequest<Issue[]>(client, {
    url: `/issues`,
    queryParams: {
      fields: ISSUE_FIELDS.join(","),
      query: q
    },
    ...options,
  });
};

const searchIssuesBySummaryService = (
  client: IDeskproClient,
  summary: NonNullable<Issue["summary"]>,
) => {
  return searchIssuesService(client, `summary:${summary}`);
};

const searchIssuesByIdsService = async(
  client: IDeskproClient,
  readableIds: Array<Issue["idReadable"]>,
) => {

  try {
    return await  searchIssuesService(
      client,
      `issue id:${readableIds.join(",")}`,
      { skipParseQueryParams: true },
    );
  } catch {
    return []
  }

};

export { searchIssuesBySummaryService, searchIssuesByIdsService };
