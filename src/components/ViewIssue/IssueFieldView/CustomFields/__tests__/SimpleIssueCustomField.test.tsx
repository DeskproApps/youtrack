import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
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
        <SimpleIssueCustomField {...fieldDateTime as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/08 Mar, 2023 13:00/i)).toBeInTheDocument();
    });

    test("float", async () => {
      const { findByText } = render(
        <SimpleIssueCustomField {...fieldFloat as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/3.14159/i)).toBeInTheDocument();
    });

    test("number", async () => {
      const { findByText } = render(
        <SimpleIssueCustomField {...fieldNumber as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/123/i)).toBeInTheDocument();
    });

    test("string", async () => {
      const { findByText } = render(
        <SimpleIssueCustomField {...fieldString as never} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/1234567890a/i)).toBeInTheDocument();
    });

    test.each([undefined, null, [], {}])("empty value: %p", async (fieldValue) => {
      const { findByText } = render(
        <SimpleIssueCustomField {...fieldString as never} value={fieldValue} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument();
    });
  });
});
