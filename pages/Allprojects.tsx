import React, { useState } from 'react';
import { FaSearch, FaRegHeart, FaBookmark, FaThumbsDown } from 'react-icons/fa';
import Heading from '../components/Heading';
import Navbar from '../components/Navbar';

interface Project {
  title: string;
  description: string;
  techStacks: string[];
  ownerName: string;
  status: 'open' | 'in-progress' | 'completed';
}

const AllProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const projects: Project[] = [
    {
      title: 'AI Chatbot',
      description: 'An AI-powered chatbot for customer service.',
      techStacks: ['React', 'Node.js', 'TensorFlow'],
      ownerName: 'John Doe',
      status: 'in-progress',
    },
    {
      title: 'E-commerce Platform',
      description: 'A platform for buying and selling products online.',
      techStacks: ['Angular', 'Firebase', 'Stripe'],
      ownerName: 'Jane Smith',
      status: 'open',
    },
    {
      title: 'Social Media App',
      description: 'A social media platform for connecting people.',
      techStacks: ['React Native', 'Firebase', 'GraphQL'],
      ownerName: 'Alice Johnson',
      status: 'completed',
    },
    {
      title: 'Blockchain Voting System',
      description: 'A secure voting system using blockchain technology.',
      techStacks: ['Ethereum', 'Solidity', 'React'],
      ownerName: 'Bob Brown',
      status: 'open',
    },
  ];

const filteredProjects = projects.filter((project) =>
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
  project.techStacks.some((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  return (
    <div className="flex min-h-[730px]">
      <Navbar />

      <div className="flex-grow bg-slate-300 w-full p-4">
        <div className="flex flex-col w-full max-w-4xl mx-auto">
          <Heading label="All Projects" />

          <div className="mt-4 mb-4 flex items-center bg-white rounded-full px-3 py-1 w-full">
            <FaSearch className="text-gray-500 text-lg mr-2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-1 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                  <h2 className="text-lg font-semibold">Title: {project.title}</h2>
                  <p className="text-lg text-gray-600">Description: {project.description}</p>
                  <p className="text-lg font-medium mt-1">Tech Stack: {project.techStacks.join(', ')}</p>
                  <p className="text-lg mt-1">Owner: <span className="font-semibold">{project.ownerName}</span></p>
                  <p className="text-lg mt-1">Status: <span className="text-blue-500">{project.status}</span></p>
                  <div className="flex mt-4 justify-center space-x-6">
                    <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all">
                      <FaRegHeart className="text-xl" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all mx-auto">
                      <FaBookmark className="text-xl" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all">
                      <FaThumbsDown className="text-xl" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No projects found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProjects;
