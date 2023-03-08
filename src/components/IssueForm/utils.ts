import { createElement } from "react";
import { z } from "zod";
import { match, P } from "ts-pattern";
import isUndefined from "lodash/isUndefined";
import isEmpty from "lodash/isEmpty";
import isArray from "lodash/isArray";
import get from "lodash/get";
import has from "lodash/has";
import omit from "lodash/omit";
import reduce from "lodash/reduce";
import { getOption } from "../../utils";
import { getTimestamp } from "../../utils/date";
import { Member } from "../common";
import {
  MappingFieldTypes,
  MappingTypesToIssueTypes,
} from "../ViewIssue/IssueFieldView/types";
import type { Option } from "../../types";
import type { components } from "../../services/youtrack/openapi";
import type { Project, Issue } from "../../services/youtrack/types";
import type { IssueValues, FormValidationSchema, CustomFieldValue } from "./types";

const validationSchema = z.object({
  summary: z.string().nonempty(),
  description: z.string(),
  project: z.object({
    value: z.string().nonempty(),
  }),
  customFields: z.any(),
});

const getDefaultInitValues = (issue?: Issue): Omit<FormValidationSchema, "customFields"> => {
  const project = get(issue, ["project"]);

  return {
    summary: get(issue, ["summary"], "") || "",
    description: get(issue, ["description"], "") || "",
    project: isEmpty(project) ? getOption("", "") : getOption(project.id, project.name),
  };
};

const getCustomInitValues = (issue?: Issue): Pick<FormValidationSchema, "customFields"> => {
  const issueCustomFields = get(issue, ["customFields"]);

  if (isEmpty(issue) || isEmpty(issueCustomFields) || !Array.isArray(issueCustomFields)) {
    return {};
  }

  return issueCustomFields.reduce((acc, field) => {
    const fieldType = get(field, ["projectCustomField", "field", "fieldType", "id"]);

    if (!has(acc, [field.id])) {
      acc[field.id] = match(fieldType)
        .with(P.union(
          MappingFieldTypes.STATE,
          MappingFieldTypes.SINGLE_ENUM,
          MappingFieldTypes.SINGLE_VERSION,
          MappingFieldTypes.SINGLE_BUILD,
          MappingFieldTypes.SINGLE_OWNED,
          MappingFieldTypes.SINGLE_GROUP,
        ), () => {
          return getOption(field.value.id, field.value.name);
        })
        .with(MappingFieldTypes.SINGLE_USER, () => {
          return getOption(field.value.id, createElement(Member, {
            name: get(field, ["value", "fullName"]) || get(field, ["value", "login"]) || "",
          }));
        })
        .with(P.union(
          MappingFieldTypes.MULTI_ENUM,
          MappingFieldTypes.MULTI_VERSION,
          MappingFieldTypes.MULTI_BUILD,
          MappingFieldTypes.MULTI_OWNED,
          MappingFieldTypes.MULTI_GROUP,
          MappingFieldTypes.MULTI_USER,
        ), () => {
          return !Array.isArray(field.value)
            ? []
            : field.value.map(({ id }: components["schemas"]["IssueCustomField"]) => id);
        })
        .with(P.union(
          MappingFieldTypes.FLOAT,
          MappingFieldTypes.INTEGER,
        ), () => Number(field.value))
        .with(MappingFieldTypes.STRING, () => field.value)
        .with(MappingFieldTypes.TEXT, () => get(field, ["value", "text"]))
        .with(P.union(
          MappingFieldTypes.DATE,
          MappingFieldTypes.DATE_TIME,
        ), () => {
          return new Date(field.value);
        })
        .with(MappingFieldTypes.PERIOD, () => get(field,["value", "presentation"]))
        .otherwise(() => "");
    }

    return acc;
  }, {});
};

const getDefaultValues = (data: FormValidationSchema) => {
  const { summary, project, description } = data;

  return {
    summary,
    project: { id: project.value },
    ...(isEmpty(description) ? {} : { description }),
  }
};

