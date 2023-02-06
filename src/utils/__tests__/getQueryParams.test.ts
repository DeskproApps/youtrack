import { getQueryParams } from "../getQueryParams";

describe("getQueryParams", () => {
  test("pass empty queryParam", () => {
    expect(getQueryParams([])).toBe("");
    expect(getQueryParams({})).toBe("");
    expect(getQueryParams([], { skipParseQueryParams: true })).toBe("");
    expect(getQueryParams({}, { skipParseQueryParams: true })).toBe("");
  });

  test("should encode queryParams (pass array)", () => {
    expect(getQueryParams([
      ["fields", "id,idReadable,summary"],
      ["query", "issue id:SPDP-3"]
    ])).toBe("?fields=id%2CidReadable%2Csummary&query=issue+id%3ASPDP-3");
  });

  test("should encode queryParams (pass object)", () => {
    expect(getQueryParams({
      fields: "id,idReadable,summary",
      query: "issue id:SPDP-3",
    })).toBe("?fields=id%2CidReadable%2Csummary&query=issue+id%3ASPDP-3");
  });

  test("should return queryParams without encode (pass array)", () => {
    expect(getQueryParams([
      ["fields", "id,idReadable,summary"],
      ["query", "issue id:SPDP-3"]
    ], { skipParseQueryParams: true })).toBe("?fields=id,idReadable,summary&query=issue id:SPDP-3");
  });

  test("should return queryParams without encode (pass object)", () => {
    expect(getQueryParams({
      fields: "id,idReadable,summary",
      query: "issue id:SPDP-3"
    }, { skipParseQueryParams: true })).toBe("?fields=id,idReadable,summary&query=issue id:SPDP-3");
  });
});
