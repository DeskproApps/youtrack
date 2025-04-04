import { useState, useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useReplyBox, useAutoCommentLinkedIssue } from "../hooks";
import { deleteEntityIssueService } from "../services/entityAssociation";
import type { TicketContext } from "../types";
import type { Issue } from "../services/youtrack/types";

type UseUnlinkIssue = () => {
  isLoading: boolean,
  unlinkIssue: (issueId: Issue["idReadable"]) => void,
};

const useUnlinkIssue: UseUnlinkIssue = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { deleteSelectionState } = useReplyBox();
  const { addUnlinkCommentIssue } = useAutoCommentLinkedIssue();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticketId = get(context, ["data", "ticket", "id"]);

  const unlinkIssue = useCallback((issueId: Issue["idReadable"]) => {
    if (!client || !issueId || !ticketId) {
      return;
    }

    setIsLoading(true);

    Promise
      .all([
        deleteEntityIssueService(client, ticketId, issueId),
        addUnlinkCommentIssue(issueId),
        deleteSelectionState(issueId, "note"),
        deleteSelectionState(issueId, "email"),
      ])
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      });
  }, [client, ticketId, navigate, deleteSelectionState, addUnlinkCommentIssue]);

  return { isLoading, unlinkIssue }
};

export { useUnlinkIssue };
