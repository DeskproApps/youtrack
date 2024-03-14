import React, { Fragment } from "react";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Stack, Checkbox } from "@deskpro/deskpro-ui";
import { TwoButtonGroup, HorizontalDivider } from "@deskpro/app-sdk";
import { getOption } from "../../utils";
import { IssueItem } from "../IssueItem";
import {
  Card,
  Search,
  Button,
  NoFound,
  CardBody,
  CardMedia,
  Container,
  SingleSelect,
} from "../common";
import type { FC } from "react";
import type { Option } from "../../types";
import type { Issue, Project } from "../../services/youtrack/types";
import type { Props as SearchProps } from "../common/Search";

type Props = {
  value: string,
  isFetching: boolean,
  isSubmitting: boolean,
  onChange: SearchProps["onChange"],
  onClear: SearchProps["onClear"],
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
  value,
  issues,
  onClear,
  onCancel,
  onChange,
  projects,
  isFetching,
  onLinkIssues,
  isSubmitting,
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
          value={value}
          onClear={onClear}
          onChange={onChange}
          isFetching={isFetching}
        />

        <SingleSelect
          id="project"
          label="Project"
          showInternalSearch
          value={selectedProject}
          options={[
            getOption("any", "Any"),
            ...projects.map(({ id, name }) => getOption(id, name))
          ]}
          onChange={onChangeSelectProject}
        />

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
