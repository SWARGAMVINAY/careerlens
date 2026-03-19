import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Internships() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('https://careerlens-backend-otsv.onrender.com/api/ai/internships', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setInternships(res.data.internships)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchInternships()
  }, [])

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px' }}>Finding internships for you...</div>

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <h2 style={{ margin: 0 }}>Internships For You</h2>
      </div>

      {internships.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
          <h3>No internships found</h3>
          <p style={{ color: '#666' }}>Try updating your profile with more skills</p>
        </div>
      )}

      {internships.map((item, index) => (
        <div key={index} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{item.title}</h3>
              <p style={{ margin: 0, color: '#4F46E5', fontWeight: '500' }}>{item.company}</p>
            </div>
            <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', whiteSpace: 'nowrap' }}>
              {item.stipend}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '14px', color: '#666' }}>
            <span>📍 {item.location}</span>
            <span>⏱ {item.duration}</span>
            <span>🎯 {item.type}</span>
          </div>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#444', lineHeight: '1.6' }}>{item.description}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {item.skills.map((skill, i) => (
              <span key={i} style={{ backgroundColor: '#F3F4F6', color: '#444', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                {skill}
              </span>
            ))}
          </div>
          <a
            href={item.applyLink}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-block', padding: '8px 20px', backgroundColor: '#4F46E5', color: 'white', borderRadius: '5px', textDecoration: 'none', fontSize: '14px' }}
          >
            Apply Now →
          </a>
        </div>
      ))}
    </div>
  )
}

export default Internships