import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  Main,
  Home,
  LinkPage,
  VerifySettings,
} from "./pages";
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
          <Route path="/admin/verify_settings" element={<VerifySettings/>} />
          <Route path="/link" element={<LinkPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route index element={<Main/>} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}

export { App };
