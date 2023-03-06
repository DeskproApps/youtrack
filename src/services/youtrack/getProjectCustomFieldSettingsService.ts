import { baseRequest } from "./baseRequest";
import { USER_FIELDS } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { components } from "./openapi";
import type { Project, ProjectCustomFieldSettings } from "./types";

const FIELDS = [
  `bundle(${[
    "values(id,name,color(id,background,foreground))",
    `aggregatedUsers(${USER_FIELDS.join(",")})`,
  ]})`
].join(",");

const getProjectCustomFieldSettingsService = (
  client: IDeskproClient,
  projectId: Project["id"],
  fieldId: components["schemas"]["ProjectCustomField"]["id"],
) => {
  return baseRequest<ProjectCustomFieldSettings>(client, {
    url: `/admin/projects/${projectId}/customFields/${fieldId}`,
    queryParams: {
      fields: FIELDS,
    },
  });
};

export { getProjectCustomFieldSettingsService };
