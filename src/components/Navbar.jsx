import { Link } from 'react-router-dom';
import logo from '../assets/scouting-logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b-4 border-[#1A368D] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img className="h-12 w-auto" src={logo} alt="Scouting Nederland" />
              <div className="hidden md:block">
                <span className="font-heading text-2xl text-[#1A368D] uppercase tracking-wide">Competentieroos</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-[#FF0000] font-medium transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
