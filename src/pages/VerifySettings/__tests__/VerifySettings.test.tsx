import React from "react";
import { cleanup } from "@testing-library/react";
import { render } from "../../../testing";
import { VerifySettings } from "../VerifySettings";

describe("VerifySettings Page", () => {
  test("render", async () => {
    const { getByRole } = render(<VerifySettings />, { wrappers: { theme: true }});

    const button = await getByRole("button", { name: /Verify Settings/i });
    expect(button).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
});
