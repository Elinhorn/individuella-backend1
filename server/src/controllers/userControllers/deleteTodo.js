const pool = require('../../dbcon')
const joi = require('joi')
    
exports.deleteTodo = function deleteTodo (req, res) {
    const {todo} = req.body
    const schema = joi.object({
        todo: joi.string().min(2).max(255).required().pattern(RegExp('^[a-zA-Z0-9]'))
    })

    const validate = schema.validate(req.body)
    if (validate.error) {
        return res.status(400).json(validate.error.details[0].message)
    } else {
        const sql = 
        `DELETE FROM todo WHERE todo='${todo}'`
            pool.execute(sql, [todo], (error, result) => {
                if (error) {
                    return res.status(500).send('something went wrong')
                } 

                res.status(200).send('your todo is now deleted')
            })
    }

}