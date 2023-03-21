const nameInput = document.querySelector('#nameInput')
const passInput = document.querySelector('#passInput')
const from = document.querySelector('form')

from.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = nameInput.value
    const password = passInput.value

    const res = await fetch('http://localhost:1010/auth/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json',
            
        },
        credentials: 'include'
    })

 
    if(res.status === 200) {
        window.location.href = './todo.html'
    } else {
        alert('wrong inputs')
    }
    
})