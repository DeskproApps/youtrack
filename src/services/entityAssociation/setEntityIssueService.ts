import { ENTITY } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "../youtrack/types";
import type { TicketData, EntityMetadata } from "../../types";

const setEntityIssueService = (
    client: IDeskproClient,
    ticketId: TicketData["ticket"]["id"],
    entity: Issue["idReadable"],
    metaData?: EntityMetadata,
) => {
    return client
        .getEntityAssociation(ENTITY, ticketId)
        .set(entity, metaData);
};

export { setEntityIssueService };
