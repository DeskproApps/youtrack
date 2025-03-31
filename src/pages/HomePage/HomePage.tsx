import { Home } from "@/components";
import { LoadingSpinner, useDeskproElements, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { Settings } from "@/types";
import { useCallback } from "react";
import { useLinkedIssues, useSetBadgeCount, useSetTitle } from "@/hooks";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";
import type { Issue } from "@/services/youtrack/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { issues, isLoading } = useLinkedIssues();
  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const isUsingOAuth = context?.settings.use_permanent_token === false

  useSetTitle("YouTrack Issues");
  useSetBadgeCount(issues);

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/link" },
    });
    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [
          {
            title: "Logout",
            payload: { type: "logout" },
          }],
      })
    }
  });

  const onClickTitle = useCallback((issueId: Issue["id"]) => {
    navigate(`/view/${issueId}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (<Home issues={issues} onClickTitle={onClickTitle} />);
};

export { HomePage };
