import React from "react";
import { match } from "ts-pattern";
import {
  TextIssueCustomField,
  DateIssueCustomField,
  SimpleIssueCustomField,
  PeriodIssueCustomField,
  MultiUserIssueCustomField,
  SingleUserIssueCustomField,
  MultiValueIssueCustomField,
  SingleValueIssueCustomField,
} from "./CustomFields";
import { MappingCustomFields } from "./types";
import type { ReactNode } from "react";
import type { CustomFields, CustomFieldKey, CustomFieldValue } from "./types";

const map = (type: CustomFieldKey, field: CustomFieldValue): ReactNode => {
  return match(type)
    .with(MappingCustomFields.TextIssueCustomField, () =>(
      <TextIssueCustomField {...field as CustomFields[MappingCustomFields.TextIssueCustomField]} />
    ))
    .with(MappingCustomFields.StateIssueCustomField, () => (
      <SingleValueIssueCustomField {...field as CustomFields[MappingCustomFields.StateIssueCustomField]} />
    ))
    .with(MappingCustomFields.SingleEnumIssueCustomField, () => (
      <SingleValueIssueCustomField {...field as CustomFields[MappingCustomFields.SingleEnumIssueCustomField]} />
    ))
    .with(MappingCustomFields.SingleVersionIssueCustomField, () => (
      <SingleValueIssueCustomField {...field as CustomFields[MappingCustomFields.SingleVersionIssueCustomField]} />
    ))
    .with(MappingCustomFields.SingleBuildIssueCustomField, () => (
      <SingleValueIssueCustomField {...field as CustomFields[MappingCustomFields.SingleBuildIssueCustomField]} />
    ))
    .with(MappingCustomFields.SingleOwnedIssueCustomField, () => (
      <SingleValueIssueCustomField {...field as CustomFields[MappingCustomFields.SingleOwnedIssueCustomField]} />
    ))
    .with(MappingCustomFields.SingleGroupIssueCustomField, () => (
      <SingleValueIssueCustomField {...field as CustomFields[MappingCustomFields.SingleGroupIssueCustomField]} />
    ))
    .with(MappingCustomFields.SimpleIssueCustomField, () => (
      <SimpleIssueCustomField {...field as CustomFields[MappingCustomFields.SimpleIssueCustomField]} />
    ))
    .with(MappingCustomFields.SingleUserIssueCustomField, () => (
      <SingleUserIssueCustomField {...field as CustomFields[MappingCustomFields.SingleUserIssueCustomField]} />
    ))
    .with(MappingCustomFields.MultiVersionIssueCustomField, () => (
      <MultiValueIssueCustomField {...field as CustomFields[MappingCustomFields.MultiVersionIssueCustomField]} />
    ))
    .with(MappingCustomFields.MultiBuildIssueCustomField, () => (
      <MultiValueIssueCustomField {...field as CustomFields[MappingCustomFields.MultiBuildIssueCustomField]} />
    ))
    .with(MappingCustomFields.MultiEnumIssueCustomField, () => (
      <MultiValueIssueCustomField {...field as CustomFields[MappingCustomFields.MultiEnumIssueCustomField]} />
    ))
    .with(MappingCustomFields.MultiOwnedIssueCustomField, () => (
      <MultiValueIssueCustomField {...field as CustomFields[MappingCustomFields.MultiOwnedIssueCustomField]} />
    ))
    .with(MappingCustomFields.MultiUserIssueCustomField, () => (
      <MultiUserIssueCustomField {...field as CustomFields[MappingCustomFields.MultiUserIssueCustomField]} />
    ))
    .with(MappingCustomFields.MultiGroupIssueCustomField, () => (
      <MultiValueIssueCustomField {...field as CustomFields[MappingCustomFields.MultiGroupIssueCustomField]} />
    ))
    .with(MappingCustomFields.DateIssueCustomField, () => (
      <DateIssueCustomField {...field as CustomFields[MappingCustomFields.DateIssueCustomField]} />
    ))
    .with(MappingCustomFields.PeriodIssueCustomField, () => (
      <PeriodIssueCustomField {...field as CustomFields[MappingCustomFields.PeriodIssueCustomField]} />
    ))
    .otherwise(() => null);
};

export { map };
