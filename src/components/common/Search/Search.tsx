import { FC } from "react";
import { faSearch, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, IconButton } from "@deskpro/app-sdk";
import { Label } from "../Label";
import type { InputProps } from "@deskpro/app-sdk";

export type Props = {
    value: string,
    label?: string,
    onChange: InputProps["onChange"],
    onClear: () => void,
    disabled?: boolean,
    required?: boolean,
    isFetching?: boolean,
};

const Search: FC<Props> = ({
    value,
    label,
    onClear,
    onChange,
    disabled = false,
    required = false,
    isFetching = false,
}) => (
    <Label
        required={required}
        label={label}
        htmlFor="search"
    >
        <Input
            id="search"
            value={value}
            disabled={disabled}
            onChange={onChange}
            leftIcon={isFetching
                ? <FontAwesomeIcon icon={faSpinner} spin/>
                : faSearch
            }
            rightIcon={(
                <IconButton icon={faTimes} minimal onClick={onClear} />
            )}
        />
    </Label>
);

export { Search };
