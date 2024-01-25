import { cleanup } from "@testing-library/react";
import { render } from "../../../../../../testing";
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <PeriodIssueCustomField {...field as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/1d 30m/i)).toBeInTheDocument();
    });

    test.each([undefined, null, []])("empty value: %p", async (fieldValue) => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <PeriodIssueCustomField {...field as any} value={fieldValue} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
