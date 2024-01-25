import get from "lodash/get";
import { faCheck, faCaretDown, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DivAsInputWithDisplay } from "@deskpro/deskpro-ui";
import { getOption } from "../../../../utils";
import { useQueryWithClient } from "../../../../hooks";
import { getGroupProjectCustomFieldSettingsService } from "../../../../services/youtrack";
import { QueryKey } from "../../../../query";
import type { FC } from "react";
import type { DropdownTargetProps } from "@deskpro/deskpro-ui";
import type { CustomFieldProps } from "../../types";

const MultiGroupProjectCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: { value, onChange, name }} = formControl;

  const customFieldSettings = useQueryWithClient(
    [QueryKey.CUSTOM_FIELD, "groups"],
    (client) => getGroupProjectCustomFieldSettingsService(client),
  );

  const options = (get(customFieldSettings, ["data"], []) || [])
    .map(({ id, name }) => getOption(id, name));

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

export { MultiGroupProjectCustomField };
