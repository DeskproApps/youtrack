import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { SingleUserIssueCustomField } from "../SingleUserIssueCustomField";
import field from "./mocks/customFields/SingleUserIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("SingleUserIssueCustomField", () => {
    test("render", async () => {
      const { findByText } = render(
        <SingleUserIssueCustomField {...field as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/Armen Tamzarian/i)).toBeInTheDocument();
    });

    test.each([undefined, null, [], {}])("empty value: %p", async (fieldValue) => {
      const { findByText } = render(
        <SingleUserIssueCustomField {...field as never} value={fieldValue} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
