import type { components } from "./openapi";

export type YouTrackErrors = {
  error: string, // "bad_request"|"Unauthorized"|"invalid_query"|"Not Found"
  error_description: string,
};

export type Response<T> = Promise<T>;

export type IssueAttachment = Omit<components["schemas"]["IssueAttachment"], "id"|"name"|"size"|"url"> & {
  $type: "IssueAttachment",
  id: NonNullable<components["schemas"]["IssueAttachment"]["id"]>,
  name: NonNullable<components["schemas"]["IssueAttachment"]["name"]>,
  size: NonNullable<components["schemas"]["IssueAttachment"]["size"]>,
  url: NonNullable<components["schemas"]["IssueAttachment"]["url"]>
};

export type Issue = Omit<components["schemas"]["Issue"], "id"|"idReadable"|"project"|"attachments"> & {
  id: NonNullable<components["schemas"]["Issue"]["id"]>,
  idReadable: NonNullable<components["schemas"]["Issue"]["idReadable"]>,
  project: Project,
  attachments: IssueAttachment[],
};

export type ProjectCustomField = components["schemas"]["ProjectCustomField"] & {
  isSpentTime: boolean,
};

export type Project = Omit<components["schemas"]["Project"], "id"|"customFields"> & {
  id: NonNullable<components["schemas"]["Project"]["id"]>,
  customFields: ProjectCustomField[],
};

export type Me = Omit<components["schemas"]["Me"], "id"> & {
  id: NonNullable<components["schemas"]["Me"]["id"]>,
};

export type User = Omit<components["schemas"]["User"], "id"> & {
  id: NonNullable<components["schemas"]["User"]["id"]>
};

export type CustomFieldBundleSetting = Pick<
  components["schemas"]["BundleElement"],
  "id"|"name"|"color"
>;

export type ProjectCustomFieldSettings = {
  bundle: {
    values?: CustomFieldBundleSetting[],
    aggregatedUsers?: User[],
  },
};
