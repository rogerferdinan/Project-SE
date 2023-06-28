const express = require("express")
const app = express()
const session = require("express-session")
const path = require("path")
const loginRouter = require("./routes/login")
const homeRouter = require("./routes/home")
const registerRouter = require("./routes/register")
const logoutRouter = require("./routes/logout")
const stationRouter = require("./routes/station")
const profileRouter = require("./routes/profile")
const reserveRouter = require("./routes/reserve")
const moment = require("moment");

app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
});
// app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    // TODO: add external file for SECRET KEY
    secret: 'secret123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "/src")))
app.use(homeRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(registerRouter)
app.use(stationRouter)
app.use(profileRouter)
app.use(reserveRouter)

app.listen(8000, "0.0.0.0", () => {
    console.log("http://localhost:8000")
})