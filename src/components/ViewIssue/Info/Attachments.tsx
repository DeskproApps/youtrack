import { faFile } from "@fortawesome/free-solid-svg-icons";
import {
  Stack,
  AttachmentTag,
} from "@deskpro/app-sdk";
import { useExternalLink } from "../../../hooks";
import type { FC } from "react";
import type { Issue } from "../../../services/youtrack/types";

type Props = {
  attachments: Required<Issue["attachments"]>,
};

const Attachments: FC<Props> = ({ attachments }) => {
  const { getBaseUrl } = useExternalLink();

  return (
    <Stack gap={6} wrap="wrap">
      {(Array.isArray(attachments) && attachments.length > 0)
        ? attachments.map(({ id, name, url, size }) => (
          <AttachmentTag
            key={id}
            filename={name as string}
            icon={faFile}
            fileSize={size as number}
            href={`${getBaseUrl()}${url}`}
          />
        ))
        : <>-</>
      }
    </Stack>
  );
};

export { Attachments }
