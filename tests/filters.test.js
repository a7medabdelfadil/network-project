const { normalize, isAllCategory, shouldShowWork } = require("../src/filters");

describe("filters.js - Boundary / Unit tests", () => {
  test("normalize: handles null/undefined safely", () => {
    expect(normalize(null)).toBe("");
    expect(normalize(undefined)).toBe("");
  });

  test("normalize: trims spaces and lowercases", () => {
    expect(normalize("  All Projects \n")).toBe("all projects");
  });

  test("isAllCategory: accepts empty and common all labels", () => {
    expect(isAllCategory("")).toBe(true);
    expect(isAllCategory("all")).toBe(true);
    expect(isAllCategory("All Projects")).toBe(true);
  });

  test("shouldShowWork: shows all when selected is all/empty", () => {
    expect(shouldShowWork("all", "web")).toBe(true);
    expect(shouldShowWork("", "mobile")).toBe(true);
  });

  test("shouldShowWork: matches exact normalized category", () => {
    expect(shouldShowWork("Web", "web")).toBe(true);
    expect(shouldShowWork(" web ", "WEB")).toBe(true);
  });

  test("shouldShowWork: returns false when work category missing", () => {
    expect(shouldShowWork("web", "")).toBe(false);
    expect(shouldShowWork("web", null)).toBe(false);
    expect(shouldShowWork("web", undefined)).toBe(false);
  });

  test("shouldShowWork: returns false when not matching", () => {
    expect(shouldShowWork("web", "mobile")).toBe(false);
  });
});
