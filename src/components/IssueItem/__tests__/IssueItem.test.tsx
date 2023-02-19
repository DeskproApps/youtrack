import * as React from "react";
import fetch from "node-fetch";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IssueItem } from "../IssueItem";
import { render } from "../../../testing";
import type { Issue } from "../../../services/youtrack/types";

const issue: Issue = {
  $type: "Issue",
  id: "2-40",
  idReadable: "SPDP-3",
  summary: "Simple Deskpro Issue",
  project: {
    $type: "Project",
    id: "0-4",
    name: "Simple Deskpro",
    shortName: "SPDP",
  },
  comments: [],
  customFields: [],
  description: "",
};

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
  entityAssociationCountEntities: async () => 1,

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

jest.mock("../../../services/entityAssociation/getEntityAssociationCountService", () => ({
  getEntityAssociationCountService: () => Promise.resolve(0)
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
        instance_url: "zpawn",
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

describe("IssueItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render(<IssueItem issue={issue}/>, { wrappers: { theme: true } });

    expect(await findByText(/Simple Deskpro Issue/i)).toBeInTheDocument();
  });

  test("click on title", async () => {
    const onClick = jest.fn();

    const { findByText } = render(
      <IssueItem issue={issue} onClickTitle={onClick} />,
      { wrappers: { theme: true } },
    );

    await userEvent.click(await findByText(/Simple Deskpro Issue/i));

    expect(onClick).toBeCalledTimes(1);
  });
});
