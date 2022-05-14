function initCarousel() {
  const rightArrow = document.querySelector(".carousel__arrow_right");
  const leftArrow = document.querySelector(".carousel__arrow_left");
  const carousel = document.querySelector(".carousel__inner");
  const numOfSlides = 4;
  let currentSlide = 0;

  hideArrows();

  leftArrow.addEventListener("click", () => {
    currentSlide--;
    slideShift();
    hideArrows();
  });

  rightArrow.addEventListener("click", () => {
    currentSlide++;
    slideShift();
    hideArrows();
  });

  function slideShift() {
    let shift = -carousel.offsetWidth * currentSlide;
    carousel.style.transform = `translateX(${shift}px)`;
  }

  function hideArrows() {
    leftArrow.style.display = currentSlide === 0 ? "none" : "";
    rightArrow.style.display = currentSlide === numOfSlides - 1 ? "none" : "";
  }
}
