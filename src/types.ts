import type { ParamKeyValuePair } from "react-router-dom";
import type { IDeskproClient } from "@deskpro/app-sdk";

export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

/**
 * An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"`.
 */
export type DateTime = string;

export type ApiRequestMethod = "GET" | "POST";

export type RequestParams = {
  url?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  headers?: Dict<string>,
  queryParams?: Dict<string>|ParamKeyValuePair[],
};

export type Settings = {
  domain?: string,
  permanent_auth_token?: string,
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Promise<T>;

export type PreInstalledRequest = <T>(
  client: IDeskproClient,
  params: RequestParams & {
    settings: Required<Pick<Settings, "domain"|"permanent_auth_token">>,
  },
) => Promise<T>;
