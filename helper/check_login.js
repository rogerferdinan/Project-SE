function checkLogin(req, res, next) {
    if(!req.session.loggedin && req.url != "/login") {
        console.log(req.session)
        res.redirect("/login")
        return
    }
    if(req.session.loggedin=true && req.url == "/register") {
        res.redirect("/")
        return
    }
    
    next()
}

module.exports = checkLogin