/* ============================================================
   filters.js
   - Exposes pure functions for Unit Testing
   - Keeps DOM logic inside init() (runs only in browser)
   ============================================================ */

// ---------- Pure helpers (Unit-testable) ----------
function normalize(value) {
  // Boundary: handle null/undefined, spaces, casing
  return (value ?? "").toString().trim().toLowerCase();
}

function isAllCategory(selectedCategory) {
  // Boundary: treat empty/unknown as "all" to avoid hiding everything
  const c = normalize(selectedCategory);
  return c === "" || c === "all" || c === "all projects";
}

function shouldShowWork(selectedCategory, workCategory) {
  // Pure decision logic used by the UI filtering
  const selected = normalize(selectedCategory);
  const workCat = normalize(workCategory);

  if (isAllCategory(selected)) return true;
  if (workCat === "") return false; // Boundary: missing work category => don't match
  return selected === workCat;
}

// ---------- DOM logic (runs in browser only) ----------
function initFilters() {
  const filterBtns = document.querySelectorAll(".filters__btn");
  const works = document.querySelectorAll(".work");

  // Boundary: if missing elements, do nothing
  if (!filterBtns || filterBtns.length === 0 || !works || works.length === 0) {
    console.warn("[Boundary] Filters or works not found. Skipping filtering feature.");
    return;
  }

  filterBtns.forEach((btn) => {
    if (!btn) return;

    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b && b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const selectedCategory = normalize(btn.textContent);

      works.forEach((work) => {
        if (!work) return;

        const workCategory = work.dataset?.category;

        if (shouldShowWork(selectedCategory, workCategory)) {
          work.style.display = "block";
          work.style.opacity = 0;

          // Worst-case: rapid clicks => avoid timer overlap
          clearTimeout(work.__fadeTimer);
          work.__fadeTimer = setTimeout(() => {
            work.style.opacity = 1;
          }, 10);
        } else {
          work.style.display = "none";
        }
      });
    });
  });
}

// Auto-run only in browser (prevents Jest from failing due to missing document)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  initFilters();
}

// Export for Jest (Node)
if (typeof module !== "undefined") {
  module.exports = { normalize, isAllCategory, shouldShowWork, initFilters };
}
