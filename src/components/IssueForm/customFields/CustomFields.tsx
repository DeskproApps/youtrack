import get from "lodash/get";
import { Controller } from "react-hook-form";
import { getProjectCustomFields } from "../utils";
import { Label } from "../../common";
import { CustomField } from "./CustomField";
import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { Project } from "../../../services/youtrack/types";
import type { FormValidationSchema, CustomFieldValue } from "../types";

type Props = {
  control: Control<Pick<FormValidationSchema, "customFields">>,
  projects: Project[],
  selectedProjectId: Project["id"],
};

const CustomFields: FC<Props> = ({ control, projects, selectedProjectId }) => {
  const customFields = getProjectCustomFields(projects, selectedProjectId);

  return (
    <>
      {customFields.map((field) => {
        if (get(field, ["isSpentTime"], false)) {
          return null;
        }

        const fieldName = get(field, ["field", "name"]);
        const fieldId = get(field, ["id"]) as CustomFieldValue["id"];
        const customField = (
          <Controller
            name={fieldId}
            control={control}
            render={(formControl) => (
              <CustomField field={field} formControl={formControl} projectId={selectedProjectId} />
            )}
          />
        );

        return !fieldName
          ? customField
          : (<Label key={field.id} id={field.id} label={fieldName}>{customField}</Label>);
      })}
    </>
  );
};

export { CustomFields };
