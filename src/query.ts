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
  SEARCH_ISSUES_BY_SUMMARY = "searchIssuesBySummary",
  SEARCH_ISSUES_BY_ID = "getIssuesById",
  ISSUE = "issue",
  PROJECTS = "projects",
  CUSTOM_FIELD = "customField",
}

export { queryClient, QueryKey };
