import { useMemo } from "react";
import { get, size, isEmpty } from "lodash";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { getEntityIssueListService } from "../services/entityAssociation";
import { searchIssuesByIdsService } from "../services/youtrack";
import { useQueryWithClient } from "./useQueryWithClient";
import { QueryKey } from "../query";
import type { Issue } from "../services/youtrack/types";
import type { TicketContext } from "../types";

type UseLinkedIssues = () => {
  isLoading: boolean,
  issues: Issue[],
};

const useLinkedIssues: UseLinkedIssues = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = get(context, ["data", "ticket", "id"]);

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_ISSUES, ticketId],
    (client) => getEntityIssueListService(client, ticketId),
    { enabled: Boolean(ticketId) },
  );

  const issueIds = useMemo(() => linkedIds.data || [], [linkedIds.data]);

  const issues = useQueryWithClient(
    [QueryKey.SEARCH_ISSUES_BY_ID, ...linkedIds.data || []],
    (client) => searchIssuesByIdsService(client, issueIds),
    { enabled: size(issueIds) > 0 },
  );

  return {
    isLoading: isEmpty(issueIds) ? false : [issues].every(({ isLoading }) => isLoading),
    issues: issues.data || [],
  };
};

export { useLinkedIssues };
