import get from "lodash/get";
import { useQueryWithClient } from "../../hooks";
import { QueryKey } from "../../query";
import { getOption } from "../../utils";
import { getProjectsService } from "../../services/youtrack";
import type { Project } from "../../services/youtrack/types";
import type { Option } from "../../types";

type UseIssueDeps = () => {
  isLoading: boolean,
  projectOptions: Array<Option<Project["id"]>>,
};

const useIssueDeps: UseIssueDeps = () => {
  const projects = useQueryWithClient(
    [QueryKey.PROJECTS],
    (client) => getProjectsService(client),
    {
      select: (data: Project[]) => {
        return (data || []).map(({ id, name }) => getOption(id, name))
      }
    },
  );

  return {
    isLoading: [projects].every(({ isLoading }) => isLoading),
    projectOptions: get(projects, ["data"], []) || [],
  };
};

export { useIssueDeps };
