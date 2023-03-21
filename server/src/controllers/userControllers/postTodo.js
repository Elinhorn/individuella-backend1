const joi = require('joi')
const pool = require('../../dbcon')

exports.postTodo = function postTodo (req, res) {
    const {todo} = req.body
        const schema = joi.object({
            todo: joi.string().min(2).max(255).required().pattern(RegExp('^[a-zA-Z0-9]'))
        })

        const validate = schema.validate(req.body)
        if (validate.error) {
            return res.status(400).json(validate.error.details[0].message)
        } else {
            const sql = 
            `INSERT INTO todo(todo, done) VALUE (?, 0)`
                pool.execute(sql, [todo], (error , result) => {
                    if (error) {
                        res.status(500).send('The todo was too long, please shorten it down')
                    } else {
                        res.status(201).json('Todo was created!')
                    }
            })
        }
}