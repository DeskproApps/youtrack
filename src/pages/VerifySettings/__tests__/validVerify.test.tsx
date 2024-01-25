import React from "react";
import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { VerifySettings } from "../VerifySettings";

const mockCurrentUser = {
  $type:"Me",
  email:"armen.tamzarian@me.com",
  id:"1-1",
  login:"zpawn",
  fullName:"Armen Tamzarian",
}

jest.mock("../../../services/youtrack/getCurrentUserService", () => ({
  getCurrentUserService: () => Promise.resolve(mockCurrentUser)
}))

describe("VerifySettings Page", () => {
  test("valid verify", async () => {
    const { findByText, findByRole } = render(<VerifySettings />, { wrappers: { theme: true }});
    const button = await findByRole("button", { name: /Verify Settings/i });

    act(() => {
      userEvent.click(button);
    });

    expect(await findByText(/Armen Tamzarian/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
});
