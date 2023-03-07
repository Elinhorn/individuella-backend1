const express = require('express')
const server = express()

server.post('/register', (req, res) => {
    res.send('jag tog emot din req')
    console.log('hej')

})

server.listen(1010)