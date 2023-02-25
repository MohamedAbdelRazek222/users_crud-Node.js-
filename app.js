require('dotenv').config()
const express = require('express')
const { connectDB } = require('./DB/connection')
const { adminRouter, taskRouter, authRouter } = require('./index.Router')
const app = express()
const cors=require('cors')
app.use(express.json())
const port = process.env.PORT

   
  
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/task',taskRouter)
app.use('/api/v1/admin',adminRouter)




connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))