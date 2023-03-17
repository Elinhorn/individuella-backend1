const joi = require('joi')
const bcrypt = require('bcrypt')
const pool = require('../../dbcon')



exports.register = function register (req, res) {
    const {username, password} = req.body
    const schema = joi.object({
        username: joi.string().alphanum().min(3).max(20).required(),
        password: joi.string().min(3).max(20).required().pattern(RegExp('^[a-zA-Z0-9]'))
    })

    const validate = schema.validate(req.body)

    const hashedPass = bcrypt.hashSync(password, 10)


    if (validate.error) {
        return res.status(400).json(validate.error.details[0].message)
    } else {
        const sql = 
        `INSERT INTO users(username, password) 
        VALUE (?,?)`
            pool.execute(sql, [username, hashedPass], (error, result) => {
                if (error) {
                    res.status(500).send('username already exist')
                    console.log(error)
                } else {
                    res.status(201).send('new user have been added')
                }
            })
        
    }
}

