import get from "lodash/get";
import { useQueryWithClient } from "../../hooks";
import { QueryKey } from "../../query";
import { getProjectsService } from "../../services/youtrack";
import type { Project } from "../../services/youtrack/types";

type UseIssueDeps = () => {
  isLoading: boolean,
  projects: Project[],
};

const useIssueDeps: UseIssueDeps = () => {
  const projects = useQueryWithClient(
    [QueryKey.PROJECTS],
    (client) => getProjectsService(client),
  );

  return {
    isLoading: [projects].every(({ isLoading }) => isLoading),
    projects: get(projects, ["data"], []) || [],
  };
};

export { useIssueDeps };
