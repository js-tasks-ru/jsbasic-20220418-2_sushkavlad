import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  slides = null;
  numOfSlides = 0;
  carouselInner = null;
  elem = null;
  leftArrow = null;
  rightArrow = null;
  currentSlide = 0;

  constructor(slides) {
    this.slides = slides;
    this.numOfSlides = slides.length;
    this.elem = this.render(slides);
    this.leftArrow = this.elem.querySelector(".carousel__arrow_left");
    this.rightArrow = this.elem.querySelector(".carousel__arrow_right");
    this.hideArrows();
    this.addEventListeners();
  }

  render(slides) {
    const carousel = createElement(`<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner"></div>
    </div>
    `);
    this.carouselInner = carousel.querySelector(".carousel__inner");
    slides.map((item) => {
      this.carouselInner.append(
        createElement(`<div class="carousel__slide" data-id=${item.id}>
      <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`)
      );
    });
    return carousel;
  }

  addEventListeners() {
    this.leftArrow.addEventListener("click", () => {
      this.currentSlide--;
      this.slideShift();
      this.hideArrows();
    });

    this.rightArrow.addEventListener("click", () => {
      this.currentSlide++;
      this.slideShift();
      this.hideArrows();
    });

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__button")) {
        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: event.target.closest(".carousel__slide").dataset.id,
            bubbles: true,
          })
        );
      }
    });
  }

  slideShift() {
    let shift = -this.carouselInner.offsetWidth * this.currentSlide;
    this.carouselInner.style.transform = `translateX(${shift}px)`;
  }

  hideArrows() {
    this.leftArrow.style.display = this.currentSlide === 0 ? "none" : "";
    this.rightArrow.style.display = this.currentSlide === this.numOfSlides - 1 ? "none" : "";
  }
}
