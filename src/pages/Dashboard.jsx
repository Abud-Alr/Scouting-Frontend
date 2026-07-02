import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  // Check for existing progress
  const hasBwsProgress = localStorage.getItem('scouting-bws-scores') !== null;
  const hasErProgress = localStorage.getItem('scouting-er-scores') !== null;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-[#1A368D] text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0000] rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#31A529] rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading tracking-wide mb-4"
          >
            Welkom bij de Competentieroos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Kies jouw speltak en vul je kwalificatiekaart in om jouw ontwikkeling als teamleider of adviseur inzichtelijk te maken.
          </motion.p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* BWS Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border-t-8 border-[#31A529] transform transition-transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-[#31A529]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#31A529]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h2 className="text-2xl font-heading text-gray-800 mb-3">Bevers / Welpen / Scouts</h2>
              <p className="text-gray-600 mb-8 min-h-[80px]">
                Kwalificatiekaart voor teamleiding van jeugdleden (5 t/m 15 jaar). Focus op coördinatie, kwaliteitsbewaking en vertegenwoordiging.
              </p>
              
              <div className="space-y-3">
                <Link 
                  to="/assessment/bws" 
                  className="block w-full text-center bg-[#31A529] hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                  {hasBwsProgress ? 'Verder gaan met invullen' : 'Start nieuwe kwalificatiekaart'}
                </Link>
                {hasBwsProgress && (
                  <Link 
                    to="/results/bws" 
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
                  >
                    Bekijk resultaten
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          {/* ER Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border-t-8 border-[#FF0000] transform transition-transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-[#FF0000]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FF0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              </div>
              <h2 className="text-2xl font-heading text-gray-800 mb-3">Explorers / Roverscouts</h2>
              <p className="text-gray-600 mb-8 min-h-[80px]">
                Kwalificatiekaart voor teamleiding en adviseurs van jongeren (15 t/m 21 jaar). Focus op coachen, adviseren en begeleiden.
              </p>
              
              <div className="space-y-3">
                <Link 
                  to="/assessment/er" 
                  className="block w-full text-center bg-[#FF0000] hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                  {hasErProgress ? 'Verder gaan met invullen' : 'Start nieuwe kwalificatiekaart'}
                </Link>
                {hasErProgress && (
                  <Link 
                    to="/results/er" 
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
                  >
                    Bekijk resultaten
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
