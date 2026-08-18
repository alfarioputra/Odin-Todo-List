import Project from "../classes/Projects.js"
import { getTodos } from "./todo.js"

let projects = []
let selectedProject = null

function setSelectedProject(project) {
    selectedProject = project
}

function getSelectedProject() {
    return selectedProject
}

function createProject(name) {
    const project = new Project(name)

    projects.push(project)
}

function getProjects() {
    return projects
}

function deleteProject(name) {
    const project =  projects.find(project => project.name === name)
    
    if (!project) return

    const todos =  getTodos()

    project.todos.forEach(id => {
        const todo = todos.find(todo => todo.id === id)

        if (todo) {
            todo.project = 'default'
        }
    })

    projects = projects.filter(project => project.name !== name)
}

function editProject(project,newName) {
    project.name = newName

    const todos = getTodos()

    project.todos.forEach(id => {
        const todo = todos.find(todo => todo.id === id)

        if (todo) {
            todo.project = newName
        }
    })
}

function loadProjects(data) {
    projects = data
}

export { setSelectedProject, getSelectedProject, createProject, getProjects, deleteProject, editProject, loadProjects }