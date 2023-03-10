import type { YouTrackErrors } from "./types";

export type ErrorData = {
  status: number,
  data: YouTrackErrors,
};

class YouTrackError extends Error {
  status: number;
  data: YouTrackErrors;

  constructor({ status, data }: ErrorData) {
    super(data.error_description);

    this.data = data;
    this.status = status;
  }
}

export { YouTrackError };
