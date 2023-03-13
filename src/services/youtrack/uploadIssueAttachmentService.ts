import { baseRequest } from "./baseRequest";
import { ATTACHMENT_FIELDS } from "./constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue, IssueAttachment } from "./types";

const uploadIssueAttachmentService = (
  client: IDeskproClient,
  issueId: Issue["id"],
  data: FormData,
) => {
  return baseRequest<IssueAttachment>(client, {
    url: `/issues/${issueId}/attachments`,
    method: "POST",
    data,
    queryParams: {
      fields: ATTACHMENT_FIELDS.join(","),
    },
  })
};

export { uploadIssueAttachmentService };
