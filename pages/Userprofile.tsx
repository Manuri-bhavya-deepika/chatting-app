import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';

const Userprofile: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [techStack, setTechStack] = useState('');
  const [college, setCollege] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [internships, setInternships] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const [companies, setCompanies] = useState('');
  const [workExperience, setWorkExperience] = useState('');

  const handleAlphabeticChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWorking(e.target.checked);
  };

  return (
      <div className="bg-slate-300 flex-1 flex justify-center p-5 w-full">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-auto text-center p-2 h-[680px] overflow-y-auto px-6">
            <Heading label="User Profile" />
            <SubHeading label="Enter your profile details below" />

            <Inputbox label="First Name" placeholder="Enter first name" value={firstName} onChange={(e) => handleAlphabeticChange(e, setFirstName)} />
            <Inputbox label="Last Name" placeholder="Enter last name" value={lastName} onChange={(e) => handleAlphabeticChange(e, setLastName)} />
            <Inputbox label="Bio" placeholder="Enter Details" value={bio} onChange={handleBioChange} />
            <Inputbox label="Tech Stack" placeholder="Enter tech stack" value={techStack} onChange={(e) => handleAlphabeticChange(e, setTechStack)} />
            <Inputbox label="College" placeholder="Enter college name" value={college} onChange={(e) => handleAlphabeticChange(e, setCollege)} />
            <Inputbox label="Year of Study" placeholder="Enter your year of study" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} />
            <Inputbox label="Internships" placeholder="Enter your internships" value={internships} onChange={(e) => setInternships(e.target.value)} />
            
            <div className="pt-2 flex items-center justify-start">
              <label className="text-left text-gray-700 mr-2">Are you currently working?</label>
              <input type="checkbox" checked={isWorking} onChange={handleCheckboxChange} />
            </div>

            {isWorking && (
              <>
                <Inputbox label="Companies" placeholder="Enter companies you worked at" value={companies} onChange={(e) => setCompanies(e.target.value)} />
                <Inputbox label="Work Experience" placeholder="Describe your work experience" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} />
              </>
            )}
            <div className="pt-4">
              <Button label="Save Changes" onClick={() => console.log('Save changes clicked')} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Userprofile;
