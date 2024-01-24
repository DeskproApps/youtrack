import React from "react";
import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { Home } from "../Home";
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
        <Home
          onClickTitle={jest.fn()}
          issues={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            issues as Issue[]
          }
        />
      ),
      { wrappers: { theme: true } }
    );

    expect(await findByText(/Simple Project Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Default DP issue/i)).toBeInTheDocument();
    expect(await findByText(/Kanban Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Scrum Deskpro issue/i)).toBeInTheDocument();
  });

  test("empty issues array", async () => {
    const { findByText } = render((
      <Home issues={[]} onClickTitle={jest.fn()} />
    ), { wrappers: { theme: true } });

    expect(await findByText(/No YouTrack issues found/i)).toBeInTheDocument();
  });

  test("no issues were passed", async () => {
    const { findByText } = render((
      <Home issues={undefined} onClickTitle={jest.fn()}/>
    ), { wrappers: { theme: true } });

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });
});
