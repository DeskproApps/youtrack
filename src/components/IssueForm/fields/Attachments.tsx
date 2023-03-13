import { Label, Attach } from "../../common";
import type { FC } from "react";
import type { IssueAttachment } from "../../../services/youtrack/types";
import type { Props as FormProps } from "../types";

type Props = {
  onUploadFile?: FormProps["onUploadFile"],
  attachments: IssueAttachment[],
};

const Attachments: FC<Props> = ({ attachments, onUploadFile }) => {
  return (
    <Label label="Attachments">
      <Attach existing={attachments} onUploadFile={onUploadFile} />
    </Label>
  );
};

export { Attachments };
