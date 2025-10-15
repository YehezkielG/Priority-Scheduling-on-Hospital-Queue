import React, { useState, useEffect } from 'react';
import { Activity, Clock, Plus, Play, RotateCcw, Pause, BarChart3, Settings, Info, Users, Timer, Award, X, ChevronRight } from 'lucide-react';

const PriorityScheduler = () => {
  const [patients, setPatients] = useState([]);
  const [treated, setTreated] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    condition: '',
    priority: 3,
    treatmentTime: 5
  });

  const priorities = [
    { level: 1, name: 'Critical', color: 'bg-red-500', lightColor: 'bg-red-50', textColor: 'text-red-600', borderColor: 'border-red-200', desc: 'Life-threatening' },
    { level: 2, name: 'Emergency', color: 'bg-orange-500', lightColor: 'bg-orange-50', textColor: 'text-orange-600', borderColor: 'border-orange-200', desc: 'Serious' },
    { level: 3, name: 'Urgent', color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600', borderColor: 'border-amber-200', desc: 'Moderate' },
    { level: 4, name: 'Semi-Urgent', color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600', borderColor: 'border-blue-200', desc: 'Minor' },
    { level: 5, name: 'Non-Urgent', color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600', borderColor: 'border-emerald-200', desc: 'Stable' }
  ];

  const conditions = [
    { name: 'Cardiac Arrest', priority: 1, time: 15 },
    { name: 'Severe Bleeding', priority: 1, time: 12 },
    { name: 'Stroke Symptoms', priority: 2, time: 10 },
    { name: 'Chest Pain', priority: 2, time: 9 },
    { name: 'Broken Bone', priority: 3, time: 8 },
    { name: 'High Fever', priority: 3, time: 6 },
    { name: 'Asthma Attack', priority: 3, time: 7 },
    { name: 'Sprain', priority: 4, time: 5 },
    { name: 'Minor Cut', priority: 4, time: 4 },
    { name: 'Common Cold', priority: 5, time: 3 }
  ];

  const sortedPatients = [...patients].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.arrivalTime - b.arrivalTime;
  });

  useEffect(() => {
    let interval;
    if (isRunning && !currentPatient && sortedPatients.length > 0) {
      const nextPatient = sortedPatients[0];
      setCurrentPatient({ ...nextPatient, remainingTime: nextPatient.treatmentTime });
      setPatients(patients.filter(p => p.id !== nextPatient.id));
      showNotification(`Now treating: ${nextPatient.name}`);
    } else if (isRunning && currentPatient) {
      interval = setInterval(() => {
        setTime(t => t + 1);
        setCurrentPatient(prev => {
          if (prev.remainingTime <= 1) {
            const completedPatient = { ...prev, completionTime: time + 1, waitTime: time + 1 - prev.arrivalTime - prev.treatmentTime };
            setTreated(old => [...old, completedPatient]);
            showNotification(`Completed: ${prev.name}`);
            return null;
          }
          return { ...prev, remainingTime: prev.remainingTime - 1 };
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentPatient, sortedPatients, time, speed, patients]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addPatient = () => {
    if (!newPatient.name || !newPatient.condition) {
      showNotification('Please fill in all fields');
      return;
    }
    
    const patient = {
      id: Date.now(),
      ...newPatient,
      arrivalTime: time
    };
    setPatients([...patients, patient]);
    showNotification(`${newPatient.name} added to queue`);
    setNewPatient({ name: '', condition: '', priority: 3, treatmentTime: 5 });
  };

  const addRandomPatient = () => {
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const names = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown', 'Charlie Davis', 'Emma Wilson'];
    const patient = {
      id: Date.now(),
      name: names[Math.floor(Math.random() * names.length)],
      condition: condition.name,
      priority: condition.priority,
      treatmentTime: condition.time,
      arrivalTime: time
    };
    setPatients([...patients, patient]);
    showNotification(`${patient.name} arrived`);
  };

  const addMultiplePatients = (count) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => addRandomPatient(), i * 200);
    }
  };

  const reset = () => {
    setPatients([]);
    setTreated([]);
    setCurrentPatient(null);
    setIsRunning(false);
    setTime(0);
    showNotification('Simulation reset');
  };

  const getPriorityInfo = (level) => priorities.find(p => p.level === level);

  const avgWaitTime = treated.length > 0 
    ? (treated.reduce((sum, p) => sum + p.waitTime, 0) / treated.length).toFixed(1)
    : 0;

  const avgTreatmentTime = treated.length > 0 
    ? (treated.reduce((sum, p) => sum + p.treatmentTime, 0) / treated.length).toFixed(1)
    : 0;

  const priorityDistribution = priorities.map(p => ({
    ...p,
    count: [...patients, ...treated].filter(patient => patient.priority === p.level).length
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {notification && (
        <div className="fixed top-6 right-6 bg-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Emergency Room Priority Scheduler
              </h1>
              <p className="text-slate-600">Real-time simulation of priority scheduling algorithm in hospital ER</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInfo(!showInfo)} className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition">
                <Info size={20} />
              </button>
              <button onClick={() => setShowStats(!showStats)} className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition">
                <BarChart3 size={20} />
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition">
                <Settings size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {priorities.map(p => (
              <div key={p.level} className={`${p.lightColor} border ${p.borderColor} p-4 rounded-xl`}>
                <div className={`${p.textColor} font-bold mb-1`}>P{p.level}: {p.name}</div>
                <div className="text-slate-600 text-sm">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Timer size={24} className="text-indigo-600" />
                <div className="text-3xl font-bold text-slate-900">{time}s</div>
              </div>
              <div className="text-sm text-slate-600">Simulation Time</div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Users size={24} className="text-amber-600" />
                <div className="text-3xl font-bold text-slate-900">{patients.length}</div>
              </div>
              <div className="text-sm text-slate-600">In Queue</div>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Award size={24} className="text-emerald-600" />
                <div className="text-3xl font-bold text-slate-900">{treated.length}</div>
              </div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={24} className="text-purple-600" />
                <div className="text-3xl font-bold text-slate-900">{avgWaitTime}s</div>
              </div>
              <div className="text-sm text-slate-600">Avg Wait Time</div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Activity size={24} className="text-blue-600" />
                <div className="text-3xl font-bold text-slate-900">{avgTreatmentTime}s</div>
              </div>
              <div className="text-sm text-slate-600">Avg Treatment</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              {isRunning ? 'Pause' : 'Start'} Simulation
            </button>
            
            <button onClick={addRandomPatient} className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition">
              <Plus size={20} />
              Add Random Patient
            </button>
            
            <button onClick={() => addMultiplePatients(5)} className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition">
              <Users size={20} />
              Add 5 Patients
            </button>
            
            <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition">
              <RotateCcw size={20} />
              Reset
            </button>

            <div className="flex items-center gap-3 ml-auto bg-slate-100 border border-slate-200 px-6 py-3 rounded-xl">
              <span className="font-semibold text-slate-700">Speed:</span>
              <button onClick={() => setSpeed(0.5)} className={`px-3 py-1.5 rounded-lg font-semibold transition ${speed === 0.5 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}>
                0.5x
              </button>
              <button onClick={() => setSpeed(1)} className={`px-3 py-1.5 rounded-lg font-semibold transition ${speed === 1 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}>
                1x
              </button>
              <button onClick={() => setSpeed(2)} className={`px-3 py-1.5 rounded-lg font-semibold transition ${speed === 2 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}>
                2x
              </button>
            </div>
          </div>
        </div>

        {showSettings && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-slate-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-3">Simulation Speed</h3>
                <input type="range" min="0.25" max="4" step="0.25" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full" />
                <div className="text-center text-sm text-slate-600 mt-2">{speed}x speed</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-3">Quick Actions</h3>
                <button onClick={() => addMultiplePatients(10)} className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-2 rounded-lg mb-2 font-semibold transition">
                  Add 10 Patients
                </button>
                <button onClick={() => addMultiplePatients(20)} className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-2 rounded-lg font-semibold transition">
                  Add 20 Patients
                </button>
              </div>
            </div>
          </div>
        )}

        {showInfo && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Algorithm Information</h2>
              <button onClick={() => setShowInfo(false)} className="p-2 hover:bg-slate-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl">
                <h3 className="font-bold text-lg mb-3 text-indigo-900">How Priority Scheduling Works:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex gap-2"><ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />Each patient has a priority level (1-5)</li>
                  <li className="flex gap-2"><ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />Priority 1 = Most urgent (Critical)</li>
                  <li className="flex gap-2"><ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />Higher priority patients are treated first</li>
                  <li className="flex gap-2"><ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />Same priority uses FCFS</li>
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
                <h3 className="font-bold text-lg mb-3 text-emerald-900">Real-World Benefits:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex gap-2"><ChevronRight size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />Saves lives by prioritizing critical cases</li>
                  <li className="flex gap-2"><ChevronRight size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />Optimizes limited medical resources</li>
                  <li className="flex gap-2"><ChevronRight size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />Reduces risk from delayed treatment</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {showStats && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Statistics</h2>
              <button onClick={() => setShowStats(false)} className="p-2 hover:bg-slate-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-3">Priority Distribution</h3>
                {priorityDistribution.map(p => (
                  <div key={p.level} className="mb-3">
                    <div className="flex justify-between text-sm mb-1 text-slate-700">
                      <span>P{p.level}: {p.name}</span>
                      <span className="font-bold">{p.count}</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div className={`${p.color} h-2 rounded-full transition-all`} style={{width: `${(p.count / Math.max(1, [...patients, ...treated].length)) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-3">System Status</h3>
                <div className="space-y-3 text-slate-700">
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className={`font-bold ${isRunning ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isRunning ? 'Running' : 'Paused'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Queue Length</span>
                    <span className="font-bold text-indigo-600">{patients.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilization</span>
                    <span className="font-bold text-purple-600">{currentPatient ? '100%' : '0%'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Patient</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Patient Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Condition</label>
                <input
                  type="text"
                  placeholder="Enter condition"
                  value={newPatient.condition}
                  onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Priority Level</label>
                <select
                  value={newPatient.priority}
                  onChange={(e) => setNewPatient({...newPatient, priority: parseInt(e.target.value)})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {priorities.map(p => (
                    <option key={p.level} value={p.level}>P{p.level}: {p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Treatment Time</label>
                <input
                  type="number"
                  value={newPatient.treatmentTime}
                  onChange={(e) => setNewPatient({...newPatient, treatmentTime: parseInt(e.target.value)})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="1"
                />
              </div>
              <button onClick={addPatient} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
                Add Patient
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Currently Treating</h2>
            {currentPatient ? (
              <div className={`${getPriorityInfo(currentPatient.priority).lightColor} border-2 ${getPriorityInfo(currentPatient.priority).borderColor} p-6 rounded-xl`}>
                <div className={`text-2xl font-bold mb-2 ${getPriorityInfo(currentPatient.priority).textColor}`}>{currentPatient.name}</div>
                <div className="text-slate-700 text-lg mb-4">{currentPatient.condition}</div>
                <div className="bg-slate-200 rounded-full h-3 mb-2">
                  <div className={`${getPriorityInfo(currentPatient.priority).color} h-3 rounded-full transition-all`} style={{width: `${((currentPatient.treatmentTime - currentPatient.remainingTime) / currentPatient.treatmentTime) * 100}%`}}></div>
                </div>
                <div className="text-sm text-slate-600">Remaining: {currentPatient.remainingTime}s / {currentPatient.treatmentTime}s</div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12">
                <Activity size={48} className="mx-auto mb-3 opacity-30" />
                <div>No patient being treated</div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Queue</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {sortedPatients.length === 0 ? (
                <div className="text-center text-slate-400 py-12">
                  <Clock size={48} className="mx-auto mb-3 opacity-30" />
                  <div>No patients in queue</div>
                </div>
              ) : (
                sortedPatients.map((patient, idx) => {
                  const priorityInfo = getPriorityInfo(patient.priority);
                  return (
                    <div key={patient.id} className={`${priorityInfo.lightColor} border ${priorityInfo.borderColor} p-3 rounded-lg`}>
                      <div className={`font-bold ${priorityInfo.textColor}`}>#{idx + 1} {patient.name}</div>
                      <div className="text-sm text-slate-700">{patient.condition}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        P{patient.priority} • {patient.treatmentTime}s • Arrived: {patient.arrivalTime}s
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {treated.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Completed Treatments</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-3 text-left text-slate-700 font-semibold">Name</th>
                    <th className="p-3 text-left text-slate-700 font-semibold">Condition</th>
                    <th className="p-3 text-center text-slate-700 font-semibold">Priority</th>
                    <th className="p-3 text-center text-slate-700 font-semibold">Arrival</th>
                    <th className="p-3 text-center text-slate-700 font-semibold">Treatment</th>
                    <th className="p-3 text-center text-slate-700 font-semibold">Completion</th>
                    <th className="p-3 text-center text-slate-700 font-semibold">Wait Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[...new Map(treated.map(patient => [patient.id, patient])).values()].map((patient) => {
                    const priorityInfo = getPriorityInfo(patient.priority);
                    return (
                      <tr key={patient.id} className="border-b border-slate-100">
                        <td className="p-3 font-semibold text-slate-900">{patient.name}</td>
                        <td className="p-3 text-slate-700">{patient.condition}</td>
                        <td className="p-3 text-center">
                          <span className={`${priorityInfo.color} text-white px-2 py-1 rounded font-bold text-sm`}>
                            P{patient.priority}
                          </span>
                        </td>
                        <td className="p-3 text-center text-slate-700">{patient.arrivalTime}s</td>
                        <td className="p-3 text-center text-slate-700">{patient.treatmentTime}s</td>
                        <td className="p-3 text-center text-slate-700">{patient.completionTime}s</td>
                        <td className="p-3 text-center font-bold text-purple-600">{patient.waitTime}s</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityScheduler;