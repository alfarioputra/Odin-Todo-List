import Todo from "../classes/todos.js";
import { getSelectedProject, getProjects } from "./project.js";

let todos = []

function createTodo({ title, description, dueDate, priority, notes }) {
    const project = getSelectedProject()

    const projectName = project ? project.name : "default"

    const todo = new Todo(title, description, dueDate, priority, notes, projectName)

    todos.push(todo)

    if (project) project.todos.push(todo.id)
        
}

function getTodos() {
    return todos
}

function deleteTodos(id) {
    const todo = todos.find(todo => todo.id === id)

    if (!todo) return

    todos = todos.filter(todo => todo.id !== id)

    console.log(todo.project)

    if (todo.project !== 'default') {
        const project = getProjects()
            .find(project => project.name === todo.project)

        if (project) {
            project.todos = project.todos.filter(todoId => todoId !== id)
        }
    }
}

function editTodos(todo, data) {
    todo.title = data.title
    todo.description = data.description
    todo.dueDate = data.dueDate
    todo.priority = data.priority
}

export { createTodo, getTodos, deleteTodos, editTodos }