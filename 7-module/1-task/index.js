import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  #elem = null;
  #categories = [];
  #template = `
  <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner"></nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
  `;
  #ribbonInner = null;
  #stepOfScroll = null;
  #leftArrow = null;
  #rightArrow = null;
  value = "";

  constructor(categories) {
    this.#categories = categories;
    this.#render();
    this.#ribbonInner = this.#elem.querySelector(".ribbon__inner");
    this.#stepOfScroll = 350;
    this.#addEventListeners();
  }

  get elem() {
    return this.#elem;
  }

  #render() {
    this.#elem = createElement(this.#template);
    const categoriesElements = this.#categories.map(({ id, name }) => {
      return createElement(`<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`);
    });
    this.#elem.querySelector(".ribbon__inner").append(...categoriesElements);
    this.#elem.querySelector(".ribbon__item").classList.add("ribbon__item_active");
  }

  #addEventListeners() {
    this.#leftArrow = this.#elem.querySelector(".ribbon__arrow_left");
    this.#rightArrow = this.#elem.querySelector(".ribbon__arrow_right");

    this.#leftArrow.addEventListener("click", () => {
      this.#ribbonInner.scrollBy(-this.#stepOfScroll, 0);
    });

    this.#rightArrow.addEventListener("click", () => {
      this.#ribbonInner.scrollBy(this.#stepOfScroll, 0);
    });

    this.#ribbonInner.addEventListener("scroll", () => {
      this.#updateArrowsVisibility();
    });

    this.#ribbonInner.addEventListener("click", (event) => {
      let clickedCategoryElem = event.target.closest(".ribbon__item");
      if (clickedCategoryElem) {
        // event.preventDefault();
        this.#clickOnCategory(clickedCategoryElem);
        event.preventDefault();
      }
    });
  }

  #updateArrowsVisibility() {
    let scrollLeft = this.#ribbonInner.scrollLeft;
    let scrollRight =
      this.#ribbonInner.scrollWidth - this.#ribbonInner.scrollLeft - this.#ribbonInner.clientWidth;

    if (scrollLeft > 0) {
      this.#leftArrow.classList.add("ribbon__arrow_visible");
    } else {
      this.#leftArrow.classList.remove("ribbon__arrow_visible");
    }

    if (scrollRight > 1) {
      this.#rightArrow.classList.add("ribbon__arrow_visible");
    } else {
      this.#rightArrow.classList.remove("ribbon__arrow_visible");
    }
  }

  #clickOnCategory(categoryElem) {
    let oldCategory = this.#ribbonInner.querySelector(".ribbon__item_active");
    if (oldCategory) {
      oldCategory.classList.remove("ribbon__item_active");
    }
    categoryElem.classList.add("ribbon__item_active");
    this.value = categoryElem.dataset.id;

    this.#elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: this.value,
        bubbles: true,
      })
    );
  }
}
