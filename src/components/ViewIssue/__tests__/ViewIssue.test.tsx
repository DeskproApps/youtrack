import React from "react";
import { cleanup } from "@testing-library/react";
import { render } from "../../../testing";
import { ViewIssue } from "../ViewIssue";
import issue from "./issue.json";

describe("ViewIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <ViewIssue issue={issue}/>,
      { wrappers: { theme: true } }
    );

    expect(await findByText(/Simple Deskpro Issue/i)).toBeInTheDocument();
    expect(await findByText(/SPDP-3/i)).toBeInTheDocument();
    expect(await findByText(/Simple Deskpro Project/i)).toBeInTheDocument();
    expect(await findByText(/one comment/i)).toBeInTheDocument();
  });
});
