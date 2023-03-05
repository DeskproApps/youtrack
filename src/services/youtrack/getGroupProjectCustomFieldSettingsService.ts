import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { components } from "./openapi";

const FIELDS = ["id","name","ringId","allUsersGroup","icon"].join(",");

const getGroupProjectCustomFieldSettingsService = (client: IDeskproClient) => {
  return baseRequest<Array<components["schemas"]["UserGroup"]>>(client, {
    url: `/groups`,
    queryParams: {
      fields: FIELDS,
    },
  });
};

export { getGroupProjectCustomFieldSettingsService };
