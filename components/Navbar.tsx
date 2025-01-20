import { FaUser, FaProjectDiagram, FaChevronDown, FaChevronUp, FaPlus, FaLightbulb, FaThList, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    return (
    <div className="h-full w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
            <NavItem onClick={() => navigate('/userprofile')} icon={<FaUser />} label="User Profile" />
            <div>
                <button onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded-md transition">
                    
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
  
