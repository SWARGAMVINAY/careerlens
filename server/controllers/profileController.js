const Profile = require('../models/Profile')

const saveProfile = async (req, res) => {
    try {
        const { branch, skills, interests, targetRole, experience } = req.body

        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { branch, skills, interests, targetRole, experience },
                { new: true }
            )
            return res.status(200).json({ message: 'Profile updated', profile })
        }

        profile = await Profile.create({
            user: req.user.id,
            branch,
            skills,
            interests,
            targetRole,
            experience
        })

        res.status(201).json({ message: 'Profile created', profile })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

module.exports = { saveProfile, getProfile }