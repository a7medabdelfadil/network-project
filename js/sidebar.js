/* ============================================================
   sidebar.js
   - DOM logic inside initMenu() (browser only)
   - Small pure helpers if you want to test later
   ============================================================ */

function toggleClass(currentState) {
  // Pure helper: returns the opposite state (unit-testable if needed)
  return !currentState;
}

function initMenu() {
  const burger = document.querySelector(".burger");
  const sidebar = document.querySelector(".sidebar");

  // Boundary: burger might not exist
  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  } else {
    console.warn("[Boundary] .burger not found. Skipping burger feature.");
  }

  // Boundary: sidebar might not exist
  if (sidebar) {
    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
      });
    });
  } else {
    console.warn("[Boundary] .sidebar not found. Skipping sidebar links.");
  }

  // Dropdowns 1st level
  document.querySelectorAll(".dropdown .item").forEach((btn) => {
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.parentElement;
      if (!parent) return; // Boundary
      parent.classList.toggle("is-open");
    });
  });

  // Dropdowns 2nd level
  document.querySelectorAll(".dropdown-inside .subitem").forEach((btn) => {
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.parentElement;
      if (!parent) return; // Boundary
      parent.classList.toggle("is-open-inside");
    });
  });
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  initMenu();
}

if (typeof module !== "undefined") {
  module.exports = { toggleClass, initMenu };
}
