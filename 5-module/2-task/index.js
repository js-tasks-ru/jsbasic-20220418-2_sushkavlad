function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  button.onclick = function () {
    const text = document.getElementById("text");
    text.hidden = !text.hidden;
  };
}
