import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useUnlinkIssue } from "./hooks";
import { LoadingSpinner, useDeskproAppClient, useDeskproAppEvents } from "@deskpro/app-sdk";
import { Main, HomePage, LinkPage, ViewIssuePage, EditIssuePage, VerifySettings, CreateIssuePage, CreateIssueCommentPage } from "./pages";
import { Suspense } from "react";
import type { EventPayload } from "./types";
import type { TargetAction } from "@deskpro/app-sdk";

const App = () => {
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();
  const { client } = useDeskproAppClient();
  const { unlinkIssue, isLoading: isLoadingUnlink } = useUnlinkIssue();

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
          <Route path="/admin/verify_settings" element={<VerifySettings />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/view/:issueId" element={<ViewIssuePage />} />
          <Route path="/create" element={<CreateIssuePage />} />
          <Route path="/edit/:issueId" element={<EditIssuePage />} />
          <Route path="/comment/create" element={<CreateIssueCommentPage />} />
          {/* <Route index element={<TestPage/>} /> */}
          <Route index element={<Main />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}

export { App };
