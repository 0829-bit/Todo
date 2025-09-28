const input = document.getElementById("myInput");
const addBtn = document.querySelector(".addBtn");
const ul = document.getElementById("myUL");

addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const todoText = input.value.trim();
  if (todoText === "") return;

  createTodoElement(todoText);
  saveTodos();
  input.value = "";
}

function createTodoElement(todoText) {
  const li = document.createElement("li");
  li.textContent = todoText;

  const span = document.createElement("span");
  span.textContent = " ❌";
  span.style.cursor = "pointer";
  span.style.float = "right";

  span.addEventListener("click", () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(span);
  ul.appendChild(li);
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll("#myUL li").forEach(li => {
    todos.push(li.firstChild.textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  ul.innerHTML = ""; 
  todos.forEach(todoText => createTodoElement(todoText));
}
