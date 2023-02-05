import { baseRequest } from "./baseRequest";
import { preInstalledRequest } from "./preInstalledRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Settings } from "../../types";
import type { Me } from "./types";

const params = {
  url: "/users/me",
  queryParams: { fields: ["id", "login", "fullName", "email"].join(",") }
};

const getCurrentUserService = (
  client: IDeskproClient,
  settings?: Required<Pick<Settings, "domain"|"permanent_auth_token">>,
) => {
  return !settings
    ? baseRequest<Me>(client, params)
    : preInstalledRequest<Me>(client, {...params, settings });
};

export { getCurrentUserService };