const getCustomFieldValues = (
  data: FormValidationSchema,
  selectedProjectId: Project["id"],
  projects: Project[],
): Array<IssueValues["customFields"]> => {
  const customValues = omit(data, ["summary", "project", "description"]);
  const selectedProjectCustomFields = get(
    projects.find(({ id }) => id === selectedProjectId),
    ["customFields"],
  );

  if (isEmpty(customValues) || isEmpty(selectedProjectCustomFields)) {
    return [];
  }

  const customFieldCollection = selectedProjectCustomFields?.reduce((acc, customField) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - customField.id can't be undefined
    acc[customField.id] = customField;
    return acc;
  }, {});

  return reduce<FormValidationSchema["customFields"], CustomFieldValue>(customValues, (acc, fieldValue, fieldId) => {
    if (isUndefined(fieldValue)) {
      return acc;
    }

    const fieldType = get(get(customFieldCollection, [fieldId]), ["field","fieldType", "id"]);
    const issueFieldType = get(MappingTypesToIssueTypes, [fieldType]);

    const value = match(fieldType)
      .with(P.union(
        MappingFieldTypes.STATE,
        MappingFieldTypes.SINGLE_ENUM,
        MappingFieldTypes.SINGLE_VERSION,
        MappingFieldTypes.SINGLE_BUILD,
        MappingFieldTypes.SINGLE_OWNED,
        MappingFieldTypes.SINGLE_GROUP,
        MappingFieldTypes.SINGLE_USER,
      ), () => {
        return { id: get(fieldValue, ["value"]) };
      })
      .with(P.union(
        MappingFieldTypes.MULTI_ENUM,
        MappingFieldTypes.MULTI_VERSION,
        MappingFieldTypes.MULTI_BUILD,
        MappingFieldTypes.MULTI_OWNED,
        MappingFieldTypes.MULTI_GROUP,
        MappingFieldTypes.MULTI_USER,
      ), () => {
        return !Array.isArray(fieldValue) ? [] : fieldValue.map((value) => ({ id: value }));
      })
      .with(P.union(
        MappingFieldTypes.FLOAT,
        MappingFieldTypes.INTEGER,
      ), () => Number(fieldValue))
      .with(MappingFieldTypes.STRING, () => fieldValue)
      .with(MappingFieldTypes.TEXT, () => ({ text: fieldValue, $type: "TextFieldValue" }))
      .with(P.union(
        MappingFieldTypes.DATE,
        MappingFieldTypes.DATE_TIME,
      ), () => getTimestamp(fieldValue))
      .with(MappingFieldTypes.PERIOD, () => ({ presentation: fieldValue }))
      .otherwise(() => undefined);

    if (!issueFieldType || !value) {
      return acc;
    }

    acc.push({ value, id: fieldId, $type: issueFieldType });
    return acc;
  }, []);
};

const getIssueValues = (data: FormValidationSchema, projects: Project[]): IssueValues => {
  const defaultValues = getDefaultValues(data);
  const customFieldValues = getCustomFieldValues(data, get(data, ["project", "value"]), projects);

  return {
    ...defaultValues,
    customFields: isEmpty(customFieldValues) ? [] : customFieldValues,
  };
};

const getProjectOptions = (projects?: Project[]): Array<Option<Project["id"]>> => {
  return (isArray(projects) && projects || []).map(({ id, name }) => getOption(id, name));
};

const getProjectCustomFields = (
  projects?: Project[],
  selectedProjectId?: Project["id"],
): Project["customFields"] => {
  if (!Array.isArray(projects) || isEmpty(projects) || !selectedProjectId) {
    return [];
  }

  const selectedProject = projects.find(({ id }) => id === selectedProjectId);

  return get(selectedProject, ["customFields"], []) || [];
};

export {
  getIssueValues,
  validationSchema,
  getDefaultValues,
  getProjectOptions,
  getCustomInitValues,
  getDefaultInitValues,
  getCustomFieldValues,
  getProjectCustomFields,
};
