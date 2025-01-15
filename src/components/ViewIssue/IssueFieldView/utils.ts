import { MappingFieldTypes } from "./types";
import type { FieldTypeValue } from "./types";

const isDateTime = (field?: FieldTypeValue): boolean => {
  // If field is not provided or the valueType property is missing (undefined), 
  // we return false because we assume a missing valueType means it's not a DateTime.
  // This is reasonable in our case since we're specifically checking for DateTime fields.
  
  if (!field || field.valueType === undefined) return false;
  return field.valueType === MappingFieldTypes.DATE_TIME;
};

export { isDateTime };
