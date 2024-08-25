export class Todo {
    constructor(storage) {
        this.storage = storage;
        this.todoId = null;
        this.filteredValue = "all";
        this.todoId ;

        this.selectTodo = document.querySelector("#todos")
        this.input = document.querySelector("#input")
        this.addTodoBtn = document.querySelector("#addBtn")
        this.clearAll = document.querySelector("#clearAll")
        this.todosHtml = document.querySelector(".task-box")
        this.shadow = document.querySelector("#shadow")
        this.modal = document.querySelector("#modaltext");
        this.text = document.querySelector("#text")
        this.cancelBtns = document.querySelectorAll(".cancelBtn")
        this.confirmBtn = document.querySelector(".confirmBtn")

        this.bindEvents();
    }

    bindEvents() {
        this.input.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.addNewTodo()
            }
        })
        this.addTodoBtn.addEventListener("click", () => {
            this.addNewTodo()
        })
        this.clearAll.addEventListener("click", () => {
            let todos = this.storage.getAllTodos;
            console.log(todos);
            todos.splice(0, todos.length)
            localStorage.setItem("todos", JSON.stringify(todos))
            this.createTodo(todos)
        })
        this.confirmBtn.addEventListener('click', () => {
            this.editTodo()
            this.closeModal()
        })
        this.text.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.closeModal()
                this.editTodo()
            }
        })
        this.selectTodo.addEventListener("change", (e) => {
            this.filteredValue = e.target.value;
            this.filterTodo()
        })
        document.addEventListener("DOMContentLoaded", () => {
            let todos = this.storage.getAllTodos;
            this.createTodo(todos)
        })
    }


    addNewTodo() {
        const newTodo = {
            ischk: false,
            title: input.value,
            id: new Date().getTime(),
        }
        let todos = this.storage.getAllTodos;
        this.storage.saveTodo(newTodo)
        this.createTodo(todos)
        this.filterTodo()
    }


    createTodo(todosArray) {
        let output = ' ';
        todosArray.forEach((todo) => {
            output += `                   
        <li  class="  ${todo.ischk ? " bg-main/20 " : "  " } border-2 border-main z-10  mt-2 mx-3   rounded-xl  list-none py-4 px-3 text-black font-medium text-[17px] flex items-end justify-between  ">
            <span id="todo-value" class="  ${todo.ischk ? " line-through  " : "  " } text-base break-words basis-4/4  pr-3 "> ${todo.title}  </span>
            <div  class=" bg-stone-100/  flex justify-center gap-x-2 items-center basis-[26%] ">
                        <div   id="edit" data-id='${todo.id}'   class=" relative  w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer  border-2 border-stone-700 " >            
                            <svg   id="edit" data-id='${todo.id}'  stroke="currentColor" class="  stroke-stone-700  w-3 h-3  "  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"  >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /> 
                            </svg></div>
                        <div class="  w-6 h-6 rounded-lg flex items-center justify-center  border-2 border-stone-700 " >            
                            <svg id="check" data-id='${todo.id}' stroke="currentColor" class=" cursor-pointer stroke-stone-700  w-4 h-4"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"  >
                             <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg></div>
                        <svg id="remove" data-id='${todo.id}'  class=" rounded-lg  w-6 h-6 cursor-pointer  stroke-red-700  " xmlns="http://www.w3.org/2000/svg"
                           fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
            </div>
        </li>
        <span class="  w-full mx-auto bg-main/20 h-[2px] inline-block "></span> 
         `;
        })
        this.todosHtml.innerHTML = output;
        this.input.value = '';
        this.bindTodoActions()
    }


    bindTodoActions() {
        this.shadow.addEventListener("click", this.closeModal);
        this.cancelBtns.forEach(btn => btn.addEventListener('click', () => {
            this.editTodo()
            this.closeModal()
        }))
        const removeBtns = [...document.querySelectorAll("#remove")]
        removeBtns.forEach(btn => btn.addEventListener("click", (e) => {
            this.removeTodo(e)
        }))
        const checkedBtns = [...document.querySelectorAll("#check")]
        checkedBtns.forEach(btn => btn.addEventListener("click", (e) => {
            this.checkTodo(e)
        }))
        const editBtns = [...document.querySelectorAll("#edit")]
        editBtns.forEach(edit => edit.addEventListener('click', (e) => {
            if (e.target.id == "edit") {
                let todos = this.storage.getAllTodos;
                let todoId = Number(e.target.dataset.id);
                let checkTd = todos.find((todo) => todo.id == todoId)
                if (checkTd.ischk == true) {
                    e.preventDefault()
                } else {
                    this.modalToggle(e)
                }
            }
        }))

    }


    removeTodo(e) {
        let todoId = Number(e.target.dataset.id);
        this.storage.removeTodoById(todoId);
        let todos = this.storage.getAllTodos;
        this.createTodo(todos);
        this.filterTodo();
    }


    checkTodo(e) {
        let todoId = Number(e.target.dataset.id);
        this.storage.toggleCheckTodoById(todoId);
        let todos = this.storage.getAllTodos;
        this.createTodo(todos);
        this.filterTodo();
    }


    closeModal() {
        this.modal.classList.add("hidden")
        this.shadow.classList.add("hidden")
    }


    modalToggle(e) {
        if (e.target.id == "edit") {
            this.modal.classList.remove("hidden")
            this.shadow.classList.remove("hidden")
            let innerValue = e.target.parentElement.parentElement.parentElement.children[0].innerText;
            this.text.value = innerValue;
            this.text.focus()
            this.todoId = Number(e.target.dataset.id);
        }
    }


    editTodo() {
        let todos = this.storage.getAllTodos;
        let checkTd = todos.find((todo) => todo.id == this.todoId);
        checkTd.title = text.value;
        localStorage.setItem("todos", JSON.stringify(todos))
        this.createTodo(todos)
        this.filterTodo()
    }

    filterTodo() {
        let todos = this.storage.getAllTodos;
        switch (this.filteredValue) {
            case "all": {
                this.createTodo(todos)
                break;
            }
            case "remaining": {
                const filteredTodos = todos.filter((todo) => !todo.ischk)
                this.createTodo(filteredTodos)
                break;
            }
            case "finished": {
                const filteredTodos = todos.filter((todo) => todo.ischk)
                this.createTodo(filteredTodos)
                break;
            }
            default:
                this.createTodo(todos)
        }
    }

}