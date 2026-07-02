const Footer = () => {
  return (
    <footer className="bg-[#1A368D] text-white py-8 border-t-4 border-[#FF0000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-heading text-xl mb-2">Scouting Nederland</h3>
            <p className="text-sm text-blue-200">Laat je uitdagen!</p>
          </div>
          <div className="text-sm text-blue-200 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Scouting Nederland.</p>
            <p>Onderdeel van Keuzedeel Frontend - Malek Alrajawy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
