const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/authController')
const protect = require('../middleware/authMiddleware')
const User = require('../models/User')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router