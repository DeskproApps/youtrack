import { CreateIssue } from "@/components";
import { createIssueService } from "@/services/youtrack"
import { getEntityMetadata } from "@/utils";
import { setEntityIssueService } from "@/services/entityAssociation";
import { useAutoCommentLinkedIssue, useSetTitle } from "@/hooks";
import { useCallback, useState } from "react";
import { useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import type { FC } from "react";
import type { IssueValues } from "@/components/IssueForm";
import type { Maybe, Settings } from "@/types";

const CreateIssuePage: FC = () => {
  const { addLinkCommentIssue } = useAutoCommentLinkedIssue();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const isUsingOAuth = context?.settings?.use_permanent_token !== true

  const navigate = useNavigate();

  const [error, setError] = useState<Maybe<string | string[]>>(null);

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
    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [
          {
            title: "Logout",
            payload: { type: "logout" },
          }],
      })
    }
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
