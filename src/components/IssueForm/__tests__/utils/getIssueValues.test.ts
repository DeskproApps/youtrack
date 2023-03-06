import pick from "lodash/pick";
import { getIssueValues } from "../../utils";
import mockFormValues from "./mockFormValues";
import mockProjects from "../mockProjects";

describe("getIssueValues", () => {
  test("should return full data", () => {
    const data = pick(mockFormValues, ["summary", "description", "project"]);

    expect(getIssueValues(data, mockProjects as never)).toStrictEqual({
      summary: "Huston!",
      description: "We have a problem...",
      project: { id: "0-6" },
      customFields: [],
    });
  });

  test("should return part data", () => {
    const data = {
      ...pick(mockFormValues, ["summary", "project"]),
      description: "",
    };

    expect(getIssueValues(data, mockProjects as never)).toStrictEqual({
      summary: "Huston!",
      project: { id: "0-6" },
      customFields: [],
    });
  });

  test("should return with custom fields", () => {
    expect(getIssueValues(mockFormValues, mockProjects as never)).toStrictEqual({
      "summary": "Huston!",
      "project": {"id": "0-6"},
      "description": "We have a problem...",
      "customFields": [
        { "value": {"id": "111-2"}, "id": "130-38", "$type": "StateIssueCustomField" },
        { "value": {"id": "178-2"}, "id": "130-43", "$type": "SingleBuildIssueCustomField" },
        { "value": [{"id": "178-4"}, {"id": "178-5"}], "id": "130-44", "$type": "MultiBuildIssueCustomField" },
        { "value": {"id": "109-20"}, "id": "130-45", "$type": "SingleEnumIssueCustomField" },
        { "value": [{"id": "109-21"}, {"id": "109-23"}], "id": "130-46", "$type": "MultiEnumIssueCustomField" },
        { "value": {"id": "138-9"}, "id": "130-47", "$type": "SingleOwnedIssueCustomField" },
        { "value": [{"id": "138-12"}, {"id": "138-13"}, {"id": "138-14"}], "id": "130-48", "$type": "MultiOwnedIssueCustomField" },
        { "value": {"id": "177-24"}, "id": "130-49", "$type": "SingleVersionIssueCustomField" },
        { "value": [{"id": "177-30"}, {"id": "177-33"}, {"id": "177-35"}], "id": "130-50", "$type": "MultiVersionIssueCustomField" },
        { "value": {"id": "1-0"}, "id": "131-7", "$type": "SingleUserIssueCustomField" },
        { "value": [{"id": "1-0"}, {"id": "1-1"}, {"id": "1-2"}], "id": "131-8", "$type": "MultiUserIssueCustomField" },
        { "value": {"presentation": "4h 15m"}, "id": "137-3", "$type": "PeriodIssueCustomField" },
        { "value": {"text": "### Custom text\\n\\n__one__, *two*, ~~three~~", "$type": "TextFieldValue"}, "id": "169-1", "$type": "TextIssueCustomField" },
        { "value": 1678226400000, "id": "170-3", "$type": "DateIssueCustomField"},
        { "value": 1678879800000, "id": "170-4",  "$type": "SimpleIssueCustomField" },
        { "value": 3.14, "id": "170-5", "$type": "SimpleIssueCustomField"},
        { "value": 100500, "id": "170-6", "$type": "SimpleIssueCustomField" },
        { "value": "https://custom.string.field", "id": "170-7", "$type": "SimpleIssueCustomField" },
        { "value": {"id": "3-0"}, "id": "179-0", "$type": "SingleGroupIssueCustomField" },
        { "value": [{"id": "3-6"}, {"id": "3-8"}], "id": "179-1", "$type": "MultiGroupIssueCustomField"}
      ]
    });
  });
});
