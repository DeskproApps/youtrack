import { BASE_URL, placeholders } from "./constants";
import { getQueryParams } from "@/utils";
import { proxyFetch } from "@deskpro/app-sdk";
import { YouTrackError } from "./YouTrackError";
import type { Request } from "@/types";

const baseRequest: Request = async (client, {
    url,
    data,
    method = "GET",
    queryParams = {},
    headers: customHeaders,
    skipParseQueryParams,
}) => {
    const dpFetch = await proxyFetch(client);

    const isUsingOAuth2 = (await client.getUserState<boolean>("isUsingOAuth"))[0]?.data

    const baseUrl = `${BASE_URL}${url}`;
    const params = getQueryParams(queryParams, { skipParseQueryParams })
    const requestUrl = `${baseUrl}${params}`;
    const options: RequestInit = {
        method,
        headers: {
            "Authorization": `Bearer ${isUsingOAuth2 ? `[user[${placeholders.OAUTH2_ACCESS_TOKEN_PATH}]]` : placeholders.PERMANENT_AUTH_TOKEN}`,
            ...customHeaders,
        },
    };

    if (data instanceof FormData) {
        options.body = data;
    } else if (data && Object.keys(data).length > 0) {
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
