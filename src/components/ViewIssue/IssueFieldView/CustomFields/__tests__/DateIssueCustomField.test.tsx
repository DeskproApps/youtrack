import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { DateIssueCustomField } from "../DateIssueCustomField";
import field from "./mocks/customFields/DateIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });


  describe("DateIssueCustomField", () => {
    test("render", async () => {
      const { findByText } = render(
        <DateIssueCustomField {...field as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/14 Feb, 2023/i)).toBeInTheDocument();
    });

    test.each([undefined, null, {}])("empty value: %p", async (fieldValue) => {
      const { findByText } = render(
        <DateIssueCustomField {...field as never} value={fieldValue} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
