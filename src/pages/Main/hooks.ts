import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityIssueListService } from "../../services/entityAssociation";
import type { TicketContext } from "../../types";

const useCheckLinkedIssues = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = get(context, ["data", "ticket", "id"]);

  useInitialisedDeskproAppClient(async (client) => {
    if (!ticketId) {
      return;
    }

      getEntityIssueListService(client, ticketId)
        .then((entities) => {
          if (Array.isArray(entities) && entities.length > 0) {
            navigate("/home");
          } else {
            navigate("/link")
          }
        })
        .catch(() => navigate("/link"));
  }, [ticketId]);
};

export { useCheckLinkedIssues };
