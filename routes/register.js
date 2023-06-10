const express = require("express")
const createNewAccount = require("../feature/create_new_user")
const check_login = require("../helper/check_login")
const registerRouter = express.Router()
const path = require("path")

registerRouter.get("/signup", async (req, res) => {
    if(!req.session.loggedin) res.render("signup")
    else res.redirect("/")
})

registerRouter.post("/signup", async(req, res) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone_number = req.body.phone_number
    const password = req.body.password
    if(!first_name) {
        res.status(400).send({
            "message": "First name cannot be empty."
        })
        return
    }
    if(!last_name) {
        res.status(400).send({
            "message": "Last name cannot be empty."
        })
        return
    }
    if(!email) {
        res.status(400).send({
            "message": "Email cannot be empty."
        })
        return
    }
    if(!phone_number) {
        res.status(400).send({
            "message": "Phone number cannot be empty."
        })
        return
    }
    if(!password) {
        res.status(400).send({
            "message": "Password cannot be empty."
        })
        return
    }

    try {
        const result = await createNewAccount(first_name, last_name, email, phone_number, password)
        if(result) {
            res.redirect("/signin")
        } else {
            res.render("signup", {message: "Akun sudah ada"})   
        }
    } catch(e) {
        res.render("signup", {message: "Server Sedang Gangguan"})
    }

    
})

// TODO: Register telah selesai

module.exports = registerRouter;