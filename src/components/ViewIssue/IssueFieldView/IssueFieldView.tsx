import React from "react";
import { Container, Property } from "../../common";
import { CustomField } from "./CustomField";
import type { FC } from "react";
import type { Issue } from "../../../services/youtrack/types";

type Props = {
  fields: Issue["customFields"],
};

const IssueFieldView: FC<Props> = ({ fields = [] }) => {
  return (Array.isArray(fields) && fields.length > 0)
    ? (
      <Container>
        {fields.map((field) => (
          <Property key={field.id} label={field.name} text={<CustomField field={field} />}/>
        ))}
      </Container>
    )
    : (<></>)
};

export { IssueFieldView };
