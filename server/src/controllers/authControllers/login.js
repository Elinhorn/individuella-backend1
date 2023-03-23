const bcrypt = require('bcrypt')
const pool = require('../../dbcon')
const joi = require('joi')

exports.login = function login (req, res) {    
    const {username, password} = req.body
    const schema = joi.object({
        username: joi.string().alphanum().min(3).max(20).required(),
        password: joi.string().min(3).max(20).required().pattern(RegExp('^[a-zA-Z0-9]'))
    })

    const validate = schema.validate(req.body)

        if(validate.error) {
            return res.status(400).json(validate.error.details[0].message)
        } else {
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
}