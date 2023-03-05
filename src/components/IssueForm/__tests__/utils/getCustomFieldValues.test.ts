import pick from "lodash/pick";
import { getCustomFieldValues } from "../../utils";
import mockFormValues from "./mockFormValues";
import mockProjects from "../mockProjects";

describe("getCustomFieldValues", () => {
  test("should return custom fields values (single select)", () => {
    const data = pick(mockFormValues, ["project", "130-38"]);

    expect(getCustomFieldValues(data as never, "0-6", mockProjects as never))
      .toStrictEqual([{
        "value": { "id": "111-2" },
        "id": "130-38",
        "$type": "StateIssueCustomField"
      }]);
  });

  test("should return custom fields values (multi select)", () => {
    const data = {
      ...pick(mockFormValues, ["summary", "description", "project"]),
      "130-44": ["178-4", "178-5"],
    };
    const result = [{
      "id": "130-44",
      "value": [{ "id": "178-4" }, { "id": "178-5" }],
      "$type": "MultiBuildIssueCustomField"
    }];

    expect(getCustomFieldValues(data, "0-6", mockProjects as never))
      .toStrictEqual(result);
  });

  test("should return empty array", () => {
    const data = pick(mockFormValues, ["summary", "description", "project"]);

    expect(getCustomFieldValues(data, "0-6", mockProjects as never)).toStrictEqual([]);
  });
});
