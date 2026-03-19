import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SkillGap() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchSkillGap = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get('https://careerlens-backend-otsv.onrender.com/api/ai/skillgap', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data)
      setLoading(false)
    } catch (error) {
      alert('Error fetching skill gap. Try again later.')
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <h2 style={{ margin: 0 }}>Skill Gap Analysis</h2>
      </div>

      {!data && (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
          <h3>Analyze Your Skill Gap</h3>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            AI will compare your skills with your target role and show what's missing
          </p>
          <button
            onClick={fetchSkillGap}
            disabled={loading}
            style={{ padding: '12px 32px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            {loading ? 'Analyzing... please wait' : 'Analyze My Skills'}
          </button>
        </div>
      )}

      {data && (
        <div>
          {/* Missing Skills */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#DC2626' }}>❌ Missing Skills</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {data.missingSkills.map((skill, index) => (
                <span key={index} style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '6px 14px', borderRadius: '20px', fontSize: '14px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#16A34A' }}>✅ Your Learning Roadmap</h3>
            {data.roadmap.map((item, index) => (
              <div key={index} style={{ borderLeft: '3px solid #4F46E5', paddingLeft: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{item.skill}</h4>
                  <span style={{ fontSize: '12px', color: '#666', backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '10px' }}>
                    {item.duration}
                  </span>
                </div>
                <p style={{ margin: '0 0 6px 0', color: '#666', fontSize: '14px' }}>{item.resource}</p>
                <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#4F46E5', fontSize: '14px' }}>
                  Start Learning →
                </a>
              </div>
            ))}
          </div>

          <button
            onClick={() => setData(null)}
            style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}
          >
            Analyze Again
          </button>
        </div>
      )}
    </div>
  )
}

export default SkillGap