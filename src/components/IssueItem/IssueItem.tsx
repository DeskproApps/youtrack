import * as React from "react";
import styled from "styled-components";
import get from "lodash/get";
import {
  Title,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityAssociationCountService } from "../../services/entityAssociation";
import { useExternalLink } from "../../hooks";
import { YouTrackLogo, Property, TwoProperties } from "../common";
import type { Issue } from "../../services/youtrack/types";

type Props = {
  issue: Issue,
  onClickTitle?: (issueId: Issue["id"]) => void,
};

const TitleLink = styled.a`
    color: ${({ theme }) => theme.colors.cyan100};
    text-decoration: none;
`;

const IssueItem: React.FC<Props> = ({ issue, onClickTitle }) => {
  const { getIssueUrl } = useExternalLink();

  const [ticketCount, setTicketCount] = React.useState<number>(0);

  const onClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClickTitle && onClickTitle(issue.id);
  }, [onClickTitle, issue]);

  useInitialisedDeskproAppClient((client) => {
    if (issue?.idReadable) {
      getEntityAssociationCountService(client, issue.idReadable).then(setTicketCount);
    }
  }, [issue]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? issue.summary
          : (<TitleLink href="#" onClick={onClick}>{issue.summary}</TitleLink>)
        }
        icon={<YouTrackLogo/>}
        link={getIssueUrl(issue.idReadable)}
      />
      <TwoProperties
        leftLabel="Issue ID"
        leftText={issue.idReadable}
        rightLabel="Project"
        rightText={get(issue, ["project", "name"], "-")}
      />
      <Property
        label="Deskpro Tickets"
        text={ticketCount}
      />
    </>
  );
};

export { IssueItem };
