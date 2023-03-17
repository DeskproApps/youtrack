import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import type { Issue } from "../services/youtrack/types";
import type { EntityMetadata } from "../types";

const getEntityMetadata = (issue?: Issue): undefined|EntityMetadata => {
  if (!issue || isEmpty(issue)) {
    return;
  }

  return {
    id: get(issue, ["id"], ""),
    idReadable: get(issue, ["idReadable"], ""),
    summary: get(issue, ["summary"], ""),
    project: get(issue, ["project", "name"], ""),
  };
};

export { getEntityMetadata };
