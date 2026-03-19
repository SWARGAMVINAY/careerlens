const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { getSkillGapAndRoadmap, getInterviewQuestions, evaluateAnswers, scoreResume, listModels, getInternships } = require('../controllers/aiController')

router.get('/models', protect, listModels)
router.get('/skillgap', protect, getSkillGapAndRoadmap)
router.get('/interview/questions', protect, getInterviewQuestions)
router.post('/interview/evaluate', protect, evaluateAnswers)
router.post('/resume', protect, scoreResume)
router.get('/internships', protect, getInternships)

module.exports = router