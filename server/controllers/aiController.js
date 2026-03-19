const { GoogleGenerativeAI } = require('@google/generative-ai')
const Profile = require('../models/Profile')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const getSkillGapAndRoadmap = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }

        const prompt = `
        You are a career advisor for Indian college students.
        
        Student Profile:
        - Branch: ${profile.branch}
        - Current Skills: ${profile.skills.join(', ')}
        - Interests: ${profile.interests.join(', ')}
        - Target Role: ${profile.targetRole}
        - Experience: ${profile.experience}
        
        Give me:
        1. Missing skills for the target role
        2. A personalized learning roadmap with free resources
        
        Format your response as JSON like this:
        {
            "missingSkills": ["skill1", "skill2"],
            "roadmap": [
                {
                    "skill": "skill name",
                    "resource": "free resource name",
                    "link": "https://...",
                    "duration": "estimated days"
                }
            ]
        }
        Return only JSON, no extra text.
        `

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
        const result = await model.generateContent(prompt)
        const text = result.response.text()

        const clean = text.replace(/```json|```/g, '').trim()
        const data = JSON.parse(clean)

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}
const getInterviewQuestions = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    if (!profile) return res.status(404).json({ message: 'Profile not found' })

    const prompt = `
    Generate 5 interview questions for a ${profile.targetRole} role.
    Student background: ${profile.branch}, skills: ${profile.skills.join(', ')}.
    Return only JSON like this:
    { "questions": ["question1", "question2", "question3", "question4", "question5"] }
    Return only JSON, no extra text.
    `
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(clean)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

const evaluateAnswers = async (req, res) => {
  try {
    const { questions, answers } = req.body

    const prompt = `
    Evaluate these interview answers and return JSON only:
    ${questions.map((q, i) => `Q${i+1}: ${q}\nAnswer: ${answers[i] || 'No answer'}`).join('\n\n')}
    
    Return only JSON like this:
    {
      "overallScore": 7,
      "evaluations": [
        {
          "question": "question text",
          "score": 8,
          "strength": "what was good",
          "improvement": "what to improve"
        }
      ]
    }
    Return only JSON, no extra text.
    `
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(clean)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
const scoreResume = async (req, res) => {
  try {
    const { resumeText } = req.body
    const profile = await Profile.findOne({ user: req.user.id })

    const prompt = `
    Analyze this resume for a student targeting ${profile?.targetRole || 'a tech role'} role.
    
    Resume:
    ${resumeText}
    
    Return only JSON like this:
    {
      "score": 72,
      "categories": [
        { "name": "Formatting & Structure", "score": 80 },
        { "name": "Skills Section", "score": 70 },
        { "name": "Experience & Projects", "score": 65 },
        { "name": "Keywords & ATS", "score": 75 }
      ],
      "improvements": [
        "Add measurable achievements to each project",
        "Include more relevant keywords for the role"
      ],
      "strengths": [
        "Clean formatting",
        "Good skills section"
      ]
    }
    Return only JSON, no extra text.
    `
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(clean)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
module.exports = { getSkillGapAndRoadmap, getInterviewQuestions, evaluateAnswers, scoreResume }