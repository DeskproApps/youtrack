import React from "react";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { Home } from "../../components";
import { useSetTitle } from "../../hooks";
import { useLoadHomeDeps } from "./hooks";
import type { FC } from "react";

const HomePage: FC = () => {
  const { issues, isLoading } = useLoadHomeDeps();

  useSetTitle("YouTrack Issues");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/link" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (<Home issues={issues} />);
};

export { HomePage };
