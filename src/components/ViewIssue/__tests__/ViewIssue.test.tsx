import React from "react";
import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { ViewIssue } from "../ViewIssue";
import mockIssue from "./issue.json";
import type { Props } from "../ViewIssue";

const renderViewIssue = (props?: Partial<Props>) => render((
  <ViewIssue
    issue={props?.issue as never}
    onCreateIssueComment={props?.onCreateIssueComment || jest.fn()}
  />
), { wrappers: { theme: true } });

jest.mock('react-time-ago', () => jest.fn().mockReturnValue('7h 30m'));

describe("ViewIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderViewIssue({ issue: mockIssue as never});

    expect(await findByText(/Simple Deskpro Issue/i)).toBeInTheDocument();
    expect(await findByText(/SPDP-3/i)).toBeInTheDocument();
    expect(await findByText(/Simple Deskpro Project/i)).toBeInTheDocument();
    expect(await findByText(/one comment/i)).toBeInTheDocument();
  });
});
