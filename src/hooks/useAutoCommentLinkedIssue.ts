import { useCallback, useState } from "react";
import get from "lodash/get";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { createIssueCommentService } from "../services/youtrack";
import type { Issue } from "../services/youtrack/types";
import type { components } from "../services/youtrack/openapi";
import type { TicketContext } from "../types";

export type Result = {
  isLoading: boolean,
  addLinkCommentIssue: (issueId: Issue["id"]) => Promise<void|components["schemas"]["IssueComment"]>,
  addUnlinkCommentIssue: (issueId: Issue["id"]) => Promise<void|components["schemas"]["IssueComment"]>,
};

const getLinkedMessage = (ticketId: string, link?: string): string => {
  return `Linked to Deskpro ticket ${ticketId}${link ? `, ${link}` : ""}`
};

const getUnlinkedMessage = (ticketId: string, link?: string): string => {
  return `Unlinked from Deskpro ticket ${ticketId}${link ? `, ${link}` : ""}`
};

const useAutoCommentLinkedIssue = (): Result => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isEnable = get(context, ["settings", "add_comment_when_linking_issue"], false);
  const ticketId = get(context, ["data", "ticket", "id"]);
  const permalink = get(context, ["data", "ticket", "permalinkUrl"]);

  const addLinkCommentIssue = useCallback((issueId: Issue["id"]) => {
    if (!client || !isEnable) {
      return Promise.resolve();
    }

    setIsLoading(true);
    return createIssueCommentService(client, issueId, { text: getLinkedMessage(ticketId, permalink) })
      .finally(() => setIsLoading(false));
  }, [client, isEnable, ticketId, permalink]);

  const addUnlinkCommentIssue = useCallback((issueId: Issue["id"]) => {
    if (!client || !isEnable) {
      return Promise.resolve();
    }

    setIsLoading(true)
    return createIssueCommentService(client, issueId, { text: getUnlinkedMessage(ticketId, permalink) })
      .finally(() => setIsLoading(false));
  }, [client, isEnable, ticketId, permalink]);

  return { isLoading, addLinkCommentIssue, addUnlinkCommentIssue };
};

export {
  getLinkedMessage,
  getUnlinkedMessage,
  useAutoCommentLinkedIssue,
};
