import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Resume() {
  const [resumeText, setResumeText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume first')
      return
    }
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.post('https://careerlens-backend-otsv.onrender.com/api/ai/resume',
        { resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResult(res.data)
      setLoading(false)
    } catch (error) {
      alert('Error analyzing resume. Try again later.')
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
        <h2 style={{ margin: 0 }}>Resume Scorer</h2>
      </div>

      {!result && (
        <div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 12px 0' }}>Paste Your Resume</h3>
            <textarea
              placeholder="Paste your entire resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '300px', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={analyzeResume}
            disabled={loading}
            style={{ width: '100%', padding: '12px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            {loading ? 'Analyzing resume...' : 'Score My Resume'}
          </button>
        </div>
      )}

      {result && (
        <div>
          {/* Overall Score */}
          <div style={{ backgroundColor: '#4F46E5', borderRadius: '10px', padding: '24px', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0' }}>Resume Score</h2>
            <div style={{ fontSize: '64px', fontWeight: 'bold' }}>{result.score}</div>
            <div style={{ opacity: 0.8 }}>out of 100</div>
          </div>

          {/* Category Scores */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Score Breakdown</h3>
            {result.categories.map((cat, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{cat.name}</span>
                  <span style={{ fontSize: '14px', color: '#4F46E5' }}>{cat.score}/100</span>
                </div>
                <div style={{ backgroundColor: '#F3F4F6', borderRadius: '10px', height: '8px' }}>
                  <div style={{ backgroundColor: '#4F46E5', borderRadius: '10px', height: '8px', width: `${cat.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Improvements */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#DC2626' }}>💡 Improvements Needed</h3>
            {result.improvements.map((tip, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', padding: '10px', backgroundColor: '#FEF2F2', borderRadius: '8px' }}>
                <span>❌</span>
                <span style={{ fontSize: '14px', color: '#DC2626' }}>{tip}</span>
              </div>
            ))}
          </div>

          {/* Strengths */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#16A34A' }}>✅ Strengths</h3>
            {result.strengths.map((strength, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', padding: '10px', backgroundColor: '#F0FDF4', borderRadius: '8px' }}>
                <span>✅</span>
                <span style={{ fontSize: '14px', color: '#16A34A' }}>{strength}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setResult(null); setResumeText('') }}
            style={{ width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            Score Another Resume
          </button>
        </div>
      )}
    </div>
  )
}

export default Resume