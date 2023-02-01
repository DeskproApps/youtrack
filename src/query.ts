import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: false,
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
        },
    },
});

enum QueryKey {
  SEARCH_ISSUES = "searchIssues",
  GET_ISSUES_BY_ID = "getIssuesById",
}

export { queryClient, QueryKey };
