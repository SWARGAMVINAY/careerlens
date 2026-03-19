import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import SkillGap from './pages/SkillGap'
import Interview from './pages/Interview'
import Resume from './pages/Resume'
import Internships from './pages/Internships'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skillgap" element={<SkillGap />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/internships" element={<Internships />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App