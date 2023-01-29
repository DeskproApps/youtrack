import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "./constants";

const getEntityIssueListService = (
    client: IDeskproClient,
    ticketId: string,
): Promise<string[]> => {
    return client
        .getEntityAssociation(ENTITY, ticketId)
        .list();
};

export { getEntityIssueListService };
