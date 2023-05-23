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
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    if (!first_name || !last_name || !email || !phone_number || !password) {
        // TODO: Empty Fields
    }
    const result = await createNewAccount(first_name, last_name, email, phone_number, password)

    // Jika gagal, berikan peringatan    
    if(!result) {
        // TODO: error message
        console.log("Error")
    }
    // Jika berhasil membuat akun, alihkan ke login page
    else {
        res.redirect("/signin")
    }
})

module.exports = registerRouter;