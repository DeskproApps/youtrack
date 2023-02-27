import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TwoButtonGroup } from "@deskpro/app-sdk";
import { Container } from "../common";
import { IssueForm } from "../IssueForm";
import type { FC } from "react";
import type { Props as FormProps } from "../IssueForm";

type Props = FormProps & {
  onNavigateToLinkIssue: () => void,
};

const CreateIssue: FC<Props> = ({
  onSubmit,
  onCancel,
  onNavigateToLinkIssue,
}) => {
  return (
    <Container>
      <TwoButtonGroup
        selected="two"
        oneLabel="Find Issue"
        oneIcon={faSearch}
        twoLabel="Create Issue"
        twoIcon={faPlus}
        oneOnClick={onNavigateToLinkIssue}
        twoOnClick={() => {}}
      />
      <IssueForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Container>
  );
};

export { CreateIssue };
