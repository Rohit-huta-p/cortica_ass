const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

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
const { default: mongoose } = require('mongoose');

app.use('/api/user', user_routes)

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

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
