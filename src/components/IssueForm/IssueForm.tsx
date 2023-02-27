import { Stack } from "@deskpro/app-sdk";
import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithDisplay } from "@deskpro/deskpro-ui";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { Button, Label, TextArea } from "../common";
import { ProjectField } from "./fields";
import { useIssueDeps } from "./hooks";
import { validationSchema, getInitValues } from "./utils";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const IssueForm: FC<Props> = ({ isEditMode, onSubmit, onCancel }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState,
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(),
    resolver: zodResolver(validationSchema),
  });
  const { isSubmitting, errors } = formState;

  const { isLoading, projectOptions } = useIssueDeps();

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProjectField
        value={watch("project")}
        options={projectOptions}
        error={has(errors, ["project", "value", "message"])}
        onChange={(option) => setValue("project", option)}
      />

      <Label htmlFor="summary" label="Summary" required>
        <InputWithDisplay
          id="summary"
          type="text"
          inputsize="small"
          placeholder="Enter summary"
          error={has(errors, ["summary", "message"])}
          value={watch("summary")}
          {...register("summary")}
        />
      </Label>

      <Label htmlFor="description" label="Description">
        <TextArea
          id="description"
          minHeight="auto"
          placeholder="Enter description"
          value={watch("description")}
          error={has(errors, ["description", "message"])}
          {...register("description")}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {onCancel && <Button text="Cancel" intent="tertiary" onClick={onCancel} />}
      </Stack>
    </form>
  );
};

export { IssueForm };
