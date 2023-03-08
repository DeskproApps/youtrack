import mockIssue from "../mocks/mockIssue.json";
import { getDefaultInitValues } from "../../utils";

describe("getDefaultInitValues", () => {
  test("should return default empty value", () => {
    expect(getDefaultInitValues()).toEqual({
      summary: "",
      description: "",
      project: { label: "", value: "", key: "", type: "value" },
    });
  });

  test("should return default value", () => {
    expect(getDefaultInitValues(mockIssue as never)).toEqual({
      "summary": "Huston!",
      "description": "We have a problem...",
      "project": {"label": "Custom DP Project", "value": "0-6", "key": "0-6", "type": "value"}
    });
  });
});
