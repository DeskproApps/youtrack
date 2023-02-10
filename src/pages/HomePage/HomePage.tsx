import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { Home } from "../../components";
import { useSetTitle, useSetBadgeCount } from "../../hooks";
import { useLoadHomeDeps } from "./hooks";
import type { FC } from "react";
import type { Issue } from "../../services/youtrack/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { issues, isLoading } = useLoadHomeDeps();

  useSetTitle("YouTrack Issues");
  useSetBadgeCount(issues);

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/link" },
    });
  });

  const onClickTitle = useCallback((issueId: Issue["id"]) => {
    navigate(`/view/${issueId}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (<Home issues={issues} onClickTitle={onClickTitle} />);
};

export { HomePage };