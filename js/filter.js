const filterBtns = document.querySelectorAll(".filters__btn");
const works = document.querySelectorAll(".work");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const category = btn.textContent.toLowerCase();

    works.forEach(work => {
      const workCat = work.dataset.category;
      if (category === "all projects" || category === workCat) {
        work.style.display = "block"; 
        work.style.opacity = 0;
        setTimeout(() => work.style.opacity = 1, 10); 
      } else {
        work.style.display = "none";
      }
    });
  });
});
