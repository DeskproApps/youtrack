import get from "lodash/get";
import { faCheck, faCaretDown, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Stack, Dropdown, DivAsInputWithDisplay } from "@deskpro/deskpro-ui";
import { getOption } from "../../../../utils";
import { useQueryWithClient, useExternalLink } from "../../../../hooks";
import { getProjectCustomFieldSettingsService } from "../../../../services/youtrack";
import { QueryKey } from "../../../../query";
import { Member } from "../../../common";
import type { FC } from "react";
import type { DropdownTargetProps } from "@deskpro/deskpro-ui";
import type { User } from "../../../../services/youtrack/types";
import type { CustomFieldProps } from "../../types";
import type { Option } from "../../../../types";

const MultiUserProjectCustomField: FC<CustomFieldProps> = ({ projectId, field, formControl }) => {
  const { getBaseUrl } = useExternalLink();
  const { field: { value, onChange, name }} = formControl;

  const customFieldSettings = useQueryWithClient(
    [QueryKey.CUSTOM_FIELD, projectId, field.id],
    (client) => getProjectCustomFieldSettingsService(client, projectId, field.id),
    { enabled: Boolean(projectId) && Boolean(field.id) },
  );

  const options = (get(customFieldSettings, ["data", "bundle", "aggregatedUsers"], []) || [])
    .map((user: User) => getOption(user.id, (
      <Member
        key={user.id}
        name={user.fullName || user.login}
        avatarUrl={user?.avatarUrl ? `${getBaseUrl()}${user?.avatarUrl}` : null}
      />
    )));

  return (
    <Dropdown
      hideIcons
      closeOnSelect={false}
      selectedIcon={faCheck}
      externalLinkIcon={faExternalLinkAlt}
      placement="bottom-start"
      fetchMoreText={"Fetch more"}
      autoscrollText={"Autoscroll"}
      options={options.map((option: Option<User["id"]>) => ({
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
            value={(!Array.isArray(options) || !Array.isArray(value))
              ? null
              : (
                <Stack gap={6} wrap="wrap">
                  {options
                    .filter((o) => (Array.isArray(value) ? value : []).includes(o.value))
                    .map(({ label }) => label)
                  }
                </Stack>
              )
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

export { MultiUserProjectCustomField };
