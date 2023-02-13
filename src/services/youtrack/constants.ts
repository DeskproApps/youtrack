export const placeholders = {
  DOMAIN: "__domain__",
  PERMANENT_AUTH_TOKEN: "__permanent_auth_token__",
};

export const BASE_URL = `https://${placeholders.DOMAIN}.youtrack.cloud/api`;

export const ATTACHMENT_FIELDS = ["id", "name", "extension", "url", "base64Content"];

export const USER_FIELDS = ["id", "login", "fullName", "email", "avatarUrl"];

export const COMMENT_FIELDS = [
  "id",
  "created",
  "updated",
  "text",
  `author(${USER_FIELDS.join(",")})`,
  `attachments(${ATTACHMENT_FIELDS.join(",")})`
];

export const PROJECT_FIELDS = ["id", "shortName", "name"];

export const ISSUE_FIELDS = [
  "id",
  "idReadable",
  "summary",
  "description",
  `project(${PROJECT_FIELDS.join(",")})`,
  `comments(${COMMENT_FIELDS.join(",")})`,
];
