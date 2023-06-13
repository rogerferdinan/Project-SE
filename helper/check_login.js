function checkLogin(req, res, next) {
    if (req.session.loggedin && req.url != "/register") {
        console.log("User already login!")
        next()
    } else {
        console.log("User have not Login")
        res.redirect("/signin")
    }
}

module.exports = checkLogin