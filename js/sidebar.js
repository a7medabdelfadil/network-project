// burger 
const burger = document.querySelector(".burger");
const sidebar = document.querySelector(".sidebar");

burger.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
});

// Dropdowns 1st level 
document.querySelectorAll(".dropdown .item").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = btn.parentElement;
    parent.classList.toggle("is-open");
  });
});

// Dropdowns 2nd level 
document.querySelectorAll(".dropdown-inside .subitem").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = btn.parentElement;
    parent.classList.toggle("is-open-inside");
  });
});