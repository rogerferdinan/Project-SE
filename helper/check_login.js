function checkLogin(req, res, next) {
    if (req.session.loggedin && req.url != "/register") {
        console.log("User already login!")
        next()
    } else {
        console.log("User have not Login")
        res.redirect("/login")
    }
    // if(!req.session.loggedin && req.url != "/login" && req.url != "/register") {
    //     res.redirect("/login")
    //     return
    // }
    // if(req.session.loggedin=true && req.url == "/register") {
    //     res.redirect("/")
    //     return
    // }
}

module.exports = checkLogin