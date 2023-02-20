import React from "react";
import { useParams } from "react-router-dom";
import get from "lodash/get";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useIssueDeps } from "./hooks";
import { ViewIssue } from "../../components";
import type { FC } from "react";

const ViewIssuePage: FC = () => {
  const { issueId } = useParams();
  const { isLoading, issue } = useIssueDeps(issueId);
  const issueIdReadable = get(issue, ["idReadable"], "");

  useSetTitle(issueIdReadable);

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink issue",
        payload: { type: "unlinkIssue", issueId: issueIdReadable },
      }],
    });
  }, [issueIdReadable]);

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <ViewIssue issue={issue} />
  );
};

export { ViewIssuePage };
