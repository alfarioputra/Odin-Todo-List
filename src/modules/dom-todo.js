import editImg from '../assets/edit.svg'
import delImg from '../assets/delete.svg'
import { createTodo, getTodos, editTodos, deleteTodos } from './todo.js'
import { getSelectedProject } from './project.js'
import { saveData } from './storage.js'

const myTodos = document.getElementById('todos')
const newTask = document.getElementById('new-task')
const form = document.querySelector('.todos-form')
const close = document.querySelector('#close')
const cancel = document.querySelector('#cancel')

const title = document.getElementById('title')
const description = document.getElementById('description')
const priority = document.getElementById('priority')
const date = document.getElementById('date')
const notes = document.getElementById('notes')

let editedTodo = null

function createTodoItem(todo) {
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')
    todoItem.setAttribute('id', `${todo.id}`)

    const todoContent = document.createElement('div')
    todoContent.classList.add('todo-item-content')
    
    const todoLeft = document.createElement('div')
    todoLeft.classList.add('todo-left')

    const todoTitle = document.createElement('div')
    todoTitle.classList.add('todo-title')
    
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed

    if (todo.completed) {
        todoItem.classList.add('checked')
    }

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked
        todoItem.classList.toggle('checked')

        saveData()
    })
    
    const title = document.createElement('h2')
    title.textContent = todo.title
    
    const description = document.createElement('p')
    description.textContent = todo.description
    
    const todoRight = document.createElement('div')
    todoRight.classList.add('todo-right')

    const todoPriority = document.createElement('div')
    todoPriority.classList.add('todo-priority')

    const priority = document.createElement('p')
    priority.textContent = todo.priority
    
    const todoDate = document.createElement('div')
    todoDate.classList.add('date')
    
    const date = document.createElement('p')
    date.textContent = todo.dueDate
    
    const todoBtn = document.createElement('div')
    todoBtn.classList.add('todo-btn')
    
    const edit = document.createElement('img')
    edit.src = editImg
    edit.alt = 'edit icon'

    edit.addEventListener('click', () => {
        editedTodo = todo

        editForm(todo)
    })
    
    const del = document.createElement('img')
    del.src = delImg
    del.alt = 'delete icon'

    del.addEventListener('click', () => {
        deleteTodos(todo.id)

        saveData()
        
        renderTodos(getSelectedProject())
    })

    todoTitle.append(title, description)
    todoPriority.appendChild(priority)
    todoDate.appendChild(date)
    todoBtn.append(edit, del)
    
    todoLeft.append(checkbox, todoTitle)
    todoRight.append(todoPriority, todoDate, todoBtn)
    todoContent.append(todoLeft, todoRight)

    todoItem.appendChild(todoContent)

    return todoItem
}

function renderTodos(project = null) {
    const todos = getTodos()
    
    myTodos.innerHTML = ''

    const filteredTodos = project
        ? project.todos
            .map(id => todos.find(todo => todo.id === id))
            .filter(Boolean)
        : todos

    filteredTodos.forEach(todo => {
        const todoElement = createTodoItem(todo)
        myTodos.appendChild(todoElement)
    })
}

function clearTodoForm() {
    title.value = ''
    description.value = ''
    priority.value = ''
    date.value = ''
    notes.value = ''
}

function editForm(todo) {
    openForm()

    title.value = todo.title
    description.value = todo.description
    date.value = todo.dueDate
    priority.value = todo.priority
}

function openForm() {
    form.classList.remove('visibility')
    newTask.classList.add('visibility')

    title.focus()
}

function closeForm() {
    clearTodoForm()
    form.classList.add('visibility')
    newTask.classList.remove('visibility')

    editedTodo = null 
}

function setUpTodosForm() {
    newTask.addEventListener('click', () => {
        openForm()
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const todoInput = {
            title: title.value.trim(),
            description: description.value.trim(),
            dueDate: date.value,
            priority: priority.value,
            notes: notes.value.trim()
        }

        if (!todoInput) return

        if (editedTodo) {
            editTodos(editedTodo, todoInput)
        } else {
            createTodo(todoInput)
        }

        saveData()

        renderTodos(getSelectedProject())

        closeForm()
    })

    cancel.addEventListener('click', () => {
        closeForm()
    })

    close.addEventListener('click', () => {
        closeForm()
    })
}

export { setUpTodosForm, renderTodos }