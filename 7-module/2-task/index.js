import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  #template = `
  <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
  </div>
  `;
  #elem = null;

  constructor() {
    this.#render();
    this.#elem.addEventListener("click", this.#onCloseButtonClick);
  }

  #render() {
    this.#elem = createElement(this.#template);
  }

  open() {
    document.body.append(this.#elem);
    document.body.classList.add("is-modal-open");

    document.body.addEventListener("keydown", this.#onEscButtonClick);
  }

  setTitle(title) {
    this.#elem.querySelector(".modal__title").textContent = title;
  }

  setBody(bodyElem) {
    let modalBody = this.#elem.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(bodyElem);
  }

  close() {
    document.body.removeEventListener("keydown", this.#onEscButtonClick);
    document.body.classList.remove("is-modal-open");
    this.#elem.remove();
  }

  #onCloseButtonClick = (event) => {
    if (event.target.closest(".modal__close")) {
      event.preventDefault();
      this.close();
    }
  };

  #onEscButtonClick = (event) => {
    if (event.code === "Escape") {
      event.preventDefault();
      this.close();
    }
  };
}
