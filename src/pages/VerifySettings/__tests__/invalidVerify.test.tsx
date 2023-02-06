import React from "react";
import fetch from "node-fetch";
import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../testing";
import { VerifySettings } from "../VerifySettings";

const mockClient = {
  getProxyAuth: () => new Promise(() => {}),
  getAdminGenericProxyAuth: () => new Promise(() => {}),
  resize: () => {},
  setWidth: () => {},
  setHeight: () => {},
  registerElement: () => {},
  deregisterElement: () => {},
  setBadgeCount: () => {},
  setTitle: () => {},

  entityAssociationSet: async () => {},
  entityAssociationDelete: async () => {},
  entityAssociationGet: async () => null,
  entityAssociationList: async () => [""],
  entityAssociationCountEntities: async () => 0,

  setState: async () => ({ isSuccess: false, errors: [] }),
  setUserState: async () => ({ isSuccess: false, errors: [] }),
  getState: async () => [],
  getUserState: async () => [],
  deleteState: async () => false,
  deleteUserState: async () => false,
  hasState: async () => false,
  hasUserState: async () => false,

  setSetting: async () => {},
  setSettings: async () => {},

  setBlocking: async () => {},

  registerTargetAction: async () => {},
  deregisterTargetAction: async () => {},

  getOAuth2CallbackUrl: async () => ({ url: "", statePath: "", statePathPlaceholder: "" }),
  getStaticOAuth2CallbackUrl: async () => ({ url: "" }),
  getStaticOAuth2CallbackUrlValue: async () => "",
  getStaticOAuth2Token: async () => null,

  setAdminSetting: async () => {},
  setAdminSettingInvalid: async () => {},
};

jest.mock("../../../services/youtrack/getCurrentUserService", () => ({
  getCurrentUserService: () => Promise.reject(),
}))

jest.mock("@deskpro/app-sdk", () => ({
  ...jest.requireActual("@deskpro/app-sdk"),
  useDeskproAppEvents: (
    hooks: { [key: string]: (param: Record<string, unknown>) => void },
    deps: [] = []
  ) => {
    const deskproAppEventsObj = {
      type: "ticket",
      settings: {
        domain: "zpawn",
        permanent_auth_token: "this_is_token",
      },
      data: {
        ticket: { id: "215", subject: "Big ticket" },
        app: {},
        env: {},
        currentAgent: {},
      },
    };
    React.useEffect(() => {
      !!hooks.onChange && hooks.onChange(deskproAppEventsObj);
      !!hooks.onShow && hooks.onShow(deskproAppEventsObj);
      !!hooks.onReady && hooks.onReady(deskproAppEventsObj);
      !!hooks.onAdminSettingsChange && hooks.onAdminSettingsChange(deskproAppEventsObj.settings);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, deps);
  },
  useInitialisedDeskproAppClient: (callback: (param: Record<string, unknown>) => void) => {
    callback({
      registerElement: () => {},
      deregisterElement: () => {},
    });
  },
  useDeskproAppClient: () => ({ client: mockClient }),
  proxyFetch: async () => fetch,
}));

describe("VerifySettings Page", () => {
  test("invalid verify", async () => {
    const { findByText, findByRole } = render(<VerifySettings />, { wrappers: { theme: true }});
    const button = await findByRole("button", { name: /Verify Settings/i });

    act(() => {
      userEvent.click(button);
    });

    expect(await findByText(/Failed to connect to YouTrack/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
});
