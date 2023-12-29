// selectring Variables
const selectTodo = document.querySelector("#todos")
const input = document.querySelector("#input")
const addTodoBtn = document.querySelector("#addBtn")
const clearAll = document.querySelector("#clearAll")
const todosHtml = document.querySelector(".task-box")
let filteredValue = " all ";



// Event Listeners

// adding new todo by clicking ENTER
input.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        addNewTodo(e.target.value)
    }
})

// adding new todo to app by clicking
addTodoBtn.addEventListener("click", addNewTodo)

// filtering todos by chaning select options
selectTodo.addEventListener("change", (e)=>{
    filteredValue = e.target.value;
    filterTodo(filteredValue)
} )

// removing all todos
clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length)
    createTodo(todos)
    // console.log(todos);
})


// Functions 

// main array of todos
let todos = []

// adding new todo to todos array
function addNewTodo(e) {
    const newTodo = {
        ischk: false,
        title: input.value,
        id: new Date().getTime(),
    }

    todos.push(newTodo)
    filterTodo()
}


//creating new li for each li in html 
function createTodo(todos) {
    let output = ' ';

    todos.forEach((todo) => {
        output += `                   
    <li  class="  ${todo.ischk ? " bg-main/20 " : "  " } border-2 border-main z-10  mt-2 mx-3   rounded-xl  list-none py-4 px-3 text-black font-medium text-[17px] flex items-end justify-between  ">
        <span id="todo-value" class="  ${todo.ischk ? " line-through  " : "  " } text-base break-words basis-4/4  pr-3 "> ${todo.title}  </span>
        <div  class=" flex justify-between items-center basis-[21%] ">
            <div class=" ${todo.ischk ? " bg-main/15 " : " bg-white " }   w-6 h-6 rounded-lg flex items-center justify-center  border-2 border-stone-700 " >            
                <svg id="check" data-id='${todo.id}' stroke="currentColor" class=" cursor-pointer stroke-stone-700  w-4 h-4"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"  >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg></div>
            <svg id="remove" data-id='${todo.id}'  class="  w-6 h-6 cursor-pointer stroke-red-700  " xmlns="http://www.w3.org/2000/svg"
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


// filtering todos by chaning select options
function filterTodo() {
    // let filter = e.target.value;

    switch (filteredValue) {
        case "all": {
            createTodo(todos)
            break;
        }
        case "remaining": {
            const filteredTodos = todos.filter((todo) => !todo.ischk)
            createTodo(filteredTodos)
            break;
        }
        case "finished": {
            const filteredTodos = todos.filter((todo) => todo.ischk)
            createTodo(filteredTodos)
            break;
        }
        default:
            createTodo(todos)
    }
}

// remove selected todo
function removeTodo(e) {
    let todoId = Number(e.target.dataset.id);
    todos = todos.filter((todo) => todo.id !== todoId);
    filterTodo()
}


// adding filtered todo to each todos section
function checkTodo(e) {
    if (e.target.id == "check") {
        let todoId = Number(e.target.dataset.id);
        let checkTodo = todos.find((todo) => todo.id == todoId);
        checkTodo.ischk  =! (checkTodo.ischk);
        createTodo(todos)
        // console.log(checkTodo.ischk);
        // console.log(ischeckHtml);   
        filterTodo()
    }
}