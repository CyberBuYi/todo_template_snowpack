import {v4 as uuidV4} from "uuid"

type Task = {
    id: string,
    title: string,
    completed: boolean,
    date: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks:Task[] = loadTasks()
tasks.forEach(addToList)

form?.addEventListener("submit", e =>{
    e.preventDefault()

    if( input?.value == null || input.value == "") return null;

    const newTask : Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        date: new Date()
    }
    tasks.push(newTask)
    saveTasks()
    addToList(newTask)
    input.value = ""
})

function addToList(task: Task){

    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.addEventListener("change", () =>{
        task.completed = checkbox.checked
        saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
}

function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
    const taskJSON = localStorage.getItem("TASKS")
    if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}