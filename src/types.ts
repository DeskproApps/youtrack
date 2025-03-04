import type { ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";
import { Issue, Project } from "./services/youtrack/types";

export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

/**
 * An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"`.
 */
export type DateTime = string;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

export type ApiRequestMethod = "GET" | "POST";

export type RequestParams = {
  url?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, unknown> | FormData,
  headers?: Dict<string>,
  queryParams?: Dict<string>|ParamKeyValuePair[],
  skipParseQueryParams?: boolean,
};

export type Settings = {
  instance_url?: string,
  permanent_auth_token?: string,
  default_comment_on_ticket_reply?: boolean,
  default_comment_on_ticket_note?: boolean,
  add_comment_when_linking_issue?: boolean,
};

export type TicketData = {
  env: {
    envId: string,
    release: string,
    releaseBuildTime: number,
  },
  app: {
    id: string,
    instanceId: string,
    description: string,
    name: "@deskpro-apps/gitlab"
    title: "GitLab",
  },
  ticket: {
    id: string,
    subject: string,
    permalinkUrl: string,
    primaryUser: {
      customFields: object,
      displayName: string,
      email: string,
      emails: string[],
      firstName: string,
      id: string,
      language: string,
      lastName: string,
      locale: string,
    },
  },
  currentAgent: {
    avatarUrl: string,
    emails: string[],
    firstName: string,
    id: string,
    isAdmin: boolean,
    isAgent: boolean,
    isChatOnline: boolean,
    isOnline: boolean,
    language: string,
    lastName: string,
    locale: string,
    name: string,
    primaryEmail: string,
    teams: Array<{ id: string, name: string }>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userGroups: any[],
  },
};

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Promise<T>;

export type PreInstalledRequest = <T>(
  client: IDeskproClient,
  params: RequestParams & {
    settings: Required<Pick<Settings, "instance_url"|"permanent_auth_token">>,
  },
) => Promise<T>;

export type RouterPaths =
  | "/admin/verify_settings"
  | "/link"
  | "/home"
  | "/create"
  | "/edit"
;

export type EventPayload =
  | { type: "changePage", path: RouterPaths }
  | { type: "unlinkIssue", issueId: Issue["idReadable"] }
;

export type EntityMetadata = {
  id: Issue["id"],
  idReadable: Issue["idReadable"],
  summary: Issue["summary"],
  project: Project["name"],
};
