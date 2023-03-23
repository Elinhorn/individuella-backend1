const pool = require('../../dbcon')

exports.getTodo = function getTodo (req, res) {
    const sql = 
    `SELECT todo FROM todo`
        pool.execute(sql, (error, result) => {
            if (error) {
                res.status(500).send('something went wrong')
                return 
            } else {
                res.status(200).json(result)
            }
        })
}