import { getOption, getEntityMetadata } from "@/utils";
import { LinkIssue } from "@/components";
import { setEntityIssueService } from "@/services/entityAssociation";
import { useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./hooks";
import { useSetTitle, useReplyBox, useAutoCommentLinkedIssue } from "@/hooks";
import { useState, useCallback } from "react";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import type { FC, ChangeEvent } from "react";
import type { Issue, Project } from "@/services/youtrack/types";
import type { Option, Settings } from "@/types";

const getFilteredIssues = (
  issues: Issue[],
  selectedProject: Option<Project["id"] | "any">
) => {
  if (selectedProject.value === "any") {
    return issues
  }

  return issues.filter(({ project }) => project?.id === selectedProject.value);
};

const LinkPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { setSelectionState } = useReplyBox();
  const { addLinkCommentIssue } = useAutoCommentLinkedIssue();
  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const isUsingOAuth = context?.settings.use_permanent_token === false

  const [search, setSearch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);
  const [selectedProject, setSelectedProject] = useState<Option<Project["id"] | "any">>(getOption("any", "Any"));

  const { isFetching, issues, projects } = useSearch(search);

  const ticketId = get(context, ["data", "ticket", "id"]);

  const onChangeSearch = useCallback(({ target: { value: q } }: ChangeEvent<HTMLInputElement>) => {
    if (!client) {
      return;
    }

    setSearch(q);
  }, [client]);

  const onClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const onChangeSelectProject = useCallback((option: Option<Project["id"] | "any">) => {
    setSelectedProject(option);
  }, []);

  const onCancel = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onNavigateToCreateIssue = useCallback(() => navigate("/create"), [navigate]);

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
    if (!client || selectedIssues.length === 0 || !ticketId) {
      return;
    }

    setIsSubmitting(true);
    Promise
      .all([
        ...selectedIssues.map((issue) => {
          return setEntityIssueService(client, ticketId, issue.idReadable, getEntityMetadata(issue))
        }),
        ...selectedIssues.map((issue) => addLinkCommentIssue(issue.id)),
        ...selectedIssues.map((issue) => setSelectionState(issue.idReadable, true, "email")),
        ...selectedIssues.map((issue) => setSelectionState(issue.idReadable, true, "note")),
      ])
      .then(() => {
        setIsSubmitting(false);
        navigate("/home")
      });
  }, [client, navigate, ticketId, selectedIssues, setSelectionState, addLinkCommentIssue]);

  useSetTitle("Link Issues");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [
          {
            title: "Logout",
            payload: { type: "logout" },
          }],
      })
    }
  });

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
      onNavigateToCreateIssue={onNavigateToCreateIssue}
    />
  );
};

export { LinkPage };
