export class Storage {

    get getAllTodos() {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        return savedTodos;
    }

    removeTodoById(todoId) {
        let todos = this.getAllTodos;
        todos = todos.filter(todo => todo.id !== todoId);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    saveTodo(todo) {
        let savedTodos = this.getAllTodos;
        savedTodos.push(todo)
        localStorage.setItem("todos", JSON.stringify(savedTodos))
        return savedTodos;
    }

    toggleCheckTodoById(todoId) {
        let todos = this.getAllTodos;
        let todo = todos.find(todo => todo.id == todoId);
        todo.ischk = !todo.ischk;
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    editTodoById(todoId, newTitle) {
        let todos = this.getAllTodos;
        let todo = todos.find(todo => todo.id == todoId);
        console.log(todo);
        todo.title = newTitle;
        localStorage.setItem("todos", JSON.stringify(todos));
    }

}