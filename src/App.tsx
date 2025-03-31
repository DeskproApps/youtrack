import { AdminCallbackPage, CreateIssueCommentPage, CreateIssuePage, EditIssuePage, HomePage, LinkPage, LoadingPage, LoginPage, VerifySettings, ViewIssuePage } from "./pages";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components";
import { LoadingSpinner, useDeskproAppClient, useDeskproAppEvents, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLogout } from "./hooks/deskpro";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useUnlinkIssue } from "./hooks";
import type { EventPayload, Settings } from "./types";
import type { TargetAction } from "@deskpro/app-sdk";

const App = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<unknown, Settings>()
  const { logoutActiveUser } = useLogout()
  const { reset } = useQueryErrorResetBoundary();
  const { unlinkIssue, isLoading: isLoadingUnlink } = useUnlinkIssue();

  const isUsingOAuth = context?.settings.use_permanent_token === false

  const isLoading = [isLoadingUnlink].some((isLoading) => isLoading);

  const debounceElementEvent = useDebouncedCallback((_, __, payload) => {
    const p = payload as EventPayload;

    switch (p.type) {
      case "changePage":
        payload.path && navigate(payload.path);
        break;
      case "unlinkIssue":
        unlinkIssue(p.issueId);
        break;
        case "logout":
        if (isUsingOAuth) {
          logoutActiveUser()
        }
        break;
    }
  }, 500);

  const debounceTargetAction = useDebouncedCallback<(a: TargetAction) => void>(
    (action: TargetAction) => {
      switch (action.name) {
        case "linkTicket":
          navigate("/link");
          break;
      }
    },
    500,
  );

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(client.resize, 200);
    },
    onElementEvent: debounceElementEvent,
    onTargetAction: debounceTargetAction,
  });

  if (!client || isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/admin">
            <Route path="callback" element={<AdminCallbackPage />} />
            <Route path="verify_settings" element={<VerifySettings />} />
          </Route>
          <Route path="/link" element={<LinkPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/view/:issueId" element={<ViewIssuePage />} />
          <Route path="/create" element={<CreateIssuePage />} />
          <Route path="/edit/:issueId" element={<EditIssuePage />} />
          <Route path="/comment/create" element={<CreateIssueCommentPage />} />
          <Route index element={<LoadingPage />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}

export { App };
