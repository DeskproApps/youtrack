import { createSearchParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { proxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";
import { YouTrackError } from "./YouTrackError";
import type { ParamKeyValuePair } from "react-router-dom";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
    url,
    data = {},
    method = "GET",
    queryParams = {},
    headers: customHeaders
}) => {
    const dpFetch = await proxyFetch(client);

    const baseUrl = `${BASE_URL}${url}`;
    const parsedQueryParams = Array.isArray(queryParams)
        ? queryParams
        : Object.keys(queryParams).map<ParamKeyValuePair>((key) => ([key, queryParams[key]]));
    const params = `${isEmpty(parsedQueryParams) ? "" : `?${createSearchParams(parsedQueryParams)}`}`;
    const requestUrl = `${baseUrl}${params}`;
    const options: RequestInit = {
        method,
        headers: {
            "Authorization": `Bearer ${placeholders.PERMANENT_AUTH_TOKEN}`,
            ...customHeaders,
        },
    };

    if (data instanceof FormData) {
        options.body = data;
    } else if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            ...options.headers,
            "Content-Type": "application/json",
        };
    }

    const res = await dpFetch(requestUrl, options);

    if (res.status < 200 || res.status > 399) {
        throw new YouTrackError({
            status: res.status,
            data: await res.json(),
        });
    }

    return await res.json();
};

export { baseRequest };
