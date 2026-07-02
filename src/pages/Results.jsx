import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bwsData, erData, moduleNames } from '../data/competencyData';
import CompetencyWheel from '../components/CompetencyWheel';
import { motion } from 'framer-motion';

const Results = () => {
  const { track } = useParams();
  const isBWS = track === 'bws';
  const trackData = isBWS ? bwsData : erData;
  const storageKey = `scouting-${track}-scores`;
  const trackColor = isBWS ? 'text-[#31A529]' : 'text-[#FF0000]';
  const trackBg = isBWS ? 'bg-[#31A529]' : 'bg-[#FF0000]';
  const trackTitle = isBWS ? 'Bevers / Welpen / Scouts' : 'Explorers / Roverscouts';

  const [scores, setScores] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setScores(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse scores", e);
      }
    }
  }, [storageKey]);

  // Calculate scores per module
  const moduleResults = [];
  let totalScore = 0;
  let maxTotalScore = 0;

  // Extract unique modules across all tasks to build the radar chart labels and data
  const moduleMap = new Map();

  trackData.forEach(task => {
    let taskScore = 0;
    let taskMax = 0;

    task.modules.forEach(mod => {
      let modScore = 0;
      
      mod.competencies.forEach(comp => {
        const val = scores[comp.id] || 0;
        modScore += val;
      });

      // Based on the excel sheet, sometimes scores are averaged or scaled, 
      // but we will do a simple sum for the module score and cap it at maxScore 
      // or scale it to maxScore for simplicity in this implementation, 
      // reflecting the user's input directly.
      const maxPossibleForModule = mod.competencies.length * 5;
      
      // Scale to module's maxScore as defined in the Excel sheet
      const scaledScore = maxPossibleForModule > 0 
        ? (modScore / maxPossibleForModule) * mod.maxScore 
        : 0;

      taskScore += scaledScore;
      taskMax += mod.maxScore;
      totalScore += scaledScore;
      maxTotalScore += mod.maxScore;

      moduleMap.set(mod.id, {
        id: mod.id,
        title: moduleNames[mod.id],
        score: scaledScore,
        maxScore: mod.maxScore,
        percentage: (scaledScore / mod.maxScore) * 100
      });
    });

    moduleResults.push({
      taskId: task.id,
      title: task.title,
      score: taskScore,
      maxScore: taskMax,
      percentage: taskMax > 0 ? (taskScore / taskMax) * 100 : 0
    });
  });

  // Prepare data for radar chart
  const radarLabels = [];
  const radarScores = [];
  const radarMaxScores = [];
  const sortedModules = Array.from(moduleMap.values()).sort((a, b) => a.id - b.id);

  sortedModules.forEach(mod => {
    radarLabels.push(`Mod ${mod.id}`);
    radarScores.push(mod.score);
    radarMaxScores.push(mod.maxScore);
  });

  const totalPercentage = maxTotalScore > 0 ? (totalScore / maxTotalScore) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading text-gray-900">Resultaten Competentieroos</h1>
            <p className={`text-xl ${trackColor} mt-1`}>{trackTitle}</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-3">
            <Link 
              to={`/assessment/${track}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Bewerk scores
            </Link>
            <button 
              onClick={() => window.print()}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${trackBg} hover:opacity-90`}
            >
              <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Exporteer naar PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Radar Chart Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-heading text-gray-800 mb-6 text-center">Jouw Competentieroos</h2>
            <div className="h-[400px] md:h-[500px] w-full relative">
              <CompetencyWheel 
                scores={radarScores} 
                maxScores={radarMaxScores} 
                labels={radarLabels} 
                isBWS={isBWS} 
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {sortedModules.map(mod => (
                <div key={mod.id} className="flex items-center">
                  <span className="font-bold mr-1">Mod {mod.id}:</span> {mod.title}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Score Summary Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col"
          >
            <h2 className="text-xl font-heading text-gray-800 mb-6">Score Overzicht</h2>
            
            {/* Total Score */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center border border-gray-100">
              <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Totaalscore</div>
              <div className="flex items-end justify-center">
                <span className={`text-5xl font-bold ${trackColor}`}>{totalScore.toFixed(1)}</span>
                <span className="text-xl text-gray-400 ml-1 mb-1">/ {maxTotalScore}</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${trackBg} h-2 rounded-full`} 
                  style={{ width: `${Math.min(100, totalPercentage)}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">{totalPercentage.toFixed(1)}% behaald</div>
            </div>

            {/* Task Breakdown */}
            <div className="space-y-6 flex-1">
              <h3 className="font-bold text-gray-700 border-b pb-2">Per Hoofdtaak</h3>
              
              {moduleResults.map((result) => (
                <div key={result.taskId} className="relative">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-700 truncate pr-4" title={result.title}>{result.title}</span>
                    <span className="text-gray-900 whitespace-nowrap">{result.score.toFixed(1)} / {result.maxScore}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`${trackBg} h-1.5 rounded-full`} 
                      style={{ width: `${Math.min(100, result.percentage)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <p>Deze scores geven een indicatie van je ontwikkeling. Bespreek deze resultaten met je praktijkbegeleider of groepsbestuur.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Results;
