import { useState, useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityIssueService } from "../services/entityAssociation";
import type { TicketContext } from "../types";
import type { Issue } from "../services/youtrack/types";

type UseUnlinkIssue = () => {
  isLoading: boolean,
  unlinkIssue: (issueId: Issue["id"]) => void,
};

const useUnlinkIssue: UseUnlinkIssue = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticketId = get(context, ["data", "ticket", "id"]);

  const unlinkIssue = useCallback((issueId: Issue["id"]) => {
    if (!client || !issueId) {
      return;
    }

    setIsLoading(true);

    deleteEntityIssueService(client, ticketId, issueId)
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      });
  }, [client, ticketId, navigate]);

  return { isLoading, unlinkIssue }
};

export { useUnlinkIssue };
