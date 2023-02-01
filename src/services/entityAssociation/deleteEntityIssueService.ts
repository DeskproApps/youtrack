import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "./constants";

const deleteEntityIssueService = (
    client: IDeskproClient,
    ticketId: string,
    id: string,
) => {
    return client
        .getEntityAssociation(ENTITY, ticketId)
        .delete(id);
};

export { deleteEntityIssueService };
