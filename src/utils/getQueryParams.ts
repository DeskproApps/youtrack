import isEmpty from "lodash/isEmpty";
import { createSearchParams } from "react-router-dom";
import type { ParamKeyValuePair } from "react-router-dom";
import type { RequestParams } from "../types";

type GetQueryParams = (
  queryParams: RequestParams["queryParams"],
  options?: {
    skipParseQueryParams?: boolean,
  }
) => string;

const getQueryParams: GetQueryParams = (
  queryParams,
  { skipParseQueryParams = false } = {},
) => {
  if (isEmpty(queryParams)) {
    return "";
  }

  const parsedQueryParams = Array.isArray(queryParams)
    ? queryParams
    : Object.keys(queryParams).map<ParamKeyValuePair>((key) => ([key, queryParams[key]]));


  if (isEmpty(parsedQueryParams)) {
    return "";
  } else if (skipParseQueryParams) {
    return `?${parsedQueryParams.reduce(((acc, currentValue, currentIndex) => {
      return `${acc}${currentIndex === 0 ? "" : "&"}${currentValue[0]}=${currentValue[1]}`;
    }), "")}`;
  } else {
    return `?${createSearchParams(parsedQueryParams)}`;
  }
};

export { getQueryParams };
