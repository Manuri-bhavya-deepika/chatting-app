// import { FaUser, FaProjectDiagram, FaChevronDown, FaChevronUp, FaPlus, FaLightbulb, FaThList, FaSignOutAlt, FaBars } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const Navbar: React.FC = () => {
//   const navigate = useNavigate();
//   const [isProjectsOpen, setIsProjectsOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

//   return (
//     <div className={`min-h-[820px] ${isSidebarOpen ? 'w-64' : 'w-0'} md:w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-4 transition-all duration-300`}>
      
//       {/* Hamburger Button - visible only on mobile screens */}
//       <button
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         className="md:hidden text-white text-2xl absolute top-4 left-2 z-50"
//       >
//         <FaBars />
//       </button>

//       {/* Sidebar Content - Always visible on tablet and laptop views, toggled for mobile */}
//       <div className={`flex flex-col w-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
//         <h2 className="text-xl font-bold mb-6">Dashboard</h2>
//         <nav className="flex flex-col space-y-4">
//           <NavItem onClick={() => navigate('/userprofile')} icon={<FaUser />} label="User Profile" />
//           <div>
//             <button
//               onClick={() => setIsProjectsOpen(!isProjectsOpen)}
//               className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded-md transition"
//             >
//               <div className="flex items-center space-x-3">
//                 <FaProjectDiagram />
//                 <span>Projects</span>
//               </div>
//               {isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
//             </button>

//             {isProjectsOpen && (
//               <div className="ml-6 mt-2 flex flex-col space-y-2">
//                 <DropdownItem onClick={() => navigate('/createproject')} icon={<FaPlus />} label="Create Project" />
//                 <DropdownItem onClick={() => navigate('/suggestedprojects')} icon={<FaLightbulb />} label="Suggested Projects" />
//                 <DropdownItem onClick={() => navigate('/allprojects')} icon={<FaThList />} label="All Projects" />
//               </div>
//             )}
//           </div>

//           <NavItem
//             onClick={() => {
//               console.log('Logging out...');
//               navigate('/Logout');
//             }}
//             icon={<FaSignOutAlt />}
//             label="Logout"
//           />
//         </nav>
//       </div>
//     </div>
//   );
// };

// const NavItem: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
//   <button onClick={onClick} className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md transition text-left w-full">
//     {icon}
//     <span>{label}</span>
//   </button>
// );

// const DropdownItem: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
//   <button onClick={onClick} className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition text-left w-full">
//     {icon}
//     <span>{label}</span>
//   </button>
// );
// export default Navbar;





import { FaUser, FaProjectDiagram, FaChevronDown, FaChevronUp, FaPlus, FaLightbulb, FaThList, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar visibility
  const [isMobileView, setIsMobileView] = useState(false); // State to detect mobile view

  // Detect window size (mobile or tablet/desktop)
  useEffect(() => {
    const checkWindowWidth = () => {
      setIsMobileView(window.innerWidth < 768); // Set to true if the width is below 768px
    };

    // Run on initial load
    checkWindowWidth();

    // Add event listener to check for window resize
    window.addEventListener('resize', checkWindowWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkWindowWidth);
  }, []);

  // Detect navigation and close the sidebar for tablet view
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Ensure the sidebar is collapsed when navigating (for mobile view)
    }
  }, [navigate]); // Triggered on navigation

  return (
    <div className={`min-h-[820px] ${isSidebarOpen ? 'w-64' : 'w-0'} md:w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-4 transition-all duration-300`}>
      
      {/* Hamburger Button - visible only on mobile screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden text-white text-2xl absolute top-4 left-2 z-50"
      >
        <FaBars />
      </button>

      {/* Sidebar Content - Visible on tablet/desktop screens (md:block) */}
      <div className={`flex flex-col w-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'block' : 'hidden'} ${isMobileView ? '' : 'md:block'}`}>
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavItem onClick={() => navigate('/userprofile')} icon={<FaUser />} label="User Profile" />
          <div>
            <button
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded-md transition"
            >
              <div className="flex items-center space-x-3">
                <FaProjectDiagram />
                <span>Projects</span>
              </div>
              {isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isProjectsOpen && (
              <div className="ml-6 mt-2 flex flex-col space-y-2">
                <DropdownItem onClick={() => navigate('/createproject')} icon={<FaPlus />} label="Create Project" />
                <DropdownItem onClick={() => navigate('/suggestedprojects')} icon={<FaLightbulb />} label="Suggested Projects" />
                <DropdownItem onClick={() => navigate('/allprojects')} icon={<FaThList />} label="All Projects" />
              </div>
            )}
          </div>

          <NavItem
            onClick={() => {
              console.log('Logging out...');
              navigate('/Logout');
            }}
            icon={<FaSignOutAlt />}
            label="Logout"
          />
        </nav>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
  <button onClick={onClick} className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md transition text-left w-full">
    {icon}
    <span>{label}</span>
  </button>
);

const DropdownItem: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string }> = ({ onClick, icon, label }) => (
  <button onClick={onClick} className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition text-left w-full">
    {icon}
    <span>{label}</span>
  </button>
);

export default Navbar;


