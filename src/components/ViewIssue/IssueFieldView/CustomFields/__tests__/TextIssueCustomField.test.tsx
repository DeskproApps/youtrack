import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { TextIssueCustomField } from "../TextIssueCustomField";
import field from "./mocks/customFields/TextIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("TextIssueCustomField", () => {
    test("render", async () => {
      const { findByText } = render(
        <TextIssueCustomField {...field as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/Custom text field value value value/i)).toBeInTheDocument();
    });

    test("empty value", async () => {
      const { findByText } = render(
        <TextIssueCustomField {...field as never} value={null} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
