import uniqWith from "lodash/uniqWith";
import { searchIssuesBySummaryService } from "../../services/youtrack";
import { useQueryWithClient } from "../../hooks";
import { QueryKey } from "../../query";
import { debouncePromise } from "../../utils";
import type { Issue, Project } from "../../services/youtrack/types";

type UseSearch = (q: string) => {
  isLoading: boolean,
  isFetching: boolean,
  issues: Issue[],
  projects: Project[],
};

const useSearch: UseSearch = (q) => {
  const debounceSearch = debouncePromise(searchIssuesBySummaryService, 1000);

  const issues = useQueryWithClient(
    [QueryKey.SEARCH_ISSUES, q],
    (client) => debounceSearch(client, q),
    {
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
      enabled: Boolean(q),
    },
  );

  const projects = (issues.data || [])
    .map(({ project }) => project)
    .filter((p) => (Boolean(p) && Boolean(p?.id))) as Project[];

  return {
    isLoading: [issues].every(({ isLoading }) => isLoading),
    isFetching: issues.isFetching,
    issues: issues.data || [],
    projects: uniqWith(projects, (a, b) =>  (a.id === b.id)) as Project[],
  };
};

export { useSearch };
