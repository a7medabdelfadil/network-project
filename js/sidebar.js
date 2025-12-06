// burger 
const burger = document.querySelector(".burger");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
}

burger.addEventListener("click", () => {
  const isOpen = document.body.classList.contains("menu-open");
  setMenu(!isOpen);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

document.querySelectorAll(".sidebar .menu a").forEach((a) => {
  a.addEventListener("click", () => setMenu(false));
});

document.querySelectorAll(".dropdown").forEach((drop) => {
  const btn = drop.querySelector(".item");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    drop.classList.toggle("is-open");
  });
});

// Nested dropdown functionality
document.querySelectorAll(".dropdown-inside").forEach((drop) => {
  const btn = drop.querySelector(".subitem");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    drop.classList.toggle("is-open-inside");
    btn.classList.toggle("is-open-inside");
  });
});
