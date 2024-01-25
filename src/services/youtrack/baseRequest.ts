import { isEmpty } from "lodash";
import { proxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";
import { YouTrackError } from "./YouTrackError";
import { getQueryParams, isForm, getRequestBody } from "../../utils";
import type { Request, FetchOptions } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data,
  method = "GET",
  queryParams = {},
  headers: customHeaders,
}) => {
    const dpFetch = await proxyFetch(client);

    const baseUrl = rawUrl ? rawUrl : `${BASE_URL}${url || ""}`;
    const params = getQueryParams(queryParams);
    const body = getRequestBody(data);
    const requestUrl = `${baseUrl}${isEmpty(params) ? "": `?${params}`}`;

    const options: FetchOptions = {
        method,
        body,
        headers: {
            "Authorization": `Bearer ${placeholders.PERMANENT_AUTH_TOKEN}`,
            ...customHeaders,
        },
    };

    options.headers = {
      ...((isForm(body) || !body) ? { "Content-Type": "multipart/form-data" } : {}),
      ...options.headers,
    };

    const res = await dpFetch(requestUrl, options);

    if (res.status < 200 || res.status > 399) {
        let errorData;

        try {
          errorData = await res.json();
        } catch (e) {
          errorData = {};
        }

        throw new YouTrackError({
            status: res.status,
            data: errorData,
        });
    }

    let result;

    try {
      result = await res.json();
    } catch (e) {
      return {};
    }

    return result;
};

export { baseRequest };
