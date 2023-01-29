import type { components } from "./openapi";

export type YouTrackErrors = {
  //...
};

export enum CustomFieldType {
  text = "", // TextProjectCustomField
  build = "",
  enum = "",
  group = "",
  ownedField = "",
  state = "",
  user = "",
  version = "",
  date = "",
  "date and time" = "",
  float = "",
  integer = "",
  string = "",
  period = "",
}

export type Issue = Omit<components["schemas"]["Issue"], "id"|"idReadable"> & {
  id: NonNullable<components["schemas"]["Issue"]["id"]>,
  idReadable: NonNullable<components["schemas"]["Issue"]["idReadable"]>
};

export type Project = Omit<components["schemas"]["Project"], "id"> & {
  id: NonNullable<components["schemas"]["Project"]["id"]>
};

export type Me = Omit<components["schemas"]["Me"], "id"> & {
  id: NonNullable<components["schemas"]["Me"]["id"]>,
};
