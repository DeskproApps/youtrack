import { useRef, useState, useCallback } from "react";
import get from "lodash/get";
import { faPlus, faFile } from "@fortawesome/free-solid-svg-icons";
import {
  Stack,
  Button,
  Spinner,
  AttachmentTag,
} from "@deskpro/deskpro-ui";
import { useExternalLink } from "../../../hooks";
import type { FC, ChangeEvent } from "react";
import type { IssueAttachment } from "../../../services/youtrack/types";

type Props = {
  existing?: IssueAttachment[],
  onUploadFile?: (file: File) => Promise<IssueAttachment|void>,
}

const Attach: FC<Props> = ({ existing = [], onUploadFile }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { getBaseUrl } = useExternalLink();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<Record<IssueAttachment["id"], IssueAttachment>>(
    (existing ?? []).reduce((acc, file) => ({...acc, [file.id]: file,}), {})
  );

  const add = useCallback(() => {
    fileRef.current && fileRef.current.click()
  }, [fileRef]);

  const upload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = get(e, ["target", "files", 0]);

    setIsLoading(true);

    onUploadFile && onUploadFile(file)
      .then((attachments) => {
        const attach = get(attachments, [0]);
        setFiles({ ...files, [attach.id]: attach });
      })
      .finally(() => setIsLoading(false));
  }, [files, onUploadFile]);

  return (
    <>
      <input
        type="file"
        onChange={upload}
        ref={fileRef}
        style={{ display: "none" }}
      />

      <Stack gap={6} wrap="wrap">
        {Object.values(files).map(({ id, name, size, url }) => (
          <AttachmentTag
            key={id}
            filename={name}
            fileSize={size}
            icon={faFile}
            href={`${getBaseUrl()}${url}`}
            withClose={false}
          />
        ))}
      </Stack>

      <Button
        minimal
        text="Add"
        onClick={add}
        disabled={isLoading}
        icon={isLoading ? <Spinner size="extra-small" /> : faPlus}
        style={{ alignSelf: "flex-start" }}
      />
    </>
  );
};

export { Attach };
