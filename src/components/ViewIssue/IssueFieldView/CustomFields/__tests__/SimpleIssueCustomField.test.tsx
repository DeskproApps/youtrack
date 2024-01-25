import { cleanup } from "@testing-library/react";
import { render } from "../../../../../../testing";
import { SimpleIssueCustomField } from "../SimpleIssueCustomField";
import fieldDateTime from "./mocks/customFields/SimpleDateTimeIssueCustomField.json";
import fieldFloat from "./mocks/customFields/SimpleFloatIssueCustomField.json";
import fieldNumber from "./mocks/customFields/SimpleNumberIssueCustomField.json";
import fieldString from "./mocks/customFields/SimpleStringIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("SimpleIssueCustomField", () => {
    test("DateTime", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <SimpleIssueCustomField {...fieldDateTime as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/08 Mar, 2023 13:00/i)).toBeInTheDocument();
    });

    test("float", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <SimpleIssueCustomField {...fieldFloat as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/3.14159/i)).toBeInTheDocument();
    });

    test("number", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <SimpleIssueCustomField {...fieldNumber as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/123/i)).toBeInTheDocument();
    });

    test("string", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <SimpleIssueCustomField {...fieldString as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/1234567890a/i)).toBeInTheDocument();
    });

    test.each([undefined, null, [], {}])("empty value: %p", async (fieldValue) => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <SimpleIssueCustomField {...fieldString as any} value={fieldValue} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
