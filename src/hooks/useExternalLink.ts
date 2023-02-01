import { useCallback } from "react";
import get from "lodash/get";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import type { TicketContext } from "../types";
import type { Issue } from "../services/youtrack/types";

type UseExternalLink = () => {
  getIssueUrl: (id: Issue["idReadable"]) => string,
};

const useExternalLink: UseExternalLink = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const domain = get(context, ["settings", "domain"]);

  const getIssueUrl = useCallback((id: Issue["idReadable"]) => {
    if (!domain || !id) {
      return "#";
    } else {
      return `https://${domain}.youtrack.cloud/issue/${id}`;
    }
  }, [domain]);

  return { getIssueUrl };
};

export { useExternalLink };
