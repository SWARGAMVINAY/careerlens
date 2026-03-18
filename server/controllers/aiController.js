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

module.exports = { getSkillGapAndRoadmap }