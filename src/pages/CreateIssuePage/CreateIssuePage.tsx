import { useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { setEntityIssueService } from "../../services/entityAssociation";
import { createIssueService } from "../../services/youtrack"
import { getIssueValues } from "../../components/IssueForm";
import { CreateIssue } from "../../components";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { FormValidationSchema } from "../../components/IssueForm";
import type { TicketContext } from "../../types";

const CreateIssuePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const ticketId = get(context, ["data", "ticket", "id"]);

  const onNavigateToLinkIssue = useCallback(() => navigate("/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit: SubmitHandler<FormValidationSchema> = useCallback((data) => {
    if (!client || !ticketId) {
      return;
    }

    return createIssueService(client, getIssueValues(data))
      .then((issue) => {
        return Promise.all([
          setEntityIssueService(client, ticketId, issue.idReadable),
        ]);
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore ToDo: need to fix typings in @app-sdk
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          navigate("/home")
        }
      });
  }, [client, ticketId, navigate]);

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
      onSubmit={onSubmit}
      onCancel={onCancel}
      onNavigateToLinkIssue={onNavigateToLinkIssue}
    />
  );
};

export { CreateIssuePage };
