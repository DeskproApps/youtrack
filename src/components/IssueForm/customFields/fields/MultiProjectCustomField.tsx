import get from "lodash/get";
import { faCheck, faCaretDown, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { DivAsInputWithDisplay } from "@deskpro/deskpro-ui";
import { Dropdown } from "@deskpro/app-sdk";
import { getOption } from "../../../../utils";
import { useQueryWithClient } from "../../../../hooks";
import { getProjectCustomFieldSettingsService } from "../../../../services/youtrack";
import { QueryKey } from "../../../../query";
import type { FC } from "react";
import type { DropdownTargetProps } from "@deskpro/app-sdk";
import type { CustomFieldBundleSetting } from "../../../../services/youtrack/types";
import type { CustomFieldProps } from "../../types";
import type { Option } from "../../../../types";

const MultiProjectCustomField: FC<CustomFieldProps> = ({ projectId, field, formControl }) => {
  const { field: { value, onChange, name }} = formControl;

  const customFieldSettings = useQueryWithClient(
    [QueryKey.CUSTOM_FIELD, projectId, field.id],
    (client) => getProjectCustomFieldSettingsService(client, projectId, field.id),
    { enabled: Boolean(projectId) && Boolean(field.id) },
  );

  const options: Array<Option<CustomFieldBundleSetting["id"]>> = (
    get(customFieldSettings, ["data", "bundle", "values"], []) || []
  ).map(({ id, name }: CustomFieldBundleSetting) => getOption(id, name));

  return (
    <Dropdown
      hideIcons
      closeOnSelect={false}
      selectedIcon={faCheck}
      externalLinkIcon={faExternalLinkAlt}
      placement="bottom-start"
      fetchMoreText={"Fetch more"}
      autoscrollText={"Autoscroll"}
      options={options.map((option) => ({
        ...option,
        selected: (Array.isArray(value) ? value : []).includes(option.value),
      }))}
      onSelectOption={(option) => {
        if (option.value) {
          const selectedLabels = Array.isArray(value) ? value : [];
          const newValue = selectedLabels.includes(option.value)
            ? selectedLabels.filter((name) => name !== option.value)
            : [...selectedLabels, option.value];

          onChange(newValue);
        }
      }}
    >
      {({ targetRef, targetProps }: DropdownTargetProps<HTMLDivElement>) => (
          <DivAsInputWithDisplay
            id={name}
            ref={targetRef}
            value={options
              .filter((o) => (Array.isArray(value) ? value : []).includes(o.value))
              .map(({ label }) => label)
              .join(", ")
            }
            variant="inline"
            rightIcon={faCaretDown}
            placeholder="Select Value"
            isVisibleRightIcon={false}
            {...targetProps}
          />
        )}
    </Dropdown>
  );
};

export { MultiProjectCustomField };
