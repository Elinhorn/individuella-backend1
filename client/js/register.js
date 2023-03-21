const nameInput = document.querySelector('#nameInput')
const passInput = document.querySelector('#passInput')
const from = document.querySelector('form')

from.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = nameInput.value
    const password = passInput.value

    const res = await fetch('http://localhost:1010/auth/register', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if(res.status === 201) {
        alert('User created!')
        window.location.href = './login.html'
    } else {
        alert('Invalid username or password')
    }
})