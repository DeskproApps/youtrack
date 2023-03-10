import { useState } from "react";
import get from "lodash/get";
import { faCaretDown, faCheck, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { DivAsInputWithDisplay } from "@deskpro/deskpro-ui";
import { Dropdown, DropdownTargetProps } from "@deskpro/app-sdk";
import { Label } from "../../common";
import type { FC } from "react";
import type { Option } from "../../../types";
import type { Project } from "../../../services/youtrack/types";

const ProjectField: FC<{
  value: Partial<Option<Project["id"]>>,
  options: Array<Option<Project["id"]>>,
  error: boolean,
  onChange: (o: Option<Project["id"]>) => void,
  disabled?: boolean,
}> = ({ value, options, error, onChange, disabled }) => {
  const inputStyles = disabled ? { cursor: "not-allowed" } : {}

  const [inputSearch, setInputSearch] = useState<string>("");

  return (
    <Dropdown
      showInternalSearch
      fetchMoreText={"Fetch more"}
      autoscrollText={"Autoscroll"}
      selectedIcon={faCheck}
      externalLinkIcon={faExternalLinkAlt}
      placement="bottom-start"
      hideIcons
      options={options.filter(({ label }) => {
        return (label as string).toLowerCase().includes(inputSearch.toLowerCase());
      })}
      onSelectOption={onChange}
      inputValue={inputSearch}
      onInputChange={setInputSearch}
      disabled={disabled}
    >
      {({ targetRef, targetProps }: DropdownTargetProps<HTMLDivElement>) => (
        <Label htmlFor="project" label="Project" required>
          <DivAsInputWithDisplay
            id="project"
            placeholder="Select Value"
            value={get(value, ["label"], "") || ""}
            variant="inline"
            rightIcon={faCaretDown}
            error={error}
            ref={targetRef}
            isVisibleRightIcon={false}
            style={inputStyles}
            {...targetProps}
          />
        </Label>
      )}
    </Dropdown>
  );
};

export { ProjectField };
