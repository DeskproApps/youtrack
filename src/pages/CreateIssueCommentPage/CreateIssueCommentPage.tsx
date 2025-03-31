import { CreateIssueComment } from "@/components";
import { createIssueCommentService } from "@/services/youtrack";
import { getValues } from "@/components/IssueCommentForm";
import { Settings } from "@/types";
import { useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetTitle } from "@/hooks";
import { useState, useCallback } from "react";
import type { FC } from "react";
import type { Issue } from "@/services/youtrack/types";
import type { Props as FormProps } from "@/components/IssueCommentForm";

const CreateIssueCommentPage: FC = () => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const isUsingOAuth = context?.settings.use_permanent_token === false

  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | boolean | null>(null);

  const navigate = useNavigate();

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
      .catch((err) => setError(err?.error_description ?? true));
  }, [client, navigate, issueId]);

  useSetTitle("Comment");

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
