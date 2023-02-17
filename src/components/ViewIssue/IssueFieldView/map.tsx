import React from "react";
import { match } from "ts-pattern";
import {
  TextIssueCustomField,
  DateIssueCustomField,
  SimpleIssueCustomField,
  MultiUserIssueCustomField,
  SingleUserIssueCustomField,
  MultiValueIssueCustomField,
  SingleValueIssueCustomField,
} from "./CustomFields";
import { MappingCustomFields } from "./types";
import type { ReactNode } from "react";

const map = (type, field): ReactNode => {
  console.log(`>>> ${type}:`, field);
  return match(type)
    .with(MappingCustomFields.TextIssueCustomField, () => <TextIssueCustomField {...field} />)
    .with(MappingCustomFields.StateIssueCustomField, () => <SingleValueIssueCustomField {...field} />)
    .with(MappingCustomFields.SingleEnumIssueCustomField, () => <SingleValueIssueCustomField {...field} />)
    .with(MappingCustomFields.SingleVersionIssueCustomField, () => <SingleValueIssueCustomField {...field} />)
    .with(MappingCustomFields.SingleBuildIssueCustomField, () => <SingleValueIssueCustomField {...field} />)
    .with(MappingCustomFields.SingleOwnedIssueCustomField, () => <SingleValueIssueCustomField {...field} />)
    .with(MappingCustomFields.SimpleIssueCustomField, () => <SimpleIssueCustomField {...field} />)
    .with(MappingCustomFields.SingleUserIssueCustomField, () => <SingleUserIssueCustomField {...field} />)
    .with(MappingCustomFields.MultiVersionIssueCustomField, () => <MultiValueIssueCustomField {...field} />)
    .with(MappingCustomFields.MultiBuildIssueCustomField, () => <MultiValueIssueCustomField {...field} />)
    .with(MappingCustomFields.MultiEnumIssueCustomField, () => <MultiValueIssueCustomField {...field} />)
    .with(MappingCustomFields.MultiOwnedIssueCustomField, () => <MultiValueIssueCustomField {...field} />)
    .with(MappingCustomFields.MultiUserIssueCustomField, () => <MultiUserIssueCustomField {...field} />)
    .with(MappingCustomFields.DateIssueCustomField, () => <DateIssueCustomField {...field} />)
    .otherwise(() => null);
};

export { map };
