import React, { useState, useEffect } from 'react'
import { LineChart, Dumbbell, BarChart2, MessageCircle } from 'lucide-react'
import { predeterminedExercises, Exercise, Program } from '../data/exercises'

const ClientDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'program' | 'personalBests'>('program')
  const [currentProgram, setCurrentProgram] = useState<Program>({
    id: 1,
    name: 'Sample Program',
    weeks: [
      {
        days: [
          {
            name: 'Day 1',
            exercises: [
              {
                name: 'Bench Press',
                percentage: 80,
                isIndependent: false,
                sets: 3,
                reps: 8,
                comment: 'Focus on form'
              }
            ]
          }
        ]
      }
    ]
  })
  const [personalBests, setPersonalBests] = useState<Record<string, number>>({})

  useEffect(() => {
    // Initialize personal bests with standard exercises
    const initialPersonalBests: Record<string, number> = {}
    predeterminedExercises.forEach(exercise => {
      initialPersonalBests[exercise] = 0
    })
    setPersonalBests(initialPersonalBests)
  }, [])

  const updatePersonalBest = (exercise: string, weight: number) => {
    setPersonalBests(prev => ({
      ...prev,
      [exercise]: weight
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => setActiveView('program')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'program' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Training Program
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView('personalBests')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'personalBests' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Personal Bests
            </button>
          </li>
        </ul>
      </nav>

      {activeView === 'program' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-2">Current Program: {currentProgram.name}</h3>
          {currentProgram.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="bg-white shadow rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold mb-2">Week {weekIndex + 1}</h4>
              {week.days.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                  <h5 className="font-medium mb-2">{day.name}</h5>
                  <ul className="space-y-2">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <li key={exerciseIndex} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exercise.name}</span>
                          <span className="text-sm text-gray-600">
                            {exercise.sets} sets x {exercise.reps} reps
                          </span>
                        </div>
                        <div className="mt-2">
                          {exercise.isIndependent ? (
                            `Independent Exercise: ${exercise.percentage}% effort`
                          ) : (
                            <>
                              <span className="text-sm text-gray-600">
                                Target: {exercise.percentage}% of PB
                              </span>
                              <span className="ml-2 text-sm font-medium">
                                ({Math.round((personalBests[exercise.name] || 0) * (exercise.percentage / 100))} kg)
                              </span>
                            </>
                          )}
                        </div>
                        {exercise.comment && (
                          <div className="mt-2 text-sm text-gray-700 bg-blue-50 p-2 rounded flex items-start">
                            <MessageCircle size={16} className="mr-2 mt-1 flex-shrink-0" />
                            <p>{exercise.comment}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeView === 'personalBests' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-2">Personal Bests</h3>
          <ul className="space-y-2">
            {Object.entries(personalBests).map(([exercise, weight]) => (
              <li key={exercise} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
                <span className="font-medium">{exercise}</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => updatePersonalBest(exercise, Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded mr-2"
                  />
                  <span className="text-lg font-bold">kg</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ClientDashboard