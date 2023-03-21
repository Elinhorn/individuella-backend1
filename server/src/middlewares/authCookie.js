exports.authCookie = function authCookie (req, res, next) {
    const authKey = req.cookies.loginCookie
    if (authKey === 'loggedIn') {
        next()
        return

    } else {
        res.status(401).send('Access denied!')
    }
}  