// GLOBALA VARIABLER *****************
const createTodo = document.querySelector('#createTodo')
const from = document.querySelector('#addTodo')
const listDiv = document.querySelector('#listDiv')
const updateInput = document.querySelector('#updateTodo')
const updateBtn = document.querySelector('#updateBtn')
const hiddenDiv = document.querySelector('#hiddenDiv')
let testTodo = '';
let todoList = []


// FUNKTIONER ******************
function getAllTodos()  {
    fetch('http://localhost:1010/user/todo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .then(todo => {
            todoList = []
            for (let i = 0; i < todo.length; i++) {
                todoList.push(todo[i].todo)
        }

    printHTML()
    })
}

function printHTML () {
    listDiv.innerHTML = ''
    for (let i = 0; i < todoList.length; i++) {
    listDiv.innerHTML += `<li><h3><button class='updateTodoBtn'>Change</button>${todoList[i]}<button class='deleteTodoBtn'>Delete</button></h3></li>`
        
    }
    setUpClicks()
}

function setUpClicks () {
    const deleteTodoBtn = document.querySelectorAll('.deleteTodoBtn')
    for (let i = 0; i < deleteTodoBtn.length; i++) {
        deleteTodoBtn[i].addEventListener('click', handleDeleteClick)
    } 

    const updateTodoBtn = document.querySelectorAll('.updateTodoBtn')
    for (let i = 0; i < updateTodoBtn.length; i++) {
        updateTodoBtn[i].addEventListener('click', handleChangeClick)
    } 

    const toggleTodo = document.querySelectorAll('li')
    for (let i = 0; i < toggleTodo.length; i++) {
        toggleTodo[i].addEventListener('click', toggle)
    }
}

function toggle(e) {
    let singleTodo = e.target
        if(singleTodo.style.textDecoration == 'line-through') {
            singleTodo.style.textDecoration = 'none'
        } else {
            singleTodo.style.textDecoration = 'line-through'
        }
    
    
}

function handleChangeClick(e) {
    testTodo = e.target.nextSibling.textContent
    hiddenDiv.style.display = 'block'
}

function sendUpdate(e) {
    e.preventDefault()
    const todo = testTodo;
    const updateTodo = updateInput.value
    const patchTodo = {todo: todo, updateTodo: updateTodo}
    const res = fetch('http://localhost:1010/user/todo', {
        method: 'PATCH',
        body: JSON.stringify(patchTodo),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    hiddenDiv.style.display = 'none'
    getAllTodos()
}



function handleDeleteClick(e) {
    const todo = e.target.previousSibling.textContent
    fetch('http://localhost:1010/user/todo', {
        method: 'DELETE',
        body: JSON.stringify({todo}),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    getAllTodos()
}


// PROGRAM LOGIK ******************
from.addEventListener('click', async (e) => {
    e.preventDefault()

    const todo = createTodo.value
    const res = await fetch('http://localhost:1010/user/todo', {
        method: 'POST',
        body: JSON.stringify({todo}),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    getAllTodos()
})

updateBtn.addEventListener('click', sendUpdate) 

getAllTodos()





