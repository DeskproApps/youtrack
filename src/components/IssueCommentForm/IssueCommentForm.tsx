import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@deskpro/app-sdk";
import { getInitValues, validationSchema } from "./utils";
import { Label, Button, TextArea } from "../common";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const IssueCommentForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(),
    resolver: zodResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="comment" label="Comment">
        <TextArea
          variant="inline"
          id="comment"
          minHeight="auto"
          placeholder="Enter comment"
          value={watch("comment")}
          error={has(errors, ["comment", "message"])}
          {...register("comment")}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text="Add"
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        <Button text="Cancel" intent="tertiary" onClick={onCancel} />
      </Stack>
    </form>
  );
};

export { IssueCommentForm };
