import React from "react";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useLoadHomeDeps } from "./hooks";
import type { FC } from "react";

const Home: FC = () => {
  const { entityIds, isLoading } = useLoadHomeDeps();

  useSetTitle("YouTrack Issues");

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      {entityIds.join(", ")}
    </>
  );
};

export { Home };
