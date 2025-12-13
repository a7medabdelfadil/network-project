const { isValidIndex, getTranslateX } = require("../src/slider");

describe("slider.js - Boundary / Unit tests", () => {
  test("isValidIndex: rejects invalid values", () => {
    expect(isValidIndex(-1)).toBe(false);
    expect(isValidIndex(NaN)).toBe(false);
    expect(isValidIndex("1")).toBe(false);
    expect(isValidIndex(null)).toBe(false);
  });

  test("isValidIndex: accepts 0 and positive numbers", () => {
    expect(isValidIndex(0)).toBe(true);
    expect(isValidIndex(2)).toBe(true);
  });

  test("getTranslateX: returns null for invalid index", () => {
    expect(getTranslateX(-1)).toBe(null);
    expect(getTranslateX("2")).toBe(null);
  });

  test("getTranslateX: returns correct transform string", () => {
    expect(getTranslateX(0)).toBe("translateX(-0%)");
    expect(getTranslateX(2)).toBe("translateX(-200%)");
  });
});
