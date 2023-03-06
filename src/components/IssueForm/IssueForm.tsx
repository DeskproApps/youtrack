import has from "lodash/has";
import get from "lodash/get";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithDisplay } from "@deskpro/deskpro-ui";
import { Stack, LoadingSpinner } from "@deskpro/app-sdk";
import { Button, Label, TextArea } from "../common";
import { ErrorBlock } from "../Error";
import { ProjectField } from "./fields";
import { CustomFields } from "./customFields";
import { useIssueDeps } from "./hooks";
import {
  getInitValues,
  getIssueValues,
  validationSchema,
  getProjectOptions,
} from "./utils";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const IssueForm: FC<Props> = ({ isEditMode, onSubmit, onCancel, error }) => {
  const formMethods = useForm<FormValidationSchema>({
    defaultValues: getInitValues(),
    resolver: zodResolver(validationSchema),
    shouldUnregister: true,
  });
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState,
    control,
    getValues,
  } = formMethods;
  const { isSubmitting, errors } = formState;
  const [project, summary, description] = watch(["project", "summary", "description"]);

  const { isLoading, projects } = useIssueDeps();

  const onSubmitHandler = () => {
    onSubmit(getIssueValues(getValues(), projects));
  };

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {error && <ErrorBlock text={error} />}

        <ProjectField
          value={project}
          options={getProjectOptions(projects)}
          error={has(errors, ["project", "message"])}
          onChange={(option) => setValue("project", option)}
        />

        <Label htmlFor="summary" label="Summary" required>
          <InputWithDisplay
            id="summary"
            type="text"
            inputsize="small"
            placeholder="Enter summary"
            error={has(errors, ["summary", "message"])}
            value={summary}
            {...register("summary")}
          />
        </Label>

        <Label htmlFor="description" label="Description">
          <TextArea
            variant="inline"
            id="description"
            minHeight="auto"
            placeholder="Enter description"
            value={description}
            error={has(errors, ["description", "message"])}
            {...register("description")}
          />
        </Label>

        <CustomFields
          control={control}
          projects={projects}
          selectedProjectId={get(watch("project"), ["value"])}
        />

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
