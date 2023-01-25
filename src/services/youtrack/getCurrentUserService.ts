import { baseRequest } from "./baseRequest";
import { preInstalledRequest } from "./preInstalledRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Settings } from "../../types";
import type { User } from "./types";

const params = {
  url: "/users/me",
  queryParams: { fields: ["id", "login", "name", "email"].join(",") }
};

const getCurrentUserService = (
  client: IDeskproClient,
  settings?: Required<Pick<Settings, "domain"|"permanent_auth_token">>,
) => {
  return !settings
    ? baseRequest<User>(client, params)
    : preInstalledRequest<User>(client, {...params, settings });
};

export { getCurrentUserService };
