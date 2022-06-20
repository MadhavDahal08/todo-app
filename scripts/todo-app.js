"use strict";
const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

// adding eventlistener for the text input to filter todo
document.querySelector("#filter-todo").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

// adding event listener to the FormData
document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.todoText.value.trim();
  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });

    saveTodos(todos);
    renderTodos(todos, filters);

    e.target.elements.todoText.value = "";
  }
});

// adding event listener to the hide completed checkbox
document.querySelector("#hide-completed").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
