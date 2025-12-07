const track = document.querySelector(".sdetails-slider__track");
const dots = document.querySelectorAll(".sdetails-slider__dots .dot");

dots.forEach((dot, index) => { // 0 1 2
  dot.addEventListener("click", () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});
