function checkLogin(req, res, next) {
    if(!req.session.loggedin && req.url != "/login") {
        console.log(req.url)
        res.redirect("/login")
        return null
    }
    next()
}

module.exports = checkLogin