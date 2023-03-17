//här ska authentication för cookie vara 

/* Om du har en cookie ska du få göta allt i userRouten */

//Middleware to auth you have cookie
exports.authCookie = function authCookie (req, res, next) {
    const authKey = req.cookies.loginCookie
    if (authKey === 'loggedIn') {
        next()
        return

    } else {
        res.status(401).send('Access denied!')
    }
}  