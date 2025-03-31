import { LoadingSpinner, useDeskproElements, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { Settings } from "@/types";
import { useCallback } from "react";
import { useIssueDeps } from "./hooks";
import { useParams, useNavigate, createSearchParams } from "react-router-dom";
import { useSetTitle } from "@/hooks";
import { ViewIssue } from "@/components";
import get from "lodash/get";
import type { FC } from "react";

const ViewIssuePage: FC = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const { isLoading, issue } = useIssueDeps(issueId);
  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const isUsingOAuth = context?.settings.use_permanent_token === false
  const issueIdReadable = get(issue, ["idReadable"], "");


  const onCreateIssueComment = useCallback(() => {
    if (!issueId) {
      return;
    }

    navigate({
      pathname: "/comment/create",
      search: `?${createSearchParams([
        ["issueId", issueId],
      ])}`,
    });
  }, [navigate, issueId]);

  useSetTitle(issueIdReadable);

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("edit", {
      type: "edit_button",
      payload: { type: "changePage", path: `/edit/${issueIdReadable}` }
    });
    registerElement("menu", {
      type: "menu",
      items: [
        {
          title: "Unlink issue",
          payload: { type: "unlinkIssue", issueId: issueIdReadable },
        },
        ...(isUsingOAuth
          ? [
            {
              title: "Logout",
              payload: { type: "logout" },
            },
          ]
          : []),],
    });
  }, [issueIdReadable]);

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ViewIssue issue={issue} onCreateIssueComment={onCreateIssueComment} />
  );
};

export { ViewIssuePage };
