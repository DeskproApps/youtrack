import React from "react";
import get from "lodash/get";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Title, P5 } from "@deskpro/app-sdk";
import { useExternalLink } from "../../../hooks";
import { mdToHtml } from "../../../utils";
import { nbsp } from "../../../constants";
import {
  Link,
  Property,
  Container,
  YouTrackLogo,
} from "../../common";
import type { FC } from "react";
import type { Props } from "../types";

const Info: FC<Props> = ({ issue }) => {
  const { getIssueUrl, getProjectUrl } = useExternalLink();

  return (
    <Container>
      <Title
        title={get(issue, ["summary"], "-")}
        link={getIssueUrl(issue.idReadable)}
        icon={<YouTrackLogo/>}
      />
      <Property label="Issue ID" text={get(issue, ["idReadable"], "-")} />
      <Property label="Description" text={(
        <P5>
          <span dangerouslySetInnerHTML={{ __html: mdToHtml(get(issue, ["description"]) || "-") }}/>
        </P5>
      )} />
      <Property label="Project" text={(
        <P5>
          {issue?.project?.name}{nbsp}
          <Link
            target="_blank"
            icon={faExternalLinkAlt}
            href={getProjectUrl(issue?.project?.id as string)}
          />
        </P5>
      )} />
    </Container>
  );
};

export { Info };
