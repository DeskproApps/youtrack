import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityIssueService } from "../../services/entityAssociation";
import { useSetTitle } from "../../hooks";
import { useSearch } from "./hooks";
import { getOption } from "../../utils";
import { LinkIssue } from "../../components";
import type { FC, ChangeEvent } from "react";
import type { Option, TicketContext } from "../../types";
import type { Issue, Project } from "../../services/youtrack/types";

const getFilteredIssues = (
  issues: Issue[],
  selectedProject: Option<Project["id"]|"any">
) => {
  if (selectedProject.value === "any") {
    return issues
  }

  return issues.filter(({ project }) => project?.id === selectedProject.value);
};

const LinkPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const [search, setSearch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);
  const [selectedProject, setSelectedProject] = useState<Option<Project["id"]|"any">>(getOption("any", "Any"));

  const { isFetching, issues, projects } = useSearch(search);

  const ticketId = get(context, ["data", "ticket", "id"]);

  const onChangeSearch = useCallback(({ target: { value: q }}: ChangeEvent<HTMLInputElement>) => {
    if (!client) {
      return;
    }

    setSearch(q);
  }, [client]);

  const onClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const onChangeSelectProject = useCallback((option: Option<Project["id"]|"any">) => {
    setSelectedProject(option);
  }, []);

  const onCancel = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onChangeSelectedIssue = (issue: Issue) => {
    let newSelectedIssues = cloneDeep(selectedIssues);

    if (selectedIssues.some(({ id }) => issue.id === id)) {
      newSelectedIssues = selectedIssues.filter((selectedIssue) => selectedIssue.id !== issue.id);
    } else {
      newSelectedIssues.push(issue);
    }

    setSelectedIssues(newSelectedIssues);
  };

  const onLinkIssues = useCallback(() => {
    if (!client || selectedIssues.length === 0) {
      return;
    }

    setIsSubmitting(true);
    Promise
      .all([
        ...selectedIssues.map((issue) => setEntityIssueService(client, ticketId, issue.idReadable))
      ])
      .then(() => {
        setIsSubmitting(false);
        navigate("/home")
      });
  }, [client, navigate, ticketId, selectedIssues]);

  useSetTitle("Link Issues");

  return (
    <LinkIssue
      onChange={onChangeSearch}
      onClear={onClearSearch}
      value={search}
      isFetching={isFetching}
      isSubmitting={isSubmitting}
      issues={getFilteredIssues(issues, selectedProject)}
      projects={projects}
      selectedProject={selectedProject}
      onChangeSelectProject={onChangeSelectProject}
      onCancel={onCancel}
      onLinkIssues={onLinkIssues}
      selectedIssues={selectedIssues}
      onChangeSelectedIssue={onChangeSelectedIssue}
    />
  );
};

export { LinkPage };
