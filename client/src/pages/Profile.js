import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [formData, setFormData] = useState({
    branch: '',
    skills: '',
    interests: '',
    targetRole: '',
    experience: 'fresher'
  })
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }
        const res = await axios.get('https://careerlens-backend-otsv.onrender.com/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setFormData({
          branch: res.data.branch,
          skills: res.data.skills.join(', '),
          interests: res.data.interests.join(', '),
          targetRole: res.data.targetRole,
          experience: res.data.experience
        })
        setIsEditing(true)
      } catch (error) {
        // no profile yet
      }
    }
    loadProfile()
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const dataToSend = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        interests: formData.interests.split(',').map(i => i.trim())
      }
      await axios.post('https://careerlens-backend-otsv.onrender.com/api/profile/save', dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/dashboard')
    } catch (error) {
      alert('Error saving profile')
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        {isEditing && (
          <button
            onClick={() => navigate('/dashboard')}
            style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}
          >
            ← Back
          </button>
        )}
        <h2 style={{ margin: 0 }}>{isEditing ? 'Edit Profile' : 'Complete Your Profile'}</h2>
      </div>
      {!isEditing && <p style={{ color: '#666', marginBottom: '20px' }}>This helps AI personalize everything for you</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Branch</label>
          <input
            type="text"
            name="branch"
            placeholder="e.g. Computer Science"
            value={formData.branch}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Current Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="e.g. HTML, CSS, JavaScript"
            value={formData.skills}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
          <small style={{ color: '#888' }}>Separate skills with commas</small>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Interests</label>
          <input
            type="text"
            name="interests"
            placeholder="e.g. Web Development, AI, Data Science"
            value={formData.interests}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
          <small style={{ color: '#888' }}>Separate interests with commas</small>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Target Role</label>
          <input
            type="text"
            name="targetRole"
            placeholder="e.g. Frontend Developer"
            value={formData.targetRole}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Experience Level</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="fresher">Fresher</option>
            <option value="beginner">Beginner (0-6 months)</option>
            <option value="intermediate">Intermediate (6-12 months)</option>
          </select>
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {isEditing ? 'Update Profile' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}

export default Profile