import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { PeriodIssueCustomField } from "../PeriodIssueCustomField";
import field from "./mocks/customFields/PeriodIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("PeriodIssueCustomField", () => {
    test("render", async () => {
      const { findByText } = render(
        <PeriodIssueCustomField {...field as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/1d 30m/i)).toBeInTheDocument();
    });

    test.each([undefined, null, []])("empty value: %p", async (fieldValue) => {
      const { findByText } = render(
        <PeriodIssueCustomField {...field as never} value={fieldValue} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
