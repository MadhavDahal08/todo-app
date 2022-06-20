"use strict";
// Read existing todos from the local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// adding the remove button to remove todo from the list
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// this function is used to toggle the checkbox value either check or uncheck and modify object according to checkbox
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
// Save the todos to local storage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector("#todos");

  // filtering the todo based on input
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  todoEl.innerHTML = "";
  // finding the number of not completed task
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  generateSummaryDOM(incompleteTodos);

  // adding each paragraph for each todo in the html document
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const paragraphEl = document.createElement("p");
    paragraphEl.classList.add("empty-message");
    paragraphEl.textContent = "No to-dos to show";
    todoEl.append(paragraphEl);
  }
};

// Generate the DOM structure for a todo
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const text = document.createElement("text");
  const button = document.createElement("button");

  // adding checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // adding paragraph to show todo title
  text.textContent = todo.text;
  containerEl.appendChild(text);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);
  // adding remove button
  button.textContent = "remove";
  button.classList.add("button", "button--text");
  todoEl.appendChild(button);
  button.addEventListener("click", (e) => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  const todo = incompleteTodos.length > 1 ? "todos" : "todo";
  summary.textContent = `You have ${incompleteTodos.length} ${todo} left`;
  document.querySelector("#todos").appendChild(summary);
};
