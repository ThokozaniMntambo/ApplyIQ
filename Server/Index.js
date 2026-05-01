const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const applicationRoutes = require('./routes/applicationRoutes')


// Fix: Use CommonJS require for DNS
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config()
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/applications', applicationRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('ApplyIQ API is running....')
})

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
