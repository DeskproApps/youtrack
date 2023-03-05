import { match, P } from "ts-pattern";
import get from "lodash/get";
import {
  TextProjectCustomField,
  DateProjectCustomField,
  MultiProjectCustomField,
  SingleProjectCustomField,
  SimpleProjectCustomField,
  PeriodProjectCustomField,
  DateTimeProjectCustomField,
  MultiUserProjectCustomField,
  SingleUserProjectCustomField,
  MultiGroupProjectCustomField,
  SingleGroupProjectCustomField,
} from "./fields";
import { MappingFieldTypes } from "../../ViewIssue/IssueFieldView/types";
import type { components } from "../../../services/youtrack/openapi";

const map = (field: components["schemas"]["ProjectCustomField"]) => {
  const type = get(field, ["field", "fieldType", "id"]);

  return match(type)
    .with(P.union(
      MappingFieldTypes.STATE,
      MappingFieldTypes.SINGLE_ENUM,
      MappingFieldTypes.SINGLE_VERSION,
      MappingFieldTypes.SINGLE_BUILD,
      MappingFieldTypes.SINGLE_OWNED,
    ), () => SingleProjectCustomField)
    .with(P.union(
      MappingFieldTypes.MULTI_ENUM,
      MappingFieldTypes.MULTI_VERSION,
      MappingFieldTypes.MULTI_BUILD,
      MappingFieldTypes.MULTI_OWNED,
    ), () => MultiProjectCustomField)
    .with(P.union(
      MappingFieldTypes.FLOAT,
      MappingFieldTypes.INTEGER,
      MappingFieldTypes.STRING,
    ), () => SimpleProjectCustomField)
    .with(MappingFieldTypes.PERIOD, () => PeriodProjectCustomField)
    .with(MappingFieldTypes.SINGLE_GROUP, () => SingleGroupProjectCustomField)
    .with(MappingFieldTypes.MULTI_GROUP, () => MultiGroupProjectCustomField)
    .with(MappingFieldTypes.TEXT, () => TextProjectCustomField)
    .with(MappingFieldTypes.DATE, () => DateProjectCustomField)
    .with(MappingFieldTypes.DATE_TIME, () => DateTimeProjectCustomField)
    .with(MappingFieldTypes.SINGLE_USER, () => SingleUserProjectCustomField)
    .with(MappingFieldTypes.MULTI_USER, () => MultiUserProjectCustomField)
    .otherwise(() => null);
};

export { map };
