import { baseRequest } from "./baseRequest";
import { PROJECT_FIELDS } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project } from "./types";

const getProjectsService = (client: IDeskproClient) => {
  return baseRequest<Project[]>(client, {
    url: "/admin/projects",
    queryParams: {
      fields: PROJECT_FIELDS.join(","),
    },
  })
};

export { getProjectsService };
