import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import get from "lodash/get";
import {
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { createIssueCommentService } from "../../services/youtrack";
import { getValues } from "../../components/IssueCommentForm";
import { CreateIssueComment } from "../../components";
import type { FC } from "react";
import type { Issue } from "../../services/youtrack/types";
import type { Props as FormProps } from "../../components/IssueCommentForm";

const CreateIssueCommentPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<string|boolean|null>(null);

  const issueId = (searchParams.get("issueId") || "") as Issue["id"];

  const onCancel = useCallback(() => {
    navigate(`/view/${issueId}`);
  }, [navigate, issueId]);

  const onSubmit: FormProps["onSubmit"] = useCallback((data) => {
    if (!client || !issueId) {
      return Promise.resolve();
    }

    setError(null);

    return createIssueCommentService(client, issueId, getValues(data))
      .then(() => navigate(`/view/${issueId}`))
      .catch((err) => setError(get(err, ["error_description"], true)));
  }, [client, navigate, issueId]);

  useSetTitle("Comment");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  }, []);

  return (
    <CreateIssueComment
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { CreateIssueCommentPage };
