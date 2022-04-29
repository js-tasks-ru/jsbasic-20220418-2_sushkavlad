function highlight(table) {
  let indexOfAge;
  let indexOfGender;
  let indexOfStatus;

  for (let td of table.rows[0].cells) {
    let text = td.textContent;
    let cellIndex = td.cellIndex;
    if (text === "Age") {
      indexOfAge = cellIndex;
    } else if (text === "Gender") {
      indexOfGender = cellIndex;
    } else if (text === "Status") {
      indexOfStatus = cellIndex;
    }
  }

  for (let i = 1; i < table.rows.length; i++) {
    statusCell = table.rows[i].cells[indexOfStatus];
    if (statusCell.hasAttribute("data-available")) {
      statusCell.parentElement.classList.add(
        statusCell.dataset.available === "true" ? "available" : "unavailable"
      );
    } else {
      statusCell.parentElement.hidden = true;
    }

    genderCell = table.rows[i].cells[indexOfGender];
    genderCell.parentElement.classList.add(genderCell.textContent === "m" ? "male" : "female");

    ageCell = table.rows[i].cells[indexOfAge];
    if (ageCell.textContent < 18) {
      ageCell.parentElement.style = "text-decoration: line-through";
    }
  }
}
