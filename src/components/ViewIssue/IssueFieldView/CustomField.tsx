import React from "react";
import isNull from "lodash/isNull";
import { map } from "./map";
import { NoValue } from "./CustomFields";
import type { FC } from "react";

type Props = {
  field: any,
};

const CustomField: FC<Props> = ({ field: customField }) => {
  const field = map(customField.$type, customField);

  if (isNull(field)) {
    // eslint-disable-next-line no-console
    console.warn(`Could not render field view, mapping missing for YouTrack field type ${customField.$type}`);
    return (<NoValue text={customField.$type} />)
  }

  return (
    <>{field}</>
  );
};

export { CustomField };
