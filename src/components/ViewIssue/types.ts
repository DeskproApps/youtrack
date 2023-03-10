import type { Issue } from "../../services/youtrack/types";

export type Props = {
  issue: Issue,
  onCreateIssueComment: () => void,
};
