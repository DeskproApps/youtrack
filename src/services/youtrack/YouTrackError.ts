import type { YouTrackErrors } from "./types";

export type InitData = {
  status: number,
  data: {
    "error": "Unauthorized",
    "error_description": string,
  },
};

class YouTrackError extends Error {
  status: number;
  data: YouTrackErrors;

  constructor({ status, data }: InitData) {
    super(data.error_description);

    this.data = data;
    this.status = status;
  }
}

export { YouTrackError };
