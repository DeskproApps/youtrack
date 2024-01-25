import replace from "lodash/replace";
import { adminGenericProxyFetch } from "@deskpro/app-sdk";
import { getQueryParams } from "../../utils";
import { BASE_URL, placeholders } from "./constants";
import type { PreInstalledRequest } from "../../types";

const preInstalledRequest: PreInstalledRequest = async (client, {
  url,
  settings,
  method = "GET",
  queryParams = {},
}) => {
  const { instance_url, permanent_auth_token } = settings;
  const dpFetch = await adminGenericProxyFetch(client);

  const res = await dpFetch(`${replace(BASE_URL, placeholders.INSTANCE_URL, instance_url)}${url}?${getQueryParams(queryParams)}`, {
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
