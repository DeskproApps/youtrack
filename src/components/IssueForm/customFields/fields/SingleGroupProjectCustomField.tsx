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

const SingleGroupProjectCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  const customFieldSettings = useQueryWithClient(
    [QueryKey.CUSTOM_FIELD, "groups"],
    (client) => getGroupProjectCustomFieldSettingsService(client),
  );

  const options = (get(customFieldSettings, ["data"], []) || [])
    .map(({ id, name }) => getOption(id, name));

  return (
    <Dropdown
      hideIcons
      selectedIcon={faCheck}
      externalLinkIcon={faExternalLinkAlt}
      placement="bottom-start"
      fetchMoreText={"Fetch more"}
      autoscrollText={"Autoscroll"}
      options={options}
      onSelectOption={formControlField.onChange}
    >
      {({ targetRef, targetProps }: DropdownTargetProps<HTMLDivElement>) => (
        <DivAsInputWithDisplay
          ref={targetRef}
          value={get(formControlField, ["value", "label"])}
          variant="inline"
          rightIcon={faCaretDown}
          placeholder="Select Value"
          isVisibleRightIcon={false}
          {...targetProps}
        />
      )}
    </Dropdown>
  )
};

export { SingleGroupProjectCustomField };
