import { getProjectCustomFields } from "../../utils";
import mockProjects from "../mockProjects";
import customProject from "../mocks/customProject.json";

describe("getProjectCustomFields", () => {
  test("should return project", () => {
    expect(getProjectCustomFields(mockProjects as never, "0-4")).toEqual([]);
    expect(getProjectCustomFields(mockProjects as never, "0-6")).toEqual(customProject["customFields"]);
  });

  test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (projects) => {
    expect(getProjectCustomFields(projects as never, "")).toEqual([]);
  });

  test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (projects) => {
    expect(getProjectCustomFields(projects as never, "0-4")).toEqual([]);
  });
});
