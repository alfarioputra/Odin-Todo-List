import Todo from "../classes/todos.js";
import { getSelectedProject } from "./project.js";

let todos = []

function createTodo({ title, description, dueDate, priority, notes }) {
    const project = getSelectedProject()

    const projectName = project ? project.name : "default"

    const todo = new Todo(title, description, dueDate, priority, notes, projectName)

    todos.push(todo)

    if (project) project.todos.push(todo)
        
}

function getTodos() {
    return todos
}

function deleteTodos(id) {
    todos = todos.filter(todo => todo.id !== id)
}

function editTodos(todo, data) {
    todo.title = data.title
    todo.description = data.description
    todo.dueDate = data.dueDate
    todo.priority = data.priority
}

export { createTodo, getTodos, deleteTodos, editTodos }