function isValidIndex(index) {
  return typeof index === "number" && !Number.isNaN(index) && index >= 0;
}

function getTranslateX(index) {
  if (!isValidIndex(index)) return null;
  return `translateX(-${index * 100}%)`;
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  initSlider();
}

if (typeof module !== "undefined") {
  module.exports = { isValidIndex, getTranslateX, initSlider };
}

