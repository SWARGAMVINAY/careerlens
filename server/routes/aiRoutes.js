const express = require('express')
const router = express.Router()
const { getSkillGapAndRoadmap, getInterviewQuestions, evaluateAnswers, scoreResume } = require('../controllers/aiController')
const protect = require('../middleware/authMiddleware')

router.get('/skillgap', protect, getSkillGapAndRoadmap)
router.get('/interview/questions', protect, getInterviewQuestions)
router.post('/interview/evaluate', protect, evaluateAnswers)
router.post('/resume', protect, scoreResume)

module.exports = router