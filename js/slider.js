/* ============================================================
   slider.js
   - Exposes pure functions for Unit Testing
   - DOM logic inside initSlider() (runs only in browser)
   ============================================================ */

function isValidIndex(index) {
  return typeof index === "number" && !Number.isNaN(index) && index >= 0;
}

function getTranslateX(index) {
  // Pure: compute CSS transform value
  if (!isValidIndex(index)) return null;
  return `translateX(-${index * 100}%)`;
}

function initSlider() {
  const track = document.querySelector(".sdetails-slider__track");
  const dots = document.querySelectorAll(".sdetails-slider__dots .dot");

  // Boundary: required elements missing
  if (!track || !dots || dots.length === 0) {
    console.warn("[Boundary] Slider track or dots not found. Skipping slider feature.");
    return;
  }

  dots.forEach((dot, index) => {
    if (!dot) return;

    dot.addEventListener("click", () => {
      const transform = getTranslateX(index);
      if (!transform) return; // Robustness

      track.style.transform = transform;

      // Reliability requirement: only one active dot
      dots.forEach((d) => d && d.classList.remove("active"));
      dot.classList.add("active");
    });
  });
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  initSlider();
}

if (typeof module !== "undefined") {
  module.exports = { isValidIndex, getTranslateX, initSlider };
}
