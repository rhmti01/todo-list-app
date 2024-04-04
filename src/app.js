// selectring Variables
const selectTodo = document.querySelector("#todos")
const input = document.querySelector("#input")
const addTodoBtn = document.querySelector("#addBtn")
const clearAll = document.querySelector("#clearAll")
const todosHtml = document.querySelector(".task-box")
const shadow = document.querySelector("#shadow")
const modal = document.querySelector("#modaltext");
const text = document.querySelector("#text")
const cancelBtns = document.querySelectorAll(".cancelBtn")
const confirmBtn = document.querySelector(".confirmBtn")
let filteredValue = " all ";
let todoId;


class Todo {
    constructor() {
        // adding new todo by clicking ENTER
        input.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.addNewTodo()
            }
        })
        // adding new todo to app by clicking
        addTodoBtn.addEventListener("click", () => {
            this.addNewTodo()
        })
        // removing all todos
        clearAll.addEventListener("click", () => {
            let todos = storage.getAllTodos;
            todos.splice(0, todos.length)
            localStorage.setItem("todos", JSON.stringify(todos))
            this.createTodo(todos)
        })
        // confirm todos title 
        confirmBtn.addEventListener('click', () => {
            this.editTodo()
            this.closeModal()
        })
        // edit todos title by clicking ENTER
        text.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.closeModal()
                this.editTodo()
            }
        })
    }
    addNewTodo(e) {
        const newTodo = {
            ischk: false,
            title: input.value,
            id: new Date().getTime(),
        }
        let todos = storage.getAllTodos;
        storage.saveTodo(newTodo)
        todo.createTodo(todos)
        storage.filterTodo()
    }
    //creating new li for each li in html 
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
                        <svg id="remove" data-id='${todo.id}'  class=" rounded-lg  w-6 h-6 cursor-pointer stroke-red-700  " xmlns="http://www.w3.org/2000/svg"
                           fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
            </div>
        </li>
        <span class="  w-full mx-auto bg-main/20 h-[2px] inline-block "></span> 
         `;
        })
        todosHtml.innerHTML = output;
        input.value = '';

        // adding todo removing to all delete svgs
        const removeBtns = [...document.querySelectorAll("#remove")]
        removeBtns.forEach(btn => btn.addEventListener("click", (e) => {
            this.removeTodo(e)
        }))

        // adding todo chcking to all check svgs
        const checkedBtns = [...document.querySelectorAll("#check")]
        checkedBtns.forEach(btn => btn.addEventListener("click", (e) => {
            this.checkTodo(e)
        }))

        // adding todo editing to all edit svgs
        const editBtns = [...document.querySelectorAll("#edit")]
        editBtns.forEach(edit => edit.addEventListener('click', (e) => {
            if (e.target.id == "edit") {
                // if todo is checked then disable editing 
                let todos = storage.getAllTodos;
                let todoId = Number(e.target.dataset.id);
                let checkTd = todos.find((todo) => todo.id == todoId)
                if (checkTd.ischk == true) {
                    e.preventDefault()
                } else {
                    this.modalToggle(e)
                }
            }
        }))

        // delete modal from html
        shadow.addEventListener("click", this.closeModal);
        cancelBtns.forEach(btn => btn.addEventListener('click', () => {
            this.closeModal()
        }))
    }
    // remove selected todo
    removeTodo(e) {
        let todos = storage.getAllTodos;
        let todoId = Number(e.target.dataset.id);
        todos = todos.filter((todo) => todo.id !== todoId);
        localStorage.setItem("todos", JSON.stringify(todos));
        this.createTodo(todos)
        storage.filterTodo();
    }
    // adding filtered todo to each todos section
    checkTodo(e) {
        if (e.target.id == "check") {
            let todos = storage.getAllTodos;
            let todoId = Number(e.target.dataset.id);
            let checkTd = todos.find((todo) => todo.id == todoId);
            checkTd.ischk = !(checkTd.ischk);
            localStorage.setItem("todos", JSON.stringify(todos))
            this.createTodo(todos)
            storage.filterTodo()
        }
    }
    // canceling created  modal
    closeModal() {
        modal.classList.add("hidden")
        shadow.classList.add("hidden")
    }
    // adding modal to html 
    modalToggle(e) {
        if (e.target.id == "edit") {
            modal.classList.remove("hidden")
            shadow.classList.remove("hidden")
            let innerValue = e.target.parentElement.parentElement.parentElement.children[0].innerText;
            text.value = innerValue;
            text.focus()
            todoId = Number(e.target.dataset.id);
        }
    }
    // edit todos by editing input in modal
    editTodo() {
        let todos = storage.getAllTodos;
        let checkTd = todos.find((todo) => todo.id == todoId);
        checkTd.title = text.value;
        localStorage.setItem("todos", JSON.stringify(todos))
        this.createTodo(todos)
        storage.filterTodo()
    }
}


class Storage {
    constructor() {
        // getting todos from LocalStorage by loading Webpage
        document.addEventListener("DOMContentLoaded", () => {
            let todos = storage.getAllTodos;
            todo.createTodo(todos)
        })
    }
    // getItem from LocalSotrage
    get getAllTodos() {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        return savedTodos;
    }
    // setItem to LocalStorage
    saveTodo(todo) {
        let savedTodos = this.getAllTodos;
        savedTodos.push(todo)
        localStorage.setItem("todos", JSON.stringify(savedTodos))
        return savedTodos;
    }
    // filtering todos by chaning select options
    filterTodo() {
        let todos = this.getAllTodos;
        switch (filteredValue) {
            case "all": {
                todo.createTodo(todos)
                break;
            }
            case "remaining": {
                const filteredTodos = todos.filter((todo) => !todo.ischk)
                todo.createTodo(filteredTodos)
                break;
            }
            case "finished": {
                const filteredTodos = todos.filter((todo) => todo.ischk)
                todo.createTodo(filteredTodos)
                break;
            }
            default:
                todo.createTodo(todos)
        }
    }

}

const todo = new Todo();
const storage = new Storage()