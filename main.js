const form = document.querySelector(".box_input");
const input = document.querySelector("#inputt");
const taskList = document.querySelector("#box_enter");
const editList = document.querySelector("#box_enter");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach((task) => renderTask(task));

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);

function addTask(event) {
  //отменяем отправку формы
  event.preventDefault();

  //достаем текст из поле ввода
  const taskText = input.value;

  //описываем задачу в виде объекта
  const newTask = {
    id: Date.now(), //id как =>текущий время в милисекундах
    text: taskText,
    done: false,
  };

  //добавляем  задачу в массив с задачами
  tasks.push(newTask);

  saveToLocalStorage();

  renderTask(newTask);

  //очищяем поле ввода и возвращяем на него фокус
  input.value = "";
  input.focus();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  const parenNode = event.target.closest(".box_enterr");

  //определяем ID задачи
  const id = Number(parenNode.id);

  //1 метод
  // //находим индекс задачи в массиве
  // const index = tasks.findIndex((task) => task.id === id);

  // //удаляем задачу из массива с задачами
  // tasks.splice(index, 1);

  //2 метод
  //удаляем задачу через фильтарцию массива
  tasks = tasks.filter((task) => task.id !== id);

  saveToLocalStorage();

  parenNode.remove();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parentNode = event.target.closest(".box_enterr");

  const id = Number(parentNode.id);

  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  saveToLocalStorage();

  const taskTitle = parentNode.querySelector(".enter_input");
  taskTitle.classList.toggle("done");
}
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  //формируем css класс
  const cssClass = task.done ? "enter_input done" : "enter_input";

  //формируем разметку для новой задачи
  const taskHTML = `
 <div id ="${task.id}" class="box_enterr" id="box_enter">
 <div class="${cssClass}"> ${task.text}</div>
 <div class="enter_buttons">
   <div class="enter_edit">
   <button type="button" data-action="done" class="btn_action">
   <img src="../todolist/image/pencil.png" alt="" /></button>
   </div>
   <div class="enter_delete">
   <button type="button" data-action="delete" class="btn_action">
   <img src="../todolist/image/bin.png" alt="" /></button>
   </div>
 </div>
 </div>
 `;

  //добавляем задачу на страницу
  taskList.insertAdjacentHTML("beforeend", taskHTML);
}
