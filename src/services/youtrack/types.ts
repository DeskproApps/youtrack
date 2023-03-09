import type { components } from "./openapi";

export type YouTrackErrors = {
  //...
};

export type Issue = Omit<components["schemas"]["Issue"], "id"|"idReadable"|"project"> & {
  id: NonNullable<components["schemas"]["Issue"]["id"]>,
  idReadable: NonNullable<components["schemas"]["Issue"]["idReadable"]>,
  project: Project,
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
