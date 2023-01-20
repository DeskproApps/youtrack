import { createSearchParams } from "react-router-dom";
import replace from "lodash/replace";
import { adminGenericProxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";
import type { ParamKeyValuePair } from "react-router-dom";
import type { PreInstalledRequest } from "../../types";

const preInstalledRequest: PreInstalledRequest = async (client, {
  url,
  settings,
  method = "GET",
  queryParams = {},
}) => {
  const { domain, permanent_auth_token } = settings;
  const dpFetch = await adminGenericProxyFetch(client);

  const parsedQueryParams = Array.isArray(queryParams)
    ? queryParams
    : Object.keys(queryParams).map<ParamKeyValuePair>((key) => ([key, queryParams[key]]));

  const res = await dpFetch(`${replace(BASE_URL, placeholders.DOMAIN, domain)}${url}?${createSearchParams(parsedQueryParams)}`, {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${permanent_auth_token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error(`Request failed: [${res.status}] ${await res.text()}`);
  }

  try {
    return await res.json();
  } catch (e) {
    return null;
  }
};

export { preInstalledRequest };
