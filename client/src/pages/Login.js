import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/dashboard')
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://careerlens-backend-otsv.onrender.com/api/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Login to CareerLens</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  )
}

export default Login
