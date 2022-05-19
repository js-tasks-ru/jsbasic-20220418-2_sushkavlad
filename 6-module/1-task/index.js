/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  constructor(rows) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr>
    <th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>
  </tr>`;
    const tbody = document.createElement("tbody");
    for (let { name, age, salary, city } of rows) {
      tbody.insertAdjacentHTML(
        "beforeend",
        `<tr>
      <td>${name}</td>
      <td>${age}</td>
      <td>${salary}</td>
      <td>${city}</td>
      <td><button>X</button></td>
  </tr>`
      );
    }
    table.append(thead, tbody);
    table.onclick = function (event) {
      if (event.target.tagName === "BUTTON") {
        event.target.closest("tr").remove();
      }
    };
    this.elem = table;
  }
}
