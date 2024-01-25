import React, { Fragment } from "react";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Stack, Checkbox } from "@deskpro/deskpro-ui";
import { Search, TwoButtonGroup, HorizontalDivider, Select } from "@deskpro/app-sdk";
import { getOption } from "../../utils";
import { IssueItem } from "../IssueItem";
import {
  Card,
  Label,
  Button,
  NoFound,
  CardBody,
  CardMedia,
  Container,
} from "../common";
import type { FC } from "react";
import type { Option } from "../../types";
import type { Issue, Project } from "../../services/youtrack/types";

export type Props = {
  isFetching: boolean,
  isSubmitting: boolean,
  onChangeSearch: (q: string) => void,
  issues?: Issue[],
  projects: Project[],
  selectedProject: Option<Project["id"]|"any">,
  onChangeSelectProject: (o: Option<Project["id"]|"any">) => void,
  onCancel: () => void,
  onLinkIssues: () => void,
  selectedIssues: Array<Issue>,
  onChangeSelectedIssue: (issue: Issue) => void,
  onNavigateToCreateIssue: () => void,
};

const LinkIssue: FC<Props> = ({
  issues,
  onCancel,
  projects,
  isFetching,
  onLinkIssues,
  isSubmitting,
  onChangeSearch,
  selectedIssues,
  selectedProject,
  onChangeSelectProject,
  onChangeSelectedIssue,
  onNavigateToCreateIssue,
}) => {
  return (
    <>
      <Container>
        <TwoButtonGroup
          selected="one"
          oneLabel="Find Issue"
          oneIcon={faSearch}
          twoLabel="Create Issue"
          twoIcon={faPlus}
          oneOnClick={() => {}}
          twoOnClick={onNavigateToCreateIssue}
        />
      </Container>

      <Container>
        <Search
          onChange={onChangeSearch}
          isFetching={isFetching}
        />

        <Label htmlFor="project" label="Project">
          <Select<string|"any">
            id="project"
            showInternalSearch
            value={selectedProject as never}
            options={[
              getOption("any", "Any"),
              ...projects.map(({ id, name }) => getOption(id, name)),
            ]}
            onChange={onChangeSelectProject as never}
          />
        </Label>

        <Stack justify="space-between" style={{ paddingBottom: "4px" }}>
          <Button
            disabled={selectedIssues.length === 0 || isSubmitting}
            loading={isSubmitting}
            text="Link Issue"
            onClick={onLinkIssues}
          />
          <Button
            text="Cancel"
            onClick={onCancel}
            intent="secondary"
          />
        </Stack>
      </Container>

      <HorizontalDivider style={{ marginBottom: 10 }} />

      <Container>
        {!Array.isArray(issues)
          ? <NoFound/>
          : (issues.length === 0)
          ? (<NoFound text="No YouTrack issues found" />)
          : issues.map((issue) => (
              <Fragment key={issue.id}>
                <Card>
                  <CardMedia>
                    <Checkbox
                      size={12}
                      checked={selectedIssues.some(({ id }) => issue.id === id)}
                      onChange={() => onChangeSelectedIssue(issue)}
                      containerStyle={{ marginTop: 2 }}
                    />
                  </CardMedia>
                  <CardBody>
                    <IssueItem issue={issue} onClickTitle={() => onChangeSelectedIssue(issue)} />
                  </CardBody>
                </Card>
                <HorizontalDivider style={{ margin: "10px 0" }} />
              </Fragment>
            ))
        }
      </Container>
    </>
  );
};

export { LinkIssue };
