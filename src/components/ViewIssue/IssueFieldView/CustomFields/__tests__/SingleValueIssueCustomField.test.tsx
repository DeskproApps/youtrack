import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { SingleValueIssueCustomField } from "../SingleValueIssueCustomField";
import fieldState from "./mocks/customFields/StateIssueCustomField.json";
import fieldEnum from "./mocks/customFields/SingleEnumIssueCustomField.json";
import fieldVersion from "./mocks/customFields/SingleVersionIssueCustomField.json";
import fieldBuild from "./mocks/customFields/SingleBuildIssueCustomField.json";
import fieldOwned from "./mocks/customFields/SingleOwnedIssueCustomField.json";
import fieldGroup from "./mocks/customFields/SingleGroupIssueCustomField.json";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("SingleValueIssueCustomField", () => {
    describe("StateIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldState as any} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/Open/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldState as any} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleEnumIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldEnum as any} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/Ready to pull/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldEnum as any} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleVersionIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldVersion as any} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/2.0.0/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldVersion as any} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleBuildIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldBuild as any} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/fix in build 1/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldBuild as any} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleOwnedIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldOwned as any} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/Migration/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldOwned as any} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleGroupIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldGroup as any} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/All Users/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SingleValueIssueCustomField {...fieldGroup as any} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });
  });
});
