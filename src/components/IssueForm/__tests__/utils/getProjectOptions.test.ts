import { getProjectOptions } from "../../utils";
import mockProjects from "../mockProjects";

describe("getProjectOptions", () => {
  test("should return project options", () => {
    const expected = [
      { label: "Custom DP Project", value: "0-6", key: "0-6", type: "value" },
      { label: "Default Deskpro Project", value: "0-5", key: "0-5", type: "value" },
      { label: "Demo project", value: "0-0", key: "0-0", type: "value" },
      { label: "Kanban Deskpro", value: "0-3", key: "0-3", type: "value" },
      { label: "Scrum Deskpro", value: "0-2", key: "0-2", type: "value" },
      { label: "Simple Deskpro", value: "0-4", key: "0-4", type: "value" },
    ];

    expect(getProjectOptions(mockProjects as never)).toEqual(expected);
  });

  test.each(
    [undefined, null, {}, [], "", 1, "1", false, true]
  )("empty or wrong value: %p", (received) => {
    expect(getProjectOptions(received as never)).toEqual([]);
  });
});
