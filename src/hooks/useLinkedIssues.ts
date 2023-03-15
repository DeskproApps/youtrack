import { useState } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
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

  const [entityIds, setEntityIds] = useState<Array<Issue["idReadable"]>>([]);

  useInitialisedDeskproAppClient((client) => {
    if (!ticketId) {
      return;
    }

    getEntityIssueListService(client, ticketId)
      .then((entities) => {
        if (Array.isArray(entities) && entities.length > 0) {
          setEntityIds(entities as Array<Issue["idReadable"]>);
        }
      })
      .catch(() => {});
  }, [ticketId]);

  const issues = useQueryWithClient(
    [QueryKey.SEARCH_ISSUES_BY_ID, ...entityIds],
    (client) => searchIssuesByIdsService(client, entityIds),
    { enabled: Boolean(entityIds.length) }
  );

  return {
    isLoading: isEmpty(entityIds) ? false : [issues].every(({ isLoading }) => isLoading),
    issues: issues.data || [],
  };
};

export { useLinkedIssues };
