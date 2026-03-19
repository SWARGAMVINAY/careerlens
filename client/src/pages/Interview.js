import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Interview() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('start')
  const navigate = useNavigate()

  const startInterview = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get('https://careerlens-backend-otsv.onrender.com/api/ai/interview/questions', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setQuestions(res.data.questions)
      setStep('questions')
      setLoading(false)
    } catch (error) {
      alert('Error starting interview. Try again later.')
      setLoading(false)
    }
  }

  const submitAnswers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.post('https://careerlens-backend-otsv.onrender.com/api/ai/interview/evaluate',
        { questions, answers },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setFeedback(res.data)
      setStep('feedback')
      setLoading(false)
    } catch (error) {
      alert('Error evaluating answers. Try again later.')
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
        <h2 style={{ margin: 0 }}>Mock Interview</h2>
      </div>

      {step === 'start' && (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎤</div>
          <h3>Ready for your Mock Interview?</h3>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            AI will ask you 5 interview questions based on your target role. Answer each one and get instant feedback.
          </p>
          <button
            onClick={startInterview}
            disabled={loading}
            style={{ padding: '12px 32px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            {loading ? 'Preparing questions...' : 'Start Interview'}
          </button>
        </div>
      )}

      {step === 'questions' && (
        <div>
          <p style={{ color: '#666', marginBottom: '20px' }}>Answer all questions then click Submit</p>
          {questions.map((question, index) => (
            <div key={index} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#4F46E5' }}>Q{index + 1}. {question}</h4>
              <textarea
                placeholder="Type your answer here..."
                value={answers[index] || ''}
                onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                onPaste={(e) => {
                    e.preventDefault()
                    alert('Copying and pasting is not allowed. Please type your answer.')
                }}
                onCopy={(e) => {
                    e.preventDefault()
                    alert('Copying is not allowed during the interview.')
                }}
                style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box' }}
                /> 
            </div>
          ))}
          <button
            onClick={submitAnswers}
            disabled={loading}
            style={{ width: '100%', padding: '12px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            {loading ? 'Evaluating...' : 'Submit Answers'}
          </button>
        </div>
      )}

      {step === 'feedback' && feedback && (
        <div>
          <div style={{ backgroundColor: '#4F46E5', borderRadius: '10px', padding: '24px', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0' }}>Overall Score</h2>
            <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{feedback.overallScore}/10</div>
          </div>

          {feedback.evaluations.map((item, index) => (
            <div key={index} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Q{index + 1}. {item.question}</h4>
                <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                  {item.score}/10
                </span>
              </div>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#16A34A' }}>✅ {item.strength}</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#DC2626' }}>💡 {item.improvement}</p>
            </div>
          ))}

          <button
            onClick={() => { setStep('start'); setQuestions([]); setAnswers({}); setFeedback(null) }}
            style={{ width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

export default Interview