const pool = require('../../dbcon')
    
exports.deleteTodo = function deleteTodo (req, res) {
    const {todo} = req.body
        const sql = 
        `DELETE FROM todo WHERE todo='${todo}'`
            pool.execute(sql, [todo], (error, result) => {
                if (error) {
                    return res.status(400).send('something went wrong')
                } 

                res.send('your todo is now deleted')
            })
}