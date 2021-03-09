require('dotenv').config()

var cors = require('cors')
const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    next()
})

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json())

const studentsRouter = require('./routes/students')

app.use('/students', studentsRouter)

app.listen(8000, () => {
    console.log('Server Started');
})