import React, { Fragment } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFound } from "../common";
import { IssueItem } from "../IssueItem";
import type { FC } from "react";
import type { Issue } from "../../services/youtrack/types";

type Props = {
  issues?: Issue[],
  onClickTitle: (issueId: Issue["id"]) => void,
};

const Home: FC<Props> = ({ issues, onClickTitle }) => {
  return (
    <Container>
      {!Array.isArray(issues)
        ? <NoFound/>
        : (issues.length === 0)
        ? (<NoFound text="No YouTrack issues found" />)
        : issues.map((issue) => (
          <Fragment key={issue.id}>
            <IssueItem issue={issue} onClickTitle={onClickTitle} />
            <HorizontalDivider style={{ margin: "10px 0" }}/>
          </Fragment>
        ))
      }
    </Container>
  );
};

export { Home };
