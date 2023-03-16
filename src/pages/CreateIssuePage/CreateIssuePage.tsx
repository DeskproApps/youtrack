import { useState, useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useSetTitle, useAutoCommentLinkedIssue } from "../../hooks";
import { setEntityIssueService } from "../../services/entityAssociation";
import { createIssueService } from "../../services/youtrack"
import { getEntityMetadata } from "../../utils";
import { CreateIssue } from "../../components";
import type { FC } from "react";
import type { IssueValues } from "../../components/IssueForm";
import type { TicketContext, Maybe } from "../../types";

const CreateIssuePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addLinkCommentIssue } = useAutoCommentLinkedIssue();

  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const ticketId = get(context, ["data", "ticket", "id"]);

  const onNavigateToLinkIssue = useCallback(() => navigate("/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((data: IssueValues) => {
    if (!client || !ticketId) {
      return Promise.resolve();
    }

    setError(null);

    return createIssueService(client, data)
      .then((issue) => {
        return Promise.all([
          setEntityIssueService(client, ticketId, issue.idReadable, getEntityMetadata(issue)),
          addLinkCommentIssue(issue.id),
        ]);
      })
      .then(() => navigate("/home"))
      .catch((err) => setError(get(err, ["data", "error_description"], "An error occurred")));
  }, [client, ticketId, navigate, addLinkCommentIssue]);

  useSetTitle("Link Issues");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateIssue
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onNavigateToLinkIssue={onNavigateToLinkIssue}
    />
  );
};

export { CreateIssuePage };
