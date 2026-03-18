require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const aiRoutes = require('./routes/aiRoutes')

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('CareerLens server is running!')
})

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/ai', aiRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})