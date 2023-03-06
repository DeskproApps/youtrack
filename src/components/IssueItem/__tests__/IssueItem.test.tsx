import * as React from "react";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IssueItem } from "../IssueItem";
import { render } from "../../../testing";

const issue = {
  $type: "Issue",
  id: "2-40",
  idReadable: "SPDP-3",
  summary: "Simple Deskpro Issue",
  project: {
    $type: "Project",
    id: "0-4",
    name: "Simple Deskpro",
    shortName: "SPDP",
  },
  comments: [],
  customFields: [],
  description: "",
};

jest.mock("../../../services/entityAssociation/getEntityAssociationCountService", () => ({
  getEntityAssociationCountService: () => Promise.resolve(0)
}))

describe("IssueItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render(<IssueItem issue={issue as never}/>, { wrappers: { theme: true } });

    expect(await findByText(/Simple Deskpro Issue/i)).toBeInTheDocument();
  });

  test("click on title", async () => {
    const onClick = jest.fn();

    const { findByText } = render(
      <IssueItem issue={issue as never} onClickTitle={onClick} />,
      { wrappers: { theme: true } },
    );

    await userEvent.click(await findByText(/Simple Deskpro Issue/i));

    expect(onClick).toBeCalledTimes(1);
  });
});
