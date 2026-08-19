import editImg from '../assets/edit.svg'
import deleteImg from '../assets/delete.svg'
import { setSelectedProject, createProject, getProjects, deleteProject, editProject } from './project.js'
import { renderTodos } from './dom-todo.js'
import { saveData } from './storage.js'

const myProjects = document.getElementById('my-projects')
const newBtn = document.querySelector('#new-project')
const form = document.querySelector('.projects-form') 
const input = document.querySelector('.input-form')
const cancel = document.querySelector('.cancel-btn')

let editedProject = null

function createProjectItem(project) {
    const projectElement = document.createElement('div')
    projectElement.classList.add('project')
    projectElement.setAttribute('id', project.name)
    projectElement.setAttribute('data-id', project.name)

    const name = document.createElement('p')
    name.textContent = project.name

    const projectBtn = document.createElement('div')
    projectBtn.classList.add('project-btn')

    const edit = document.createElement('img')
    edit.src = editImg
    edit.alt = 'edit icon'

    edit.addEventListener('click', () => {
        editedProject = project

        input.value = project.name

        openProjectForm()
    })

    const del = document.createElement('img')
    del.src = deleteImg
    del.alt = 'delete icon'

    del.addEventListener('click', (e) => {
        e.stopPropagation()

        deleteProject(project.name)

        saveData()

        renderProjects()
    })

    projectBtn.append(edit, del)
    projectElement.append(name, projectBtn)

    projectElement.addEventListener('click', () => {
        setSelectedProject(project)
        
        renderTodos(project)
    })

    return projectElement
}

function renderProjects() {
    const projects = getProjects()

    myProjects.innerHTML = ''

    projects.forEach(project => {
        const element = createProjectItem(project)
        myProjects.appendChild(element)
    })
}

function closeProjectForm() {
    input.value = ''
    form.classList.add('visibility')
    newBtn.classList.remove('visibility')
        
    editedProject = null
}

function openProjectForm() {
    newBtn.classList.add('visibility')
    form.classList.remove('visibility') 
    input.focus()
}

function setupProjectForm() {
    newBtn.addEventListener('click', () => {
        openProjectForm()
    })
        
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const projectName = input.value.trim()

        if (!projectName) return 

        if (editedProject) {
            editProject(editedProject, projectName)
        } else {
            createProject(projectName)
        }

        saveData()
        
        renderProjects()
        
        closeProjectForm()
    })

    cancel.addEventListener('click', () => {
        closeProjectForm()
    })
}

export { setupProjectForm, renderProjects }