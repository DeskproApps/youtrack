import { ENTITY } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "../youtrack/types";

const getEntityAssociationCountService = (
  client: IDeskproClient,
  id: Issue["idReadable"],
) => {
    return client.entityAssociationCountEntities(ENTITY, id);
};

export { getEntityAssociationCountService };
