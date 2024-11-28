const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())


app.post('/hello', (req, res)=> {
    console.log(req.body);
    res.status(200).json({ message: 'Received' });
})
const user_routes = require('./routes/userRoutes');
const {  mongoose } = require('mongoose');

app.use('/api/user', user_routes)

// Token
app.post('/verify_token', async (req, res) => {
    const {token} = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({success: true, message: 'Token is valid', userData: decoded});

    } catch (error) {
        return res.json({message: 'Invalid token'});
    }
})


const startServer  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")

        app.listen(process.env.PORT, () => {
            console.log("Server Started at", process.env.PORT);
        });

    } catch (error) {
        console.log(error);
    }
    
}

startServer();
