import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  elem = null;
  #template = `
  <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps"></div>
  </div>`;
  #steps = 0;
  #segments = 0;
  #currentValue = 0;
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#segments = steps - 1;
    this.#render();
    this.#addEventListeners();
    this.#setValue(value);
  }

  #render() {
    const sliderElem = createElement(this.#template);
    sliderElem.querySelector(".slider__steps").innerHTML = "<span></span>".repeat(this.#steps);
    this.elem = sliderElem;
  }

  #setValue(value) {
    this.#currentValue = value;
    this.elem.querySelector(".slider__value").textContent = this.#currentValue;

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");

    let valuePercents = (this.#currentValue / this.#segments) * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    let oldActiveStep = this.elem.querySelector(".slider__step-active");
    if (oldActiveStep) {
      oldActiveStep.classList.remove("slider__step-active");
    }
    this.elem
      .querySelector(".slider__steps")
      .querySelectorAll("span")
      [this.#currentValue].classList.add("slider__step-active");
  }

  #addEventListeners() {
    this.elem.addEventListener("click", this.#clickOnSlider);
  }

  #clickOnSlider = (event) => {
    let widthOfSegment = this.elem.offsetWidth / this.#segments;
    let relativePosition =
      (event.clientX - this.elem.getBoundingClientRect().left) / widthOfSegment;
    this.#setValue(Math.round(relativePosition));

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.#currentValue,
        bubbles: true,
      })
    );
  };
}
