import { getInitValues } from "../../utils";

describe("getInitValues", () => {
  test("should return default value", () => {
    expect(getInitValues()).toEqual({
      summary: "",
      description: "",
      project: { label: "", value: "", key: "", type: "value" },
    });
  });

  test.todo("custom fields");
});
