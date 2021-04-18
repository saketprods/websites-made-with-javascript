const main = document.querySelector("main");

main.addEventListener('click', (e)=>{
  if(e.target.tagName === "BUTTON") {
    const {name} = e.target.dataset;
    if(name === "add-btn") {
        const todoInput = main.querySelector('[data-name="todo-input"]');
        if(todoInput.value.trim() !== "") {
          const value = todoInput.value;
          const temp = `<li class="listitem" data-id="${Date.now()}" draggable="true">
            <p>${value}</p>
            <button class="btnsub" data-name="remove-btn">
              X
            </button>
          </li>`;
          const todolist = main.querySelector('[data-name="todos-list"]');
          todolist.insertAdjacentHTML("beforeend", temp);
          todoInput.value = "";
        }
    } else if (name === "remove-btn") {
      e.target.parentElement.remove();
    }
  }
});

let elemBelow = "";

main.addEventListener("dragover", (e)=>{
  e.preventDefault();
  elemBelow = e.target;
});

main.addEventListener("dragstart", (e)=>{
  if(e.target.classList.contains("listitem")) {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
  }
});

main.addEventListener("dragenter", (e)=>{
  if(e.target.classList.contains("list")) {
    e.target.classList.add("drop");
  }
});

main.addEventListener("dragleave", (e)=>{
  if(e.target.classList.contains("drop")) {
    e.target.classList.remove("drop");
  }
});

main.addEventListener("drop", (e)=>{
  const todo = main.querySelector(`[data-id="${e.dataTransfer.getData("text/plain")}"]`);

  if(elemBelow === todo) {
    return ;
  }

  if(elemBelow.tagName === "P" || elemBelow.tagName === "BUTTON") {
    elemBelow = elemBelow.parentElement;
  }

  if(elemBelow.classList.contains("listitem")) {
    const center = elemBelow.getBoundingClientRect().y + elemBelow.getBoundingClientRect().height/2;

    if(e.clientY > center) {
      if(elemBelow.nextElementSibling !== null) {
        elemBelow = elemBelow.nextElementSibling;
      } else {
        return ;
      }
      elemBelow.parentElement.insertBefore(todo, elemBelow);
      todo.className = elemBelow.className;
    }
  }

  if(elemBelow.classList.contains("list")) {
    e.target.append(todo);

    if(e.target.classList.contains("drop")) {
      e.target.classList.remove("drop");
    }

    const {name} = e.target.dataset;

    if(name === "completed-list") {
      e.target.classList.add("completed");
    }
  }
});
