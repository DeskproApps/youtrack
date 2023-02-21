import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { NoValue } from "../NoValue";

describe("CustomFields", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("TextIssueCustomField", () => {
    test("render", async () => {
      const { findByText } = render(<NoValue/>, { wrappers: { theme: true } });
      expect(await findByText(/-/i)).toBeInTheDocument();
    });

    test.each([
      ["empty value", /empty value/i],
      [null, /-/i],
      [undefined, /-/i]
    ])("custom value: %p", async (text, expected) => {
      const { findByText } = render(<NoValue text={text} />, { wrappers: { theme: true } });
      expect(await findByText(expected)).toBeInTheDocument();
    });
  });
});
