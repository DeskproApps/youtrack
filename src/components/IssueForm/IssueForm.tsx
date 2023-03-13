import { useState, useCallback } from "react";
import has from "lodash/has";
import get from "lodash/get";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithDisplay } from "@deskpro/deskpro-ui";
import { Stack, LoadingSpinner } from "@deskpro/app-sdk";
import { Button, Label, TextArea } from "../common";
import { ErrorBlock } from "../Error";
import { ProjectField, Attachments } from "./fields";
import { CustomFields } from "./customFields";
import { useIssueDeps } from "./hooks";
import {
  getIssueValues,
  validationSchema,
  getProjectOptions,
  getCustomInitValues,
  getDefaultInitValues,
} from "./utils";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const IssueForm: FC<Props> = ({ isEditMode, onSubmit, onCancel, issue, error, onUploadFile }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const { isLoading, projects } = useIssueDeps();

  const defaultForm = useForm<Omit<FormValidationSchema, "customFields">>({
    defaultValues: getDefaultInitValues(issue),
    resolver: zodResolver(validationSchema),
  });
  const customForm = useForm<Pick<FormValidationSchema, "customFields">>({
    defaultValues: getCustomInitValues(issue),
    shouldUnregister: true,
  });

  const [project, summary, description] = defaultForm.watch(["project", "summary", "description"]);

  const onClickSubmit = useCallback(async () => {
    const isValid = await defaultForm.trigger();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    const data = getIssueValues({ ...defaultForm.getValues(), ...customForm.getValues() }, projects);

    onSubmit(data).finally(() => setIsSubmitting(false));
  }, [onSubmit, projects, defaultForm, customForm]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {error && <ErrorBlock text={error}/>}

        <ProjectField
          value={project}
          disabled={isEditMode}
          options={getProjectOptions(projects)}
          error={has(defaultForm, ["formState", "errors", "project", "value", "message"])}
          onChange={(option) => defaultForm.setValue("project", option)}
        />

        <Label htmlFor="summary" label="Summary" required>
          <InputWithDisplay
            id="summary"
            type="text"
            inputsize="small"
            placeholder="Enter summary"
            error={has(defaultForm, ["formState", "errors", "summary", "message"])}
            value={summary}
            {...defaultForm.register("summary")}
          />
        </Label>

        <Label htmlFor="description" label="Description">
          <TextArea
            variant="inline"
            id="description"
            minHeight="auto"
            placeholder="Enter description"
            value={description}
            error={has(defaultForm, ["formState", "errors", "description", "message"])}
            {...defaultForm.register("description")}
          />
        </Label>
      </form>

      {isEditMode && (
        <Attachments
          attachments={get(issue, ["attachments"], []) || []}
          onUploadFile={onUploadFile}
        />
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <CustomFields
          control={customForm.control}
          projects={projects}
          selectedProjectId={get(defaultForm.watch("project"), ["value"])}
        />
      </form>

      <Stack justify="space-between">
        <Button
          type="button"
          text={isEditMode ? "Save" : "Create"}
          onClick={onClickSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {onCancel && <Button text="Cancel" intent="tertiary" onClick={onCancel}/>}
      </Stack>
    </>
  );
};

export { IssueForm };
