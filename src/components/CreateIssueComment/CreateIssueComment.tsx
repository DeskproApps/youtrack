import isString from "lodash/isString";
import { Container } from "../common";
import { IssueCommentForm } from "../IssueCommentForm";
import { ErrorBlock } from "../Error";
import type { FC } from "react";
import type { Props as FormProps } from "../IssueCommentForm";

type Props = FormProps & {
  error: string|boolean|null,
};

const CreateIssueComment: FC<Props> = ({ onSubmit, onCancel, error }) => {
  return (
    <Container>
      {error && <ErrorBlock text={isString(error) ? error : ""}/>}
      <IssueCommentForm onSubmit={onSubmit} onCancel={onCancel} />
    </Container>
  );
};

export { CreateIssueComment };
