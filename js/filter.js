function normalize(value) {
  return (value ?? "").toString().trim().toLowerCase();
}

function isAllCategory(selectedCategory) {
  const c = normalize(selectedCategory);
  return c === "" || c === "all" || c === "all projects";
}

function shouldShowWork(selectedCategory, workCategory) {
  const selected = normalize(selectedCategory);
  const workCat = normalize(workCategory);

  if (isAllCategory(selected)) return true;
  if (workCat === "") return false; 
  return selected === workCat;
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  initFilters();
}

if (typeof module !== "undefined") {
  module.exports = { normalize, isAllCategory, shouldShowWork, initFilters };
}

function initFilters() {
  const filterBtns = document.querySelectorAll(".filters__btn");
  const works = document.querySelectorAll(".work");
  if (!filterBtns || filterBtns.length === 0 || !works || works.length === 0) {
    console.warn("[Boundary] Filters or works not found. Skipping filtering feature.");
    return;
  }
  filterBtns.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b && b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const selectedCategory = normalize(btn.textContent);
      works.forEach((work) => {
        if (!work) return;
        const workCategory = work.dataset?.category;
        if (shouldShowWork(selectedCategory, workCategory)) {
          work.style.display = "block";
          work.style.opacity = 0;
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
