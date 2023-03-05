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

const SingleProjectCustomField: FC<CustomFieldProps> = ({ projectId, field, formControl }) => {
  const { field: formControlField } = formControl;

  const customFieldSettings = useQueryWithClient(
    [QueryKey.CUSTOM_FIELD, projectId, field.id],
    (client) => getProjectCustomFieldSettingsService(client, projectId, field.id),
    { enabled: Boolean(projectId) && Boolean(field.id) },
  );

  const options = (get(customFieldSettings, ["data", "bundle", "values"], []) || [])
    .map(({ id, name }: CustomFieldBundleSetting) => getOption(id, name));

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

export { SingleProjectCustomField };