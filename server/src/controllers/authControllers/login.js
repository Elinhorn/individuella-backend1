const bcrypt = require('bcrypt')

exports.login = function login (req, res) {    
    const {username, password} = req.body

        const findUser = `
        SELECT password, username FROM users WHERE username=?`

    /*     const findUser = `
        SELECT * FROM users WHERE username=? AND password=? ` */
            pool.execute(findUser, [username], (error, result) => {
            if (error) {
                console.log(error)
                res.sendStatus(500)
                return;
            } 
            
            if (result.length > 0) {
                //const storedUser = result[0].username // måste jga ha denna?
                const storedPass = result[0].password
                const isEqual = bcrypt.compareSync(password, storedPass)
                
                if (isEqual) {
                    res.cookie('loginCookie', 'loggedIn', {
                        maxAge: 100000

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