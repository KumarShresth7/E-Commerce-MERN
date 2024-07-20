const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const baseUrl = require('./baseUrl')
dotenv.config()

const corsOptions = {
    origin:`${baseUrl}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers as needed
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log(err))

app.use('/api/auth',require('./routes/authRouter'))
app.use('/api/products',require('./routes/productRouter'))
app.use('/api/orders',require('./routes/orderRouter'))
app.use('/api/cart',require('./routes/cartRouter'))

const PORT = process.env.PORT||5000
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))