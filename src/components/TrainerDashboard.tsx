import React, { useState } from 'react'
import { Users, UserPlus, ClipboardList, Edit3, Dumbbell, PlusCircle, Trash2, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { predeterminedExercises, Exercise, Week, Day, Program } from '../data/exercises'

interface Client {
  id: number;
  name: string;
  password: string;
  assignedProgramId: number | null;
}

const TrainerDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'clientManagement' | 'trainingPrograms' | 'standardExercises'>('clientManagement')
  const [clients, setClients] = useState<Client[]>([])
  const [newClientName, setNewClientName] = useState('')
  const [newClientPassword, setNewClientPassword] = useState('')
  const [programs, setPrograms] = useState<Program[]>([])
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null)
  const [standardExercises, setStandardExercises] = useState<string[]>(predeterminedExercises)
  const [newProgramName, setNewProgramName] = useState('')
  const [newExerciseName, setNewExerciseName] = useState('')

  const addClient = () => {
    if (newClientName && newClientPassword) {
      setClients([...clients, { id: Date.now(), name: newClientName, password: newClientPassword, assignedProgramId: null }])
      setNewClientName('')
      setNewClientPassword('')
    }
  }

  const assignProgramToClient = (clientId: number, programId: number | null) => {
    setClients(clients.map(client =>
      client.id === clientId ? { ...client, assignedProgramId: programId } : client
    ))
  }

  const addProgram = () => {
    if (newProgramName) {
      setPrograms([...programs, { id: Date.now(), name: newProgramName, weeks: [] }])
      setNewProgramName('')
    }
  }

  const addWeekToProgram = (programId: number) => {
    setPrograms(programs.map(program => 
      program.id === programId 
        ? { ...program, weeks: [...program.weeks, { days: [] }] }
        : program
    ))
  }

  const addDayToWeek = (programId: number, weekIndex: number) => {
    setPrograms(programs.map(program => 
      program.id === programId 
        ? {
            ...program,
            weeks: program.weeks.map((week, wIndex) => 
              wIndex === weekIndex
                ? { ...week, days: [...week.days, { name: `Day ${week.days.length + 1}`, exercises: [] }] }
                : week
            )
          }
        : program
    ))
  }

  const addExerciseToDay = (programId: number, weekIndex: number, dayIndex: number) => {
    setPrograms(programs.map(program => 
      program.id === programId 
        ? {
            ...program,
            weeks: program.weeks.map((week, wIndex) => 
              wIndex === weekIndex
                ? {
                    ...week,
                    days: week.days.map((day, dIndex) => 
                      dIndex === dayIndex
                        ? {
                            ...day,
                            exercises: [
                              ...day.exercises,
                              {
                                name: 'New Exercise',
                                percentage: 70,
                                isIndependent: false,
                                sets: 3,
                                reps: 10,
                                comment: ''
                              }
                            ]
                          }
                        : day
                    )
                  }
                : week
            )
          }
        : program
    ))
  }

  const updateExercise = (programId: number, weekIndex: number, dayIndex: number, exerciseIndex: number, updatedExercise: Exercise) => {
    setPrograms(programs.map(program => 
      program.id === programId 
        ? {
            ...program,
            weeks: program.weeks.map((week, wIndex) => 
              wIndex === weekIndex
                ? {
                    ...week,
                    days: week.days.map((day, dIndex) => 
                      dIndex === dayIndex
                        ? {
                            ...day,
                            exercises: day.exercises.map((exercise, eIndex) => 
                              eIndex === exerciseIndex ? updatedExercise : exercise
                            )
                          }
                        : day
                    )
                  }
                : week
            )
          }
        : program
    ))
  }

  const addStandardExercise = () => {
    if (newExerciseName && !standardExercises.includes(newExerciseName)) {
      setStandardExercises([...standardExercises, newExerciseName])
      setNewExerciseName('')
    }
  }

  return (
    <div className="trainer-dashboard">
      <nav className="nav-menu">
        <button className={`nav-item ${activeView === 'clientManagement' ? 'active' : ''}`} onClick={() => setActiveView('clientManagement')}>
          Client Management
        </button>
        <button className={`nav-item ${activeView === 'trainingPrograms' ? 'active' : ''}`} onClick={() => setActiveView('trainingPrograms')}>
          Training Programs
        </button>
        <button className={`nav-item ${activeView === 'standardExercises' ? 'active' : ''}`} onClick={() => setActiveView('standardExercises')}>
          Standard Exercises
        </button>
      </nav>

      {activeView === 'clientManagement' && (
        <div className="card">
          <h3 className="card-title">Client Management</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Client Name"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="input mr-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newClientPassword}
              onChange={(e) => setNewClientPassword(e.target.value)}
              className="input mr-2"
            />
            <button onClick={addClient} className="btn btn-primary">
              Add Client
            </button>
          </div>
          <ul className="client-list">
            {clients.map((client) => (
              <li key={client.id} className="client-item">
                <div className="client-info">
                  <span className="client-name">{client.name}</span>
                  <div className="client-program">
                    <select
                      value={client.assignedProgramId || ''}
                      onChange={(e) => assignProgramToClient(client.id, e.target.value ? Number(e.target.value) : null)}
                      className="input mt-2"
                    >
                      <option value="">Select a program</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeView === 'trainingPrograms' && (
        <div className="card">
          <h3 className="card-title">Training Programs</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Program Name"
              value={newProgramName}
              onChange={(e) => setNewProgramName(e.target.value)}
              className="input mr-2"
            />
            <button onClick={addProgram} className="btn btn-primary">
              Add Program
            </button>
          </div>
          {programs.map((program) => (
            <div key={program.id} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="program-header"
                onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
              >
                <h4 className="text-lg font-semibold">{program.name}</h4>
                {expandedProgram === program.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              {expandedProgram === program.id && (
                <div className="program-content">
                  <button onClick={() => addWeekToProgram(program.id)} className="btn btn-secondary mb-4">
                    Add Week
                  </button>
                  {program.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="week-container mb-4">
                      <h5 className="text-md font-semibold mb-2">Week {weekIndex + 1}</h5>
                      <button onClick={() => addDayToWeek(program.id, weekIndex)} className="btn btn-secondary mb-2">
                        Add Day
                      </button>
                      {week.days.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-container mb-2">
                          <h6 className="font-medium mb-2">{day.name}</h6>
                          <button onClick={() => addExerciseToDay(program.id, weekIndex, dayIndex)} className="btn btn-secondary mb-2">
                            Add Exercise
                          </button>
                          {day.exercises.map((exercise, exerciseIndex) => (
                            <div key={exerciseIndex} className="exercise-item p-2 bg-gray-50 rounded">
                              <div className="flex flex-wrap items-center gap-2 w-full">
                                <select
                                  value={exercise.name}
                                  onChange={(e) => updateExercise(program.id, weekIndex, dayIndex, exerciseIndex, { ...exercise, name: e.target.value })}
                                  className="input flex-grow"
                                >
                                  {standardExercises.map((ex) => (
                                    <option key={ex} value={ex}>
                                      {ex}
                                    </option>
                                  ))}
                                  <option value="Independent Exercise">Independent Exercise</option>
                                </select>
                                {exercise.name === 'Independent Exercise' && (
                                  <input
                                    type="text"
                                    placeholder="Exercise description"
                                    value={exercise.comment || ''}
                                    onChange={(e) => updateExercise(program.id, weekIndex, dayIndex, exerciseIndex, { ...exercise, comment: e.target.value })}
                                    className="input flex-grow"
                                  />
                                )}
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={exercise.percentage}
                                    onChange={(e) => updateExercise(program.id, weekIndex, dayIndex, exerciseIndex, { ...exercise, percentage: parseInt(e.target.value) })}
                                    className="input w-16"
                                  />
                                  <span>%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={exercise.sets}
                                    onChange={(e) => updateExercise(program.id, weekIndex, dayIndex, exerciseIndex, { ...exercise, sets: parseInt(e.target.value) })}
                                    className="input w-16"
                                  />
                                  <span>sets</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={exercise.reps}
                                    onChange={(e) => updateExercise(program.id, weekIndex, dayIndex, exerciseIndex, { ...exercise, reps: parseInt(e.target.value) })}
                                    className="input w-16"
                                  />
                                  <span>reps</span>
                                </div>
                              </div>
                              <div className="mt-2 w-full">
                                <input
                                  type="text"
                                  placeholder="Trainer's comment"
                                  value={exercise.comment || ''}
                                  onChange={(e) => updateExercise(program.id, weekIndex, dayIndex, exerciseIndex, { ...exercise, comment: e.target.value })}
                                  className="input w-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeView === 'standardExercises' && (
        <div className="card">
          <h3 className="card-title">Standard Exercises</h3>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="New Exercise Name"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              className="input mr-2"
            />
            <button onClick={addStandardExercise} className="btn btn-primary">
              Add Exercise
            </button>
          </div>
          <ul className="exercise-list">
            {standardExercises.map((exercise, index) => (
              <li key={index} className="exercise-list-item">
                <span>{exercise}</span>
                <button
                  onClick={() => {
                    setStandardExercises(standardExercises.filter((_, i) => i !== index))
                  }}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TrainerDashboard