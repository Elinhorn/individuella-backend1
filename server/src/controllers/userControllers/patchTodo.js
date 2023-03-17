const pool = require('../../dbcon')

exports.patchTodo = function patchTodo (req, res) {
    const {todo, updateTodo} = req.body
    const sql = 
    `UPDATE todo SET todo = '${updateTodo}' WHERE todo='${todo}'`
        pool.execute(sql, [todo, updateTodo], (error, result) => {
            if (error) {
                res.status(400).send('something went wrong')
                return 
            } else {
                res.status(200).send('your todo is now updated')
            }
        })
}