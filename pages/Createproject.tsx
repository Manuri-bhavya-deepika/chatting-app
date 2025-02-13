import React, { useState } from 'react';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const Createproject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStacks, setTechStacks] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div className="flex min-h-[730px]">
      <Navbar />
      {/* <div className="flex-grow flex items-center justify-center"> */}
      <div className="bg-slate-300 flex-grow flex items-center justify-center rounded-2xl w-[900px]">
        <div className="rounded-lg bg-white w-96 h-auto text-center p-6 shadow-lg">
          <Heading label="Create Project" />
          <Inputbox label="Title" placeholder="Enter project title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Inputbox label="Description" placeholder="Enter project description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Inputbox label="Tech Stacks" placeholder="Enter tech stacks" value={techStacks} onChange={(e) => setTechStacks(e.target.value)} />
          <Inputbox label="Status" placeholder="Enter status (open, in-progress, completed)" value={status} onChange={(e) => setStatus(e.target.value)} />

          <div className="pt-4">
            <Button label="Create Project" onClick={() => console.log({ title, description, techStacks, status })} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createproject;
