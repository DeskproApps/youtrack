import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
import { Avatar } from "@deskpro/deskpro-ui";
import {
  P1,
  P11,
  Title,
  Stack,
} from "@deskpro/app-sdk";
import { useExternalLink } from "../../../hooks";
import { mdToHtml } from "../../../utils";
import { Container } from "../../common";
import type { FC } from "react";
import type { Issue } from "../../../services/youtrack/types";

type Props = {
  comments: Issue["comments"],
};

const TimeAgo = styled(ReactTimeAgo)`
    color: ${({ theme }) => theme.colors.grey80};
`;

const Author = styled(Stack)`
    width: 35px;
`;

const Comment = styled(P1)`
    width: calc(100% - 35px);
    white-space: pre-line;

    p {
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0;
    }

    p:first-child {
        margin-top: 0;
    }

    img {
        width: 100%;
        height: auto;
    }
`;

const Comments: FC<Props> = ({ comments = [] }) => {
  const { getBaseUrl } = useExternalLink();

  return (
    <Container>
      <Title title={`Comments (${comments.length})`} />

      {comments
        .sort(({ created: a }, { created: b }) => (b as number) - (a as number))
        .map(({ id, author, created, text }) => (
          <Stack key={id} wrap="nowrap" gap={6} style={{ marginBottom: 10 }}>
            <Author vertical>
              <Avatar
                size={18}
                name={get(author, ["fullName"], "-")}
                backupIcon={faUser}
                imageUrl={`${getBaseUrl()}${get(author, ["avatarUrl"], "")}`}
              />
              <P11>
                <TimeAgo date={new Date(created || Date.now())} timeStyle="mini" />
              </P11>
            </Author>
            <Comment dangerouslySetInnerHTML={{ __html: mdToHtml(text || "-") }} />
          </Stack>
        ))
      }
    </Container>
  );
};

export { Comments };
