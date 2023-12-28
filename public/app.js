// selectring Variables
const selectTodo = document.querySelector("#todos")
const input = document.querySelector("#input")
const addTodoBtn = document.querySelector("#addBtn")
const clearAll = document.querySelector("#clearAll")
const todosHtml = document.querySelector(".task-box")



// Event Listeners


input.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        addNewTodo(e.target.value)
    }
})

addTodoBtn.addEventListener("click", addNewTodo)

selectTodo.addEventListener("change", filterTodo)




// Functions 

let todos = []

function addNewTodo(e) {
    const newTodo = {
        title: input.value,
        id: new Date().getTime(),
        isChecked: false,
    }

    todos.push(newTodo)
    createTodo(todos)
}


function createTodo(todos) {
    let output = ' ';

    todos.forEach((todo) => {
        output += `                   
    <li  class=" ${todo.isChecked ? " blur-xs " : "  " } border-2 border-main mt-2 mx-3 bg-white rounded-xl  list-none py-4 px-3 text-black font-medium text-[17px] flex items-end justify-between break-words  ">
        <span id="todo-value" class=" text-base break-words bg-slate-50 pr-3 "> ${todo.title}  </span>
        <div class=" flex justify-around items-center basis-1/4 ">
            <div  class=" w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center  border-2 border-stone-700 " >            
                <svg id="check" data-id='${todo.id}' stroke="currentColor" class=" cursor-pointer stroke-stone-700  w-4 h-4"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"  >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg></div>
            <svg id="remove" data-id='${todo.id}'  class="w-6 h-6  stroke-red-700  " xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </div>
    </li>
    <span class="  w-full mx-auto bg-main/20 h-[2px] inline-block "></span>  `;
    })

    todosHtml.innerHTML = output;
    input.value = '';

    const removeBtns = [...document.querySelectorAll("#remove")]
    removeBtns.forEach(btn => btn.addEventListener("click", removeTodo))

    const checkedBtns = [...document.querySelectorAll("#check")]
    checkedBtns.forEach(btn => btn.addEventListener("click", checkTodo))

    // console.log(todos);
}


function filterTodo(e) {
    let filter = e.target.value;

    switch (filter) {
        case "all": {
            createTodo(todos)
            break;
        }
        case "remaining": {
            const filteredTodos = todos.filter((todo) => !todo.isChecked)
            createTodo(filteredTodos)
            break;
        }
        case "finished": {
            const filteredTodos = todos.filter((todo) => todo.isChecked)
            createTodo(filteredTodos)
            break;
        }
        default:
            createTodo(todos)
    }
}


function removeTodo(e) {
    let todoId = Number(e.target.dataset.id);
    todos = todos.filter((todo) => todo.id !== todoId);
    createTodo(todos);
}


function checkTodo(e) {
    let todoId = Number(e.target.dataset.id)
    let checkTodo = todos.find((todo) => todo.id == todoId)
    checkTodo.isChecked = !checkTodo.isChecked;
    createTodo(todos)
    // console.log(todos);
    // let ischeckHtml = e.target.checked;
    // ischeckHtml = !checkTodo.isChecked;
    // console.log(ischeckHtml);   
}