//visa alla todos som redan finns i sql
//get end point

const pool = require('../../dbcon')

exports.getTodo = function getTodo (req, res) {
    const sql = 
    `SELECT todo FROM todo`
        pool.execute(sql, (error, result) => {
            if (error) {
                res.status(400).send('something went wrong')
                return 
            } else {
                res.status(200).json(result)
            }
        })
}