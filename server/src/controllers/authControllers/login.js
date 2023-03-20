const bcrypt = require('bcrypt')
const pool = require('../../dbcon')

exports.login = function login (req, res) {    
    const {username, password} = req.body

        const findUser = `
        SELECT password, username FROM users WHERE username=?`
            pool.execute(findUser, [username], (error, result) => {
            if (error) {
                res.sendStatus(500)
                return;
            } 
            
            if (result.length > 0) {
                const storedPass = result[0].password
                const isEqual = bcrypt.compareSync(password, storedPass)
                
                
                if (isEqual) {
                    res.cookie('loginCookie', 'loggedIn', {
                        maxAge: 1000000,
                        sameSite: 'None',
                        httpOnly: true,
                        secure: true, 
                        withCredentials: 'include',
                        path: "/",

                    })
                    res.status(200).send('Welcome')
                    
                } else {
                    res.sendStatus(401)
                }
                
            } else {
                res.status(404).send('user not found')
            }
        }) 
}