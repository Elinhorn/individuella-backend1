const pool = require('../../dbcon')
const joi = require('joi')

exports.patchTodo = function patchTodo (req, res) {
    const {todo, updateTodo} = req.body
    const schema = joi.object({
        todo: joi.string().min(2).max(255).required().pattern(RegExp('^[a-zA-Z0-9]')),
        updateTodo: joi.string().min(2).max(255).required().pattern(RegExp('^[a-zA-Z0-9]'))
    })

    const validate = schema.validate(req.body)
    if (validate.error) {
        return res.status(400).json(validate.error.details[0].message)
    } else {
        const sql = 
        `UPDATE todo SET todo = '${updateTodo}' WHERE todo='${todo}'`
            pool.execute(sql, [todo, updateTodo], (error, result) => {
                if (error) {
                    res.status(500).send('something went wrong')
                    return 
                } else {
                    res.status(200).send('your todo is now updated')
                }
            })
    }
}