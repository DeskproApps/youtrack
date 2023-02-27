import { getIssueValues, getInitValues } from "../utils";

describe("getIssueValues", () => {
  test("should return full data", () => {
    const data = {
      summary: "This is summary",
      description: "description",
      project: { label: "1", value: "01", key: "01", type: "value" },
    };

    expect(getIssueValues(data)).toEqual({
      summary: "This is summary",
      description: "description",
      project: { id: "01" },
    });
  });

  test("should return part data", () => {
    const data = {
      summary: "This is summary",
      description: "",
      project: { label: "1", value: "01", key: "01", type: "value" },
    };

    expect(getIssueValues(data)).toEqual({
      summary: "This is summary",
      project: { id: "01" },
    });
  });

  test.todo("custom fields");
});

describe("getIssueValues", () => {
  test("should return default value", () => {
    expect(getInitValues()).toEqual({
      summary: "",
      description: "",
      project: { label: "", value: "", key: "", type: "value" },
    });
  });

  test.todo("custom fields");
});
