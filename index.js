const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const userRoutes = require("./Routes/userRoutes")
const app = express();
dotenv.config();
app.use(express.json());

const connectDB = async () => {
    try { 
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (err) {
        console.error(`Error ${err}`);
    }
};

connectDB();
app.get('/', (req, res) => {
    res.send("API chal rhi hai, chinta mat kar")
})
app.use("/user",userRoutes )
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Server is running"));