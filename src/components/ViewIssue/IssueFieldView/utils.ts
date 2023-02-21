import get from "lodash/get";
import { MappingFieldTypes } from "./types";
import type { FieldTypeValue } from "./types";

const isDateTime = (field?: FieldTypeValue): boolean => {
  return get(field, ["valueType"]) === MappingFieldTypes.DATE_TIME;
};

export { isDateTime };
