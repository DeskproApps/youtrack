import React from "react";
import get from "lodash/get";
import { Title } from "@deskpro/app-sdk";
import { useExternalLink } from "../../../hooks";
import { mdToHtml } from "../../../utils";
import { Container, Comment } from "../../common";
import type { FC } from "react";
import type { Issue } from "../../../services/youtrack/types";

type Props = {
  comments: Issue["comments"],
  onCreateIssueComment: () => void,
};

const Comments: FC<Props> = ({ comments = [], onCreateIssueComment }) => {
  const { getBaseUrl } = useExternalLink();

  return (
    <Container>
      <Title title={`Comments (${comments.length})`} onClick={onCreateIssueComment} />

      {comments
        .sort(({ created: a }, { created: b }) => (b as number) - (a as number))
        .map(({ id, author, created, text }) => (
          <Comment
            key={id}
            text={mdToHtml(text || "-")}
            name={get(author, ["fullName"], "-")}
            avatarUrl={`${getBaseUrl()}${get(author, ["avatarUrl"], "")}`}
            date={new Date(created || Date.now())}
          />
        ))
      }
    </Container>
  );
};

export { Comments };
