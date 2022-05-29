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
  #thumb = null;
  #progress = null;
  #steps = 0;
  #segments = 0;
  currentValue = 0;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#segments = steps - 1;
    this.#render();
    this.#thumb = this.elem.querySelector(".slider__thumb");
    this.#progress = this.elem.querySelector(".slider__progress");
    this.#addEventListeners();
    this.#setValueByClick(value);
  }

  #render() {
    const sliderElem = createElement(this.#template);
    sliderElem.querySelector(".slider__steps").innerHTML = "<span></span>".repeat(this.#steps);
    this.elem = sliderElem;
  }

  #changeActiveStep() {
    let oldActiveStep = this.elem.querySelector(".slider__step-active");
    if (oldActiveStep) {
      oldActiveStep.classList.remove("slider__step-active");
    }
    this.elem
      .querySelector(".slider__steps")
      .querySelectorAll("span")
      [this.currentValue].classList.add("slider__step-active");
  }

  #setValueByClick(value) {
    this.currentValue = value;
    this.elem.querySelector(".slider__value").textContent = this.currentValue;

    let valuePercents = (this.currentValue / this.#segments) * 100;
    this.#thumb.style.left = `${valuePercents}%`;
    this.#progress.style.width = `${valuePercents}%`;

    this.#changeActiveStep();
  }

  #addEventListeners() {
    this.#thumb.ondragstart = () => false;
    this.elem.addEventListener("click", this.#clickOnSlider);
    this.#thumb.addEventListener("pointerdown", this.#pointerDown);
  }

  #pointerDown = (event) => {
    event.preventDefault();
    this.elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.#pointerMove);
    document.addEventListener("pointerup", this.#pointerUp);
  };

  #pointerMove = (event) => {
    event.preventDefault();
    let relativePosition =
      (event.clientX - this.elem.getBoundingClientRect().left) /
      (this.elem.offsetWidth / this.#segments);
    if (relativePosition < 0) {
      relativePosition = 0;
    } else if (relativePosition > this.#steps - 1) {
      relativePosition = this.#steps - 1;
    }
    this.#thumb.style.left = `${(relativePosition / this.#segments) * 100}%`;
    this.#progress.style.width = `${(relativePosition / this.#segments) * 100}%`;

    this.currentValue = Math.round(relativePosition);
    this.elem.querySelector(".slider__value").textContent = this.currentValue;

    this.#changeActiveStep();
  };

  #pointerUp = () => {
    document.removeEventListener("pointermove", this.#pointerMove);
    document.removeEventListener("pointerup", this.#pointerUp);
    this.elem.classList.remove("slider_dragging");

    this.#thumb.style.left = `${(this.currentValue / this.#segments) * 100}%`;
    this.#progress.style.width = `${(this.currentValue / this.#segments) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.currentValue,
        bubbles: true,
      })
    );
  };

  #clickOnSlider = (event) => {
    let widthOfSegment = this.elem.offsetWidth / this.#segments;
    let relativePosition =
      (event.clientX - this.elem.getBoundingClientRect().left) / widthOfSegment;
    this.#setValueByClick(Math.round(relativePosition));

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.currentValue,
        bubbles: true,
      })
    );
  };
}
