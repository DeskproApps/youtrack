import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { Main } from "./pages/Main";
import { ErrorFallback } from "./components";

const App = () => {
  const { reset } = useQueryErrorResetBoundary();
  const { client } = useDeskproAppClient();

  if (!client) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <Routes>
          <Route index element={<Main/>} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}

export { App };
