import React from "react";
import fetch from "node-fetch";
import { cleanup } from "@testing-library/react";
import { lightTheme } from "@deskpro/deskpro-ui";
import { render } from "../../../testing";
import { LinkIssue } from "../LinkIssue";
import { getOption } from "../../../utils";
import issues from "./issues.json";
import type { Issue } from "../../../services/youtrack/types";

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
  useDeskproAppTheme: () => ({ theme: lightTheme }),
  proxyFetch: async () => fetch,
}));

jest.mock("../../../services/entityAssociation/getEntityAssociationCountService", () => ({
  getEntityAssociationCountService: () => Promise.resolve(2),
}));

describe("LinkIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render(
      (
        <LinkIssue
          value=""
          isFetching={false}
          isSubmitting={false}
          onChange={() => {}}
          onClear={() => {}}
          issues={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            issues as Issue[]
        }
          projects={[]}
          selectedProject={getOption("id1", "project")}
          onChangeSelectProject={() => {}}
          onCancel={() => {}}
          onLinkIssues={() => {}}
          selectedIssues={[]}
          onChangeSelectedIssue={() => {}}
        />
      ),
      { wrappers: { theme: true } },
    );


    expect(await findByText(/Simple Project Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Default DP issue/i)).toBeInTheDocument();
    expect(await findByText(/Kanban Deskpro issue/i)).toBeInTheDocument();
    expect(await findByText(/Scrum Deskpro issue/i)).toBeInTheDocument();
  });

  test("render", async () => {
    const { findByText } = render(
      (
        <LinkIssue
          value=""
          isFetching={false}
          isSubmitting={false}
          onChange={() => {}}
          onClear={() => {}}
          issues={[]}
          projects={[]}
          selectedProject={getOption("id1", "project")}
          onChangeSelectProject={() => {}}
          onCancel={() => {}}
          onLinkIssues={() => {}}
          selectedIssues={[]}
          onChangeSelectedIssue={() => {}}
        />
      ),
      { wrappers: { theme: true } },
    );

    expect(await findByText(/No YouTrack issues found/i)).toBeInTheDocument();
  });

  test("render", async () => {
    const { findByText } = render(
      (
        <LinkIssue
          value=""
          isFetching={false}
          isSubmitting={false}
          onChange={() => {}}
          onClear={() => {}}
          issues={undefined}
          projects={[]}
          selectedProject={getOption("id1", "project")}
          onChangeSelectProject={() => {}}
          onCancel={() => {}}
          onLinkIssues={() => {}}
          selectedIssues={[]}
          onChangeSelectedIssue={() => {}}
        />
      ),
      { wrappers: { theme: true } },
    );

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });
});
