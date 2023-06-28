function checkLogin(req, res, next) {
    if (req.session.loggedin && req.url != "/register") {
        next()
    } else {
        res.redirect("/signin")
    }
}

module.exports = checkLogin