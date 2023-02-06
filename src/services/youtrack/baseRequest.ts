import { proxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";
import { YouTrackError } from "./YouTrackError";
import { getQueryParams } from "../../utils";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
    url,
    data = {},
    method = "GET",
    queryParams = {},
    headers: customHeaders,
    skipParseQueryParams,
}) => {
    const dpFetch = await proxyFetch(client);

    const baseUrl = `${BASE_URL}${url}`;
    const params = getQueryParams(queryParams, { skipParseQueryParams })
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
