import React from "react";
import { cleanup } from "@testing-library/react";
import { render } from "../../../testing";
import { LinkIssue } from "../LinkIssue";
import { getOption } from "../../../utils";
import issues from "./issues.json";
import type { Issue } from "../../../services/youtrack/types";

jest.mock("../../../services/entityAssociation/getEntityAssociationCountService", () => ({
  getEntityAssociationCountService: () => Promise.resolve(2),
}));

describe("LinkIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render(
      (
        <LinkIssue
          value=""
          isFetching={false}
          isSubmitting={false}
          onChange={() => {}}
          onClear={() => {}}
          issues={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            issues as Issue[]
        }
          projects={[]}
          selectedProject={getOption("id1", "project")}
          onChangeSelectProject={() => {}}
          onCancel={() => {}}
          onLinkIssues={() => {}}
          selectedIssues={[]}
          onChangeSelectedIssue={() => {}}
        />
      ),
      { wrappers: { theme: true } },
    );


    expect(await findByText(/Simple Project Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Default DP issue/i)).toBeInTheDocument();
    expect(await findByText(/Kanban Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Scrum Deskpro issue/i)).toBeInTheDocument();
  });

  test("empty issues array", async () => {
    const { findByText } = render(
      (
        <LinkIssue
          value=""
          isFetching={false}
          isSubmitting={false}
          onChange={() => {}}
          onClear={() => {}}
          issues={[]}
          projects={[]}
          selectedProject={getOption("id1", "project")}
          onChangeSelectProject={() => {}}
          onCancel={() => {}}
          onLinkIssues={() => {}}
          selectedIssues={[]}
          onChangeSelectedIssue={() => {}}
        />
      ),
      { wrappers: { theme: true } },
    );

    expect(await findByText(/No YouTrack issues found/i)).toBeInTheDocument();
  });

  test("no issues were passed", async () => {
    const { findByText } = render(
      (
        <LinkIssue
          value=""
          isFetching={false}
          isSubmitting={false}
          onChange={() => {}}
          onClear={() => {}}
          issues={undefined}
          projects={[]}
          selectedProject={getOption("id1", "project")}
          onChangeSelectProject={() => {}}
          onCancel={() => {}}
          onLinkIssues={() => {}}
          selectedIssues={[]}
          onChangeSelectedIssue={() => {}}
        />
      ),
      { wrappers: { theme: true } },
    );

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });
});
