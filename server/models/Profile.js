const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    branch: { type: String, required: true },
    skills: [String],
    interests: [String],
    targetRole: { type: String, required: true },
    experience: { type: String, default: 'fresher' }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)