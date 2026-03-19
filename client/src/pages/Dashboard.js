import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    const [profileRes, userRes] = await Promise.all([
      axios.get('https://careerlens-backend-otsv.onrender.com/api/profile/me', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('https://careerlens-backend-otsv.onrender.com/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])
    setProfile({ ...profileRes.data, userName: userRes.data.name })
    setLoading(false)
  } catch (error) {
    navigate('/profile')
  }
}
    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
      <h3 style={{ color: '#4F46E5' }}>Loading CareerLens...</h3>
    </div>
  )
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
      
      {/* Header */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
  <div>
    <h1 style={{ margin: 0, fontSize: '24px' }}>CareerLens</h1>
    <p style={{ margin: 0, color: '#666' }}>Your career dashboard</p>
  </div>
  <div style={{ position: 'relative' }}>
    <div
      onClick={() => setShowProfile(!showProfile)}
      style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4F46E5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
    >
      {profile.userName ? profile.userName.charAt(0).toUpperCase() : 'S'}
    </div>
    {showProfile && (
      <div style={{ position: 'absolute', right: 0, top: '50px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '16px', width: '250px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4F46E5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
            {profile.userName ? profile.userName.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: '500' }}>{profile.userName || 'Student'}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{profile.targetRole}</p>
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>Branch</p>
          <p style={{ margin: 0, fontSize: '14px' }}>{profile.branch}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>Experience</p>
          <p style={{ margin: 0, fontSize: '14px' }}>{profile.experience}</p>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#666' }}>Skills</p>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {profile.skills.map((skill, i) => (
              <span key={i} style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '20px', fontSize: '12px' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => navigate('/profile')}
            style={{ flex: 1, padding: '8px', backgroundColor: '#EEF2FF', color: '#4F46E5', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' }}
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            style={{ flex: 1, padding: '8px', backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' }}
          >
            Logout
          </button>
        </div>
      </div>
    )}
  </div>
</div>

      {/* Profile Card */}
      <div style={{ backgroundColor: '#4F46E5', borderRadius: '10px', padding: '24px', color: 'white', marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Welcome back, {profile.userName || 'Student'}! 👋</h2>
        <p style={{ margin: '0 0 16px 0', opacity: 0.8 }}>Target Role: {profile.targetRole}</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>
            {profile.branch}
          </span>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>
            {profile.experience}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Your Current Skills</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {profile.skills.map((skill, index) => (
            <span key={index} style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        <div
          onClick={() => navigate('/skillgap')}
          style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>Skill Gap Analysis</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>See what skills you're missing for your target role</p>
        </div>

        <div
          onClick={() => navigate('/internships')}
          style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💼</div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>Internships</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Find internships matched to your profile</p>
        </div>

        <div
          onClick={() => navigate('/interview')}
          style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎤</div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>Mock Interview</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Practice interviews with AI feedback</p>
        </div>

        <div
          onClick={() => navigate('/resume')}
          style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>Resume Scorer</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Get AI score and improvement tips</p>
        </div>

      </div>

     {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#999' }}>
          Made with ❤️ by <span style={{ color: '#4F46E5', fontWeight: '500' }}>Vinay</span>
        </p>
       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
          <a href="https://linkedin.com/in/vinayswargam6716" target="_blank" rel="noreferrer" title="LinkedIn">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="https://instagram.com/gamestarvinay" target="_blank" rel="noreferrer" title="Instagram">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style={{ width: '24px', height: '24px' }} />
          </a>
          <a 
  href="https://mail.google.com/mail/?view=cm&to=vinayswargam17@gmail.com" 
  target="_blank" 
  rel="noreferrer" 
  title="Email"
>
  <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" style={{ width: '24px', height: '24px' }} />
</a>
          <a href="https://github.com/SWARGAMVINAY" target="_blank" rel="noreferrer" title="GitHub">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style={{ width: '24px', height: '24px' }} />
          </a>
        </div>
      </div>
      </div>
  )
}

export default Dashboard