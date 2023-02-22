import type { components } from "./openapi";

export type YouTrackErrors = {
  //...
};

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

export type User = Omit<components["schemas"]["User"], "id"> & {
  id: NonNullable<components["schemas"]["User"]["id"]>
};
