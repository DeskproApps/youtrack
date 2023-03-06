import { getDefaultValues } from "../../utils";
import mockFormValues from "./mockFormValues";

describe("getDefaultValues", () => {
  test("should return default values", () => {
    expect(getDefaultValues(mockFormValues)).toStrictEqual({
      summary: "Huston!",
      description: "We have a problem...",
      project: { id: "0-6" },
    });
  });

  test("should return default values without description", () => {
    const data = { ...mockFormValues, description: "" };

    expect(getDefaultValues(data)).toStrictEqual({
      summary: "Huston!",
      project: { id: "0-6" },
    });
  });
});
