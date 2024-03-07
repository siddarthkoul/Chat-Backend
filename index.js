const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send("API chal rhi hai, chinta mat kar")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("Server is running"));