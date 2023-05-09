const express = require("express")
const registerRouter = express.Router()

registerRouter.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'html', 'login.html'))
})

registerRouter.post("/register", (req, res) => {
    
})