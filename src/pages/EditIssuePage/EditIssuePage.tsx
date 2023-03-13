import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import get from "lodash/get";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  updateIssueService,
  uploadIssueAttachmentService,
} from "../../services/youtrack";
import { useSetTitle } from "../../hooks";
import { useIssueDeps } from "./hooks";
import { EditIssue } from "../../components";
import type { FC } from "react";
import type { IssueValues } from "../../components/IssueForm";
import type { Maybe } from "../../types";
import {IssueAttachment} from "../../services/youtrack/types";

const EditIssuePage: FC = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();

  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const { issue, isLoading } = useIssueDeps(issueId);

  const onCancel = useCallback(() => {
    if (!issueId) {
      return;
    }

    navigate(`/view/${issueId}`)
  }, [navigate, issueId]);

  const onSubmit = useCallback((data: IssueValues): Promise<void> => {
    if (!client || !issueId) {
      return Promise.resolve();
    }

    setError(null);

    return updateIssueService(client, issueId, data)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore ToDo: need to fix typings in @app-sdk
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          navigate(`/view/${issueId}`);
        }
      })
      .catch((err) => setError(get(err, ["data", "error_description"], "An error occurred")));
  }, [client, issueId, navigate]);

  const onUploadFile = useCallback((file: File): Promise<IssueAttachment|void> => {
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
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
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
