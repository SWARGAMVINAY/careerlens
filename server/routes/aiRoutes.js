const express = require('express')
const router = express.Router()
const { getSkillGapAndRoadmap } = require('../controllers/aiController')
const protect = require('../middleware/authMiddleware')

router.get('/skillgap', protect, getSkillGapAndRoadmap)

module.exports = router