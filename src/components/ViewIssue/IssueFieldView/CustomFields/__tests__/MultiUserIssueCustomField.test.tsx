import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { MultiUserIssueCustomField } from "../MultiUserIssueCustomField";
import field from "./mocks/customFields/MultiUserIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("MultiUserIssueCustomField", () => {
    test("render", async () => {
      const { findByText } = render(
        <MultiUserIssueCustomField {...field as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/guest/i)).toBeInTheDocument();
      expect(await findByText(/Armen Tamzarian/i)).toBeInTheDocument();
      expect(await findByText(/david.anjonrin/i)).toBeInTheDocument();
    });

    test.each([undefined, null, []])("empty value: %p", async (fieldValue) => {
      const { findByText } = render(
        <MultiUserIssueCustomField {...field as never} value={fieldValue} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
