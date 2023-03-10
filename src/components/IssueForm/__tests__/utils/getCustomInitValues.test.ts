import omit from "lodash/omit";
import { getCustomInitValues } from "../../utils";
import mockIssue from "../mocks/mockIssue.json";

describe("getCustomInitValues", () => {
  test("should return empty value", () => {
    expect(getCustomInitValues()).toStrictEqual({});
  });

  test("should return custom value", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values = omit(getCustomInitValues(mockIssue as any), ["131-7"]);

    expect(values).toStrictEqual({
      "130-38": { key: "111-1", label: "Open", type: "value", value: "111-1" },
      "130-43": { key: "178-2", label: "fix in build 1", type: "value", value: "178-2" },
      "130-44": [ "178-4", "178-5" ],
      "130-45": { key: "109-19", label: "Ready to pull", type: "value", value: "109-19" },
      "130-46": [ "109-21", "109-22", "109-23", "109-24", "109-25", "109-26", "109-27", "109-28", "109-29", "109-30" ],
      "130-47": { key: "138-11", label: "Migration", type: "value", value: "138-11" },
      "130-48": [ "138-12", "138-13", "138-14" ],
      "130-49": { key: "177-28", label: "2.0.0", type: "value", value: "177-28" },
      "130-50": [ "177-30", "177-31", "177-33" ],
      "131-8": [ "1-0", "1-1", "1-2" ],
      "137-3": "1d 30m",
      "169-1": "# Custom text field value value value\n\n\n\n1. list 1\n2. list 2\n3. list 3\n\n\n\n```javascript\nconst blockCode = \"JavaScript\"\n```",
      "170-3": new Date("2023-02-14T12:00:00.000Z"),
      "170-4": new Date("2023-03-08T13:00:00.000Z"),
      "170-5": 3.14159,
      "170-6": 123,
      "170-7": "1234567890",
      "179-0": { key: "3-0", label: "All Users", type: "value", value: "3-0" },
      "179-1": [ "3-0", "3-1" ],
    });
  });
});
