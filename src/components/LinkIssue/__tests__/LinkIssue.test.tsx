import React from "react";
import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { LinkIssue } from "../LinkIssue";
import { getOption } from "../../../utils";
import issues from "./issues.json";
import type { Props } from "../LinkIssue";

jest.mock("../../../services/entityAssociation/getEntityAssociationCountService", () => ({
  getEntityAssociationCountService: () => Promise.resolve(2),
}));

const renderLinkIssue = (props: Partial<Props>) => render((
  <LinkIssue
    isFetching={props?.isFetching || false}
    isSubmitting={props?.isSubmitting || false}
    onChangeSearch={props?.onChangeSearch || jest.fn()}
    issues={props?.issues || []}
    projects={props?.projects || []}
    selectedProject={props?.selectedProject || getOption("id1", "project")}
    onChangeSelectProject={props?.onChangeSelectProject || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    onLinkIssues={props?.onLinkIssues || jest.fn()}
    selectedIssues={props?.selectedIssues || []}
    onChangeSelectedIssue={props?.onChangeSelectedIssue || jest.fn()}
    onNavigateToCreateIssue={props?.onNavigateToCreateIssue || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderLinkIssue({
      issues: issues as never[],
      selectedProject: getOption("id1", "project"),
    });

    expect(await findByText(/Simple Project Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Default DP issue/i)).toBeInTheDocument();
    expect(await findByText(/Kanban Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Scrum Deskpro issue/i)).toBeInTheDocument();
  });

  test("empty issues array", async () => {
    const { findByText } = renderLinkIssue({
      selectedProject: getOption("id1", "project"),
    });

    expect(await findByText(/No YouTrack issues found/i)).toBeInTheDocument();
  });

  test("no issues were passed", async () => {
    const { findByText } = renderLinkIssue({
      issues: {} as never,
      selectedProject: getOption("id1", "project"),
    });

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });
});
