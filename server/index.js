const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log(err))


const PORT = process.env.PORT||5000
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))