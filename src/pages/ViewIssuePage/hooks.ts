import get from "lodash/get";
import { getIssueService } from "../../services/youtrack";
import { useQueryWithClient } from "../../hooks";
import { QueryKey } from "../../query";
import type { Maybe } from "../../types";
import type { Issue } from "../../services/youtrack/types";

type UseIssueDeps = (issueId: Maybe<Issue["id"]>) => {
  isLoading: boolean,
  issue: Issue,
};

const useIssueDeps: UseIssueDeps = (issueId) => {
  const issue = useQueryWithClient(
    [QueryKey.ISSUE, issueId],
    (client) => getIssueService(client, issueId as Issue["id"]),
    { enabled: !!issueId },
  );

  return {
    isLoading: [issue].every(({ isLoading }) => isLoading),
    issue: get(issue, ["data"]) as Issue,
  };
};

export { useIssueDeps };
