import React from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Info } from "./Info";
import { Comments } from "./Comments";
import type { FC } from "react";
import type { Props } from "./types";

const ViewIssue: FC<Props> = ({ issue }) => {
  return (
    <>
      <Info issue={issue} />
      <HorizontalDivider/>
      <Comments comments={issue.comments}/>
    </>
  );
};

export { ViewIssue };
