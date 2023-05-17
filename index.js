const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const loginRouter = require("./routes/login")
const homeRouter = require("./routes/home")
const session = require("express-session")
const registerRouter = require("./routes/register")

// app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use(session({
    // TODO: add external file for SECRET KEY
    secret: 'secret123',
    resave: false,
    saveUninitialized: true
}))


app.use(homeRouter)
app.use(loginRouter)
app.use(registerRouter)

app.listen(8000, () => {
    console.log("http://localhost:8000")
})