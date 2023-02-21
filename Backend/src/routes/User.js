const express = require("express");
const ValidateCredentials = require("../utils/ValidateCredentials");
const router = express.Router();

router.get('/', (req, res) => {
    // Login
    const username = "Dummy";
    const password = "pass";
    ValidateCredentials(username, password);
})

router.post('/', (req, res) => {
    // Register
})

module.exports = router;