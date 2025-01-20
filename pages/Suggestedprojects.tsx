import React from 'react';
import { FaRegHeart, FaSyncAlt, FaThumbsDown } from 'react-icons/fa';
import Heading from '../components/Heading';
import Navbar from '../components/Navbar';

interface Project {
  title: string;
  description: string;
  techStacks: string[];
  ownerName: string;
  status: 'open' | 'in-progress' | 'completed';
}

const Suggestedprojects: React.FC = () => {
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
  ];

  return (
    <div className="flex min-h-screen">
      <Navbar />

      <div className="flex-grow bg-slate-300 p-4">
        <div className="flex flex-col w-full max-w-xl mx-auto">
          <Heading label="Suggested Projects" />
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg p-4 my-2 shadow-md">
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
                  <FaSyncAlt className="text-xl" />
                </button>

                <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all">
                  <FaThumbsDown className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestedprojects;
