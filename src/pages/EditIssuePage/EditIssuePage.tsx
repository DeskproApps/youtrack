import { EditIssue } from "@/components";
import { getEntityMetadata } from "@/utils";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { setEntityIssueService } from "@/services/entityAssociation";
import { updateIssueService, uploadIssueAttachmentService } from "@/services/youtrack";
import { useCallback, useState, } from "react";
import { useIssueDeps } from "./hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useSetTitle } from "@/hooks";
import get from "lodash/get";
import type { FC } from "react";
import type { IssueAttachment } from "@/services/youtrack/types";
import type { IssueValues } from "@/components/IssueForm";
import type { Maybe, Settings } from "@/types";

const EditIssuePage: FC = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const isUsingOAuth = context?.settings.use_permanent_token === false

  const [error, setError] = useState<Maybe<string | string[]>>(null);

  const { issue, isLoading } = useIssueDeps(issueId);

  const ticketId = get(context, ["data", "ticket", "id"]);

  const onCancel = useCallback(() => {
    if (!issueId) {
      return;
    }

    navigate(`/view/${issueId}`)
  }, [navigate, issueId]);

  const onSubmit = useCallback((data: IssueValues): Promise<void> => {
    if (!client || !issueId || !ticketId) {
      return Promise.resolve();
    }

    setError(null);

    return updateIssueService(client, issueId, data)
      .then((issue) => {
        return setEntityIssueService(client, ticketId, issue.idReadable, getEntityMetadata(issue));
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore ToDo: need to fix typings in @app-sdk
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          navigate(`/view/${issueId}`);
        }
      })
      .catch((err) => setError(get(err, ["data", "error_description"], "An error occurred")));
  }, [client, issueId, ticketId, navigate]);

  const onUploadFile = useCallback((file: File): Promise<IssueAttachment | void> => {
    if (!client || !issueId) {
      return Promise.resolve();
    }

    const form = new FormData();
    form.append("file", file);

    setError(null);

    return uploadIssueAttachmentService(client, issueId, form)
      .catch((err) => setError(get(err, ["data", "error_description"], "An error occurred")));
  }, [client, issueId]);

  useSetTitle("Edit Issue");

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

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <EditIssue
      issue={issue}
      error={error}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onUploadFile={onUploadFile}
    />
  );
};

export { EditIssuePage };
