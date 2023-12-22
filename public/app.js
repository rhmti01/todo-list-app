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
    let output = ' ' ;

    todos.forEach((todo) => {
        output += `                   
        <li  class="  mt-2 mx-3 bg-white rounded-md  list-none py-4 px-3 text-black font-medium text-[17px] flex items-end justify-between break-words  ">
        <span id="todo-value" class="  ${todo.isChecked ? "line" : "bg-black" }  text-base break-words bg-slate-50 pr-3 "> ${todo.title}  </span>
        <div class="  flex justify-around items-center basis-1/4 ">
            <input  id="check" data-id='${todo.id}'  id="link-checkbox" type="checkbox" value=""
            class="w-6 h-6 mr-3 rounded-md text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 ">
            <svg id="remove" data-id='${todo.id}'  class="w-6 h-6  stroke-red-700 cursor-pointer " xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </div>
    </li>
    <span class="  w-full mx-auto bg-main/20 h-[2px] inline-block "></span>  `;
    })

    todosHtml.innerHTML = output ;
    input.value = '';

    const removeBtns = [...document.querySelectorAll("#remove")]
    removeBtns.forEach(btn => btn.addEventListener("click" , removeTodo))

    // console.log(todos);
}


function removeTodo(e) {
    let todoId = Number(e.target.dataset.id);
    todos = todos.filter( (todo) => todo.id !== todoId );
    createTodo(todos);
}


