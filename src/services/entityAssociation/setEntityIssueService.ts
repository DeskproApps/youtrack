import { ENTITY } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "../youtrack/types";
import type { TicketData } from "../../types";

const setEntityIssueService = (
    client: IDeskproClient,
    ticketId: TicketData["ticket"]["id"],
    entity: Issue["idReadable"],
) => {
    return client
        .getEntityAssociation(ENTITY, ticketId)
        .set(entity);
};

export { setEntityIssueService };
