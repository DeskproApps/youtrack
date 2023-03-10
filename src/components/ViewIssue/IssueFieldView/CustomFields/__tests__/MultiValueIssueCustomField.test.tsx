import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { MultiValueIssueCustomField } from "../MultiValueIssueCustomField";
import fieldEnum from "./mocks/customFields/MultiEnumIssueCustomField.json";
import fieldVersion from "./mocks/customFields/MultiVersionIssueCustomField.json";
import fieldBuild from "./mocks/customFields/MultiBuildIssueCustomField.json";
import fieldOwned from "./mocks/customFields/MultiOwnedIssueCustomField.json";
import fieldGroup from "./mocks/customFields/MultiGroupIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("MultiValueIssueCustomField", () => {
    test("MultiEnumIssueCustomField", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <MultiValueIssueCustomField {...fieldEnum as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/Blocked/i)).toBeInTheDocument();
      expect(await findByText(/Ready To Pull/i)).toBeInTheDocument();
      expect(await findByText(/JIRA/i)).toBeInTheDocument();
      expect(await findByText(/YouTrack/i)).toBeInTheDocument();
      expect(await findByText(/GitLab/i)).toBeInTheDocument();
    });

    test("MultiVersionIssueCustomField", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <MultiValueIssueCustomField {...fieldVersion as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/1.0.1/i)).toBeInTheDocument();
      expect(await findByText(/1.0.0/i)).toBeInTheDocument();
      expect(await findByText(/0.0.1/i)).toBeInTheDocument();
    });

    test("MultiBuildIssueCustomField", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <MultiValueIssueCustomField {...fieldBuild as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/fix in build 1/i)).toBeInTheDocument();
      expect(await findByText(/fix in build 2/i)).toBeInTheDocument();
    });

    test("MultiOwnedIssueCustomField", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <MultiValueIssueCustomField {...fieldOwned as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/Migration/i)).toBeInTheDocument();
      expect(await findByText(/Project management/i)).toBeInTheDocument();
      expect(await findByText(/Issue tracking/i)).toBeInTheDocument();
    });

    test("MultiGroupIssueCustomField", async () => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <MultiValueIssueCustomField {...fieldGroup as any} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/All Users/i)).toBeInTheDocument();
      expect(await findByText(/Registered Users/i)).toBeInTheDocument();
    });

    test.each([null, undefined, "", {}, []])("empty value: %p", async (field) => {
      const { findByText } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <MultiValueIssueCustomField {...fieldVersion as any} value={field} />,
        { wrappers: { theme: true } },
      );

      expect(await findByText(/-/i)).toBeInTheDocument()
    });
  });
});
