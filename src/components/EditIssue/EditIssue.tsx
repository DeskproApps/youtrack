import { Container } from "../common";
import { IssueForm } from "../IssueForm";
import type { FC } from "react";
import type { Props as FormProps } from "../IssueForm";

type Props = FormProps & {
  //...
};

const EditIssue: FC<Props> = ({ onSubmit, onCancel, issue, error, onUploadFile }) => (
  <Container>
    <IssueForm
      isEditMode
      error={error}
      issue={issue}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onUploadFile={onUploadFile}
    />
  </Container>
);

export { EditIssue };
