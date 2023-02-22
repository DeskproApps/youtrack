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
          <SingleValueIssueCustomField {...fieldState as never} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/Open/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldState as never} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleEnumIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldEnum as never} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/Ready to pull/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldEnum as never} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleVersionIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldVersion as never} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/2.0.0/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldVersion as never} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleBuildIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldBuild as never} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/fix in build 1/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldBuild as never} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleOwnedIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldOwned as never} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/Migration/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldOwned as never} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });

    describe("SingleGroupIssueCustomField", () => {
      test("render", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldGroup as never} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/All Users/i)).toBeInTheDocument();
      });

      test("empty value", async () => {
        const { findByText } = render(
          <SingleValueIssueCustomField {...fieldGroup as never} value={null} />,
          { wrappers: { theme: true } },
        );

        expect(await findByText(/-/i)).toBeInTheDocument();
      });
    });
  });
});
