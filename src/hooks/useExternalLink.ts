import { useCallback } from "react";
import get from "lodash/get";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import type { TicketContext } from "../types";
import type { Issue, Project } from "../services/youtrack/types";

type UseExternalLink = () => {
  getIssueUrl: (issueId: Issue["idReadable"]) => string,
  getProjectUrl: (projectId: Project["id"]) => string,
  getBaseUrl: () => string,
};

const useExternalLink: UseExternalLink = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const domain = get(context, ["settings", "domain"]);

  const getIssueUrl = useCallback((issueId: Issue["idReadable"]) => {
    if (!domain || !issueId) {
      return "#";
    } else {
      return `https://${domain}.youtrack.cloud/issue/${issueId}`;
    }
  }, [domain]);

  const getProjectUrl = useCallback((projectId: Project["id"]) => {
    if (!domain || !projectId) {
      return "#";
    } else {
      return `https://${domain}.youtrack.cloud/projects/${projectId}`;
    }
  }, [domain]);

  const getBaseUrl = useCallback(() => {
    if (!domain) {
      return "#";
    } else {
      return `https://${domain}.youtrack.cloud`;
    }
  }, [domain]);

  return { getIssueUrl, getProjectUrl, getBaseUrl };
};

export { useExternalLink };
