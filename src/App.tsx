import React, { useState } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import TrainerDashboard from './components/TrainerDashboard'
import ClientDashboard from './components/ClientDashboard'

type UserType = 'trainer' | 'client' | null

function App() {
  const [userType, setUserType] = useState<UserType>(null)

  const handleLogin = (username: string, password: string) => {
    // In a real application, you would validate credentials here
    if (username === 'trainer' && password === 'password') {
      setUserType('trainer')
    } else if (username === 'client' && password === 'password') {
      setUserType('client')
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setUserType(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">FitTrack Pro</h1>
          {userType && (
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          )}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {userType === null && <LoginScreen onLogin={handleLogin} />}
          {userType === 'trainer' && <TrainerDashboard />}
          {userType === 'client' && <ClientDashboard />}
        </div>
      </main>
    </div>
  )
}

export default App