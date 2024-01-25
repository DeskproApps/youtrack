import React from "react";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { VerifySettings } from "../VerifySettings";

jest.mock("../../../services/youtrack/getCurrentUserService", () => ({
  getCurrentUserService: () => Promise.reject(),
}))

describe("VerifySettings Page", () => {
  test("invalid verify", async () => {
    const { findByText, findByRole } = render(<VerifySettings />, { wrappers: { theme: true }});
    const button = await findByRole("button", { name: /Verify Settings/i });

    await userEvent.click(button);

    expect(await findByText(/Failed to connect to YouTrack/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
});
