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
  const instanceUrl = get(context, ["settings", "instance_url"]);

  const getIssueUrl = useCallback((issueId: Issue["idReadable"]) => {
    if (!instanceUrl || !issueId) {
      return "#";
    } else {
      return `${instanceUrl}/issue/${issueId}`;
    }
  }, [instanceUrl]);

  const getProjectUrl = useCallback((projectId: Project["id"]) => {
    if (!instanceUrl || !projectId) {
      return "#";
    } else {
      return `${instanceUrl}/projects/${projectId}`;
    }
  }, [instanceUrl]);

  const getBaseUrl = useCallback(() => {
    if (!instanceUrl) {
      return "#";
    } else {
      return instanceUrl;
    }
  }, [instanceUrl]);

  return { getIssueUrl, getProjectUrl, getBaseUrl };
};

export { useExternalLink };
