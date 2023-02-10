import { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useDebouncedCallback } from "use-debounce";
import {
  LoadingSpinner,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useUnlinkIssue } from "./hooks";
import {
  Main,
  HomePage,
  LinkPage,
  ViewIssuePage,
  VerifySettings,
} from "./pages";
import { ErrorFallback } from "./components";
import type { EventPayload } from "./types";

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

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(client.resize, 200);
    },
    onElementEvent: debounceElementEvent,
  });

  if (!client || isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/admin/verify_settings" element={<VerifySettings/>} />
          <Route path="/link" element={<LinkPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/view/:issueId" element={<ViewIssuePage/>} />
          <Route index element={<Main/>} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}

export { App };
