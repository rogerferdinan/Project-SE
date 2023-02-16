const express = require("express");
const app = express();

const base_url = 'localhost';
const PORT = 6969;

app.listen(PORT, base_url, () => {
    console.log(`API Base URL: http://${base_url}:${PORT}`);
})