import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bwsData, erData } from '../data/competencyData';
import { motion } from 'framer-motion';

const Assessment = () => {
  const { track } = useParams();
  const navigate = useNavigate();
  
  const isBWS = track === 'bws';
  const trackData = isBWS ? bwsData : erData;
  const storageKey = `scouting-${track}-scores`;
  const trackColor = isBWS ? 'text-[#31A529]' : 'text-[#FF0000]';
  const trackBg = isBWS ? 'bg-[#31A529]' : 'bg-[#FF0000]';

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [scores, setScores] = useState({});

  useEffect(() => {
    // Load saved scores
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setScores(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse scores", e);
      }
    }
  }, [storageKey]);

  const handleScoreChange = (compId, value) => {
    const newScores = { ...scores, [compId]: parseInt(value, 10) };
    setScores(newScores);
    localStorage.setItem(storageKey, JSON.stringify(newScores));
  };

  const currentTask = trackData[activeTaskIndex];
  
  // Calculate progress
  let totalCompetencies = 0;
  let filledCompetencies = 0;
  
  trackData.forEach(task => {
    task.modules.forEach(mod => {
      totalCompetencies += mod.competencies.length;
      mod.competencies.forEach(comp => {
        if (scores[comp.id] !== undefined) {
          filledCompetencies++;
        }
      });
    });
  });
  
  const progressPercentage = Math.round((filledCompetencies / totalCompetencies) * 100) || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md z-10 sticky top-20 md:h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-heading text-lg text-gray-800">
            {isBWS ? 'Bevers/Welpen/Scouts' : 'Explorers/Roverscouts'}
          </h2>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Voortgang</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`${trackBg} h-2.5 rounded-full transition-all duration-500`} 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <nav className="p-2 space-y-1">
          {trackData.map((task, idx) => (
            <button
              key={task.id}
              onClick={() => setActiveTaskIndex(idx)}
              className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTaskIndex === idx 
                  ? `${trackBg} text-white shadow-sm` 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {task.title}
            </button>
          ))}
        </nav>
        
        <div className="p-4 mt-auto border-t">
          <button 
            onClick={() => navigate(`/results/${track}`)}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1A368D] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A368D]"
          >
            Bekijk Resultaten
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <motion.div
          key={activeTaskIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className={`text-3xl font-heading mb-2 ${trackColor}`}>{currentTask.title}</h1>
            <p className="text-gray-600">Beoordeel jezelf op de onderstaande competenties (0 = onvoldoende/geen ervaring, 5 = uitstekend).</p>
          </div>

          <div className="space-y-8">
            {currentTask.modules.map(module => (
              <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">{module.title}</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {module.competencies.map((comp, i) => (
                    <div key={comp.id} className="p-6 md:flex md:items-center md:justify-between hover:bg-gray-50 transition-colors">
                      <div className="md:w-2/3 mb-4 md:mb-0 pr-4">
                        <span className="inline-block w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs font-bold text-center leading-6 mr-3">
                          {i + 1}
                        </span>
                        <span className="text-gray-800 font-medium">{comp.text}</span>
                      </div>
                      
                      <div className="md:w-1/3 flex flex-col items-center">
                        <div className="flex w-full justify-between px-2 mb-2 text-xs text-gray-500">
                          <span>0</span>
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="5" 
                          step="1"
                          value={scores[comp.id] !== undefined ? scores[comp.id] : 0}
                          onChange={(e) => handleScoreChange(comp.id, e.target.value)}
                          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1A368D]`}
                        />
                        <div className="mt-2 font-bold text-lg text-[#1A368D]">
                          {scores[comp.id] !== undefined ? scores[comp.id] : '-'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setActiveTaskIndex(Math.max(0, activeTaskIndex - 1))}
              disabled={activeTaskIndex === 0}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vorige
            </button>
            
            {activeTaskIndex < trackData.length - 1 ? (
              <button
                onClick={() => setActiveTaskIndex(activeTaskIndex + 1)}
                className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${trackBg} hover:opacity-90`}
              >
                Volgende
              </button>
            ) : (
              <button
                onClick={() => navigate(`/results/${track}`)}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1A368D] hover:bg-blue-800"
              >
                Bekijk Resultaten
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Assessment;
