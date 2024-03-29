import React from "react";
import get from "lodash/get";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Info } from "./Info";
import { IssueFieldView } from "./IssueFieldView";
import { Comments } from "./Comments";
import type { FC } from "react";
import type { Props } from "./types";

const ViewIssue: FC<Props> = ({ issue, onCreateIssueComment }) => {
  return (
    <>
      <Info issue={issue} />
      <IssueFieldView fields={get(issue, ["customFields"], [])} />
      <HorizontalDivider/>
      <Comments comments={issue.comments} onCreateIssueComment={onCreateIssueComment} />
    </>
  );
};

export { ViewIssue };
