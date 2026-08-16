import "./styles.css"
import { renderProjects, setupProjectForm } from "./modules/dom-project.js"
import { setUpTodosForm, renderTodos } from "./modules/dom-todo.js"
import { setSelectedProject } from "./modules/project.js"
import { loadData } from "./modules/storage.js"

const sideBar = document.querySelector('.side-bar')

sideBar.addEventListener('click', (e) => {
    const projectBtn = e.target.closest('.project')

    if (!projectBtn) return

    const currentNavbar = sideBar.querySelectorAll('.project')

    currentNavbar.forEach(nav => nav.classList.remove('selected'))

    projectBtn.classList.add('selected')

})

const allTask = document.getElementById('all-task')

allTask.addEventListener('click', () => {
    setSelectedProject(null)

    renderTodos()
})

setupProjectForm()
setUpTodosForm()

loadData()
renderTodos()
renderProjects()