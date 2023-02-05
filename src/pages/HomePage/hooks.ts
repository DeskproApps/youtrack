import { useState } from "react";
import get from "lodash/get";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityIssueListService } from "../../services/entityAssociation";
import { searchIssuesByIdsService } from "../../services/youtrack";
import { useQueryWithClient } from "../../hooks";
import { QueryKey } from "../../query";
import type { Issue } from "../../services/youtrack/types";
import type { TicketContext } from "../../types";

type UseLoadHomeDeps = () => {
  isLoading: boolean,
  issues: Issue[],
};

const useLoadHomeDeps: UseLoadHomeDeps = () => {
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
    [QueryKey.GET_ISSUES_BY_ID, ...entityIds],
    (client) => searchIssuesByIdsService(client, entityIds),
    { enabled: Boolean(entityIds.length) }
  );

  return {
    isLoading: [issues].every(({ isLoading }) => isLoading),
    issues: issues.data || [],
  };
};

export { useLoadHomeDeps };
