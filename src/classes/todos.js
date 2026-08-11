export default class Todo {
    constructor(title, description, dueDate, priority, notes, project = "default" ) {
        this.id = crypto.randomUUID()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.project = project 
        this.completed = false   
    }
}