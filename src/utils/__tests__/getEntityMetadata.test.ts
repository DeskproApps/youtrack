import { getEntityMetadata } from "../getEntityMetadata";
import mockIssue from "../../components/ViewIssue/__tests__/issue.json"

describe("getEntityMetadata", () => {
  test("should return metadata", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getEntityMetadata(mockIssue as any)).toStrictEqual({
      id: "2-40",
      idReadable: "SPDP-3",
      summary: "Simple Deskpro Issue",
      project: "Simple Deskpro Project",
    });
  });

  test("shouldn't return metadata", () => {
    expect(getEntityMetadata()).toBeUndefined();
  });
});
