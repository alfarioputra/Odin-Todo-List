import { getProjects, loadProjects } from "./project.js";
import { getTodos, loadTodos } from "./todo.js";


function saveData() {    
    const data = {
        projects: getProjects(),
        todos: getTodos()
    }

    localStorage.setItem('data', JSON.stringify(data))
}

function loadData() {
    const parsedData = JSON.parse(localStorage.getItem('data'))

    if (!parsedData) return

    loadProjects(parsedData.projects)
    loadTodos(parsedData.todos)

    console.log(parsedData)
}

export { saveData, loadData }