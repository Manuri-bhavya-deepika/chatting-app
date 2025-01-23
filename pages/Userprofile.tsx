import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import axios from "axios";

const Userprofile: React.FC = () => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<{ github?: string; linkedin?: string }>({});
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [collegeName, setCollegeName] = useState<string>("");
  const [internships, setInternships] = useState<
    { companyName: string; role: string; description: string }[]
  >([{ companyName: "", role: "", description: "" }]);
  const [isGraduated, setIsGraduated] = useState<boolean>(false);
  const [employmentDetails, setEmploymentDetails] = useState<
    { companyName: string; role: string; description: string }[]
  >([{ companyName: "", role: "", description: "" }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAddInternship = () => {
    setInternships([...internships, { companyName: "", role: "", description: "" }]);
  };

  const handleAddEmployment = () => {
    setEmploymentDetails([
      ...employmentDetails,
      { companyName: "", role: "", description: "" },
    ]);
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setter((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    );
  };


  const isValidURL = (url: string, type: 'github' | 'linkedin'): boolean => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/;

    if (type === 'github') {
      return githubRegex.test(url);
    }

    if (type === 'linkedin') {
      return linkedinRegex.test(url);
    }

    return true;
  };


  const handleSubmit = async () => {
    let newErrors: { [key: string]: string } = {};

    if (!firstname.trim()) newErrors.firstname = "First Name is required";
  if (!lastname.trim()) newErrors.lastname = "Last Name is required";
  if (!bio.trim()) newErrors.bio = "Bio is required";
  if (!collegeName.trim()) newErrors.collegeName = "College Name is required";

  if (techStacks.length === 0 || techStacks.every((stack) => !stack.trim())) {
    newErrors.techStacks = "At least one tech stack is required";
  }

  internships.forEach((internship, index) => {
    if (!internship.companyName.trim()) newErrors[`internshipCompany${index}`] = "Company Name is required";
    if (!internship.role.trim()) newErrors[`internshipRole${index}`] = "Role is required";
    if (!internship.description.trim()) newErrors[`internshipDescription${index}`] = "Description is required";
  });

  employmentDetails.forEach((employment, index) => {
    if (!employment.companyName.trim()) newErrors[`employmentCompany${index}`] = "Company Name is required";
    if (!employment.role.trim()) newErrors[`employmentRole${index}`] = "Role is required";
    if (!employment.description.trim()) newErrors[`employmentDescription${index}`] = "Description is required";
  });

  if (socialLinks.github && !isValidURL(socialLinks.github, 'github')) {
    newErrors.github = "Please provide a valid GitHub URL (e.g., https://github.com/username)";
  }

  if (socialLinks.linkedin && !isValidURL(socialLinks.linkedin, 'linkedin')) {
    newErrors.linkedin = "Please provide a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  setErrors({});

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/user-profile",
        {
          firstname,
          lastname,
          bio,
          socialLinks,
          techStacks,
          collegeName,
          internships,
          employmentDetails,
          isGraduated,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Profile saved successfully!");
        console.log("Saved profile:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error: ${error.response.data.message}`);
        console.error("Server error:", error.response.data);
      } else {
        alert("An unexpected error occurred.");
        console.error("Error saving profile:", error);
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center p-6">
        <div className="rounded-lg bg-white w-96 max-w-2xl text-center p-4 overflow-y-auto">
          <Heading label="User Profile" />
          <SubHeading label="Enter your details below" />
          <Inputbox 
            label="First Name" 
            placeholder="Enter first name" 
            value={firstname} 
            onChange={(e) => {
                if (/^[a-zA-Z]*$/.test(e.target.value)) {
                  setFirstName(e.target.value);
                }
              }}
              errorMessage={errors.firstname}
            />

          <Inputbox 
            label="Last Name" 
            placeholder="Enter last name" 
            value={lastname} 
            onChange={(e) => {
            if (/^[a-zA-Z]*$/.test(e.target.value)) {
              setLastName(e.target.value);
            }
          }}
          errorMessage={errors.lastname}
        />

          <Inputbox 
            label="Bio" 
            placeholder="Enter bio" 
            value={bio} 
            onChange={(e) =>  {
            if (/^[a-zA-Z ]*$/.test(e.target.value)) {
              setBio(e.target.value);
            }
          }}
          errorMessage={errors.bio}
        />

          <Inputbox 
            label="GitHub Profile" 
            placeholder="Enter GitHub URL" 
            value={socialLinks.github || ""}
            onChange={(e) => 
              setSocialLinks({ ...socialLinks, github: e.target.value })}
            errorMessage={errors.github}
            />

          <Inputbox 
            label="LinkedIn Profile" 
            placeholder="Enter LinkedIn URL" 
            value={socialLinks.linkedin || ""}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
            errorMessage={errors.linkedin}/>

          <Inputbox
            label="Tech Stacks (comma-separated)"
            placeholder="Enter tech stacks"
            value={techStacks.join(",")}
            onChange={(e) => {
                if (/^[a-zA-Z, ]*$/.test(e.target.value)) {
                  setTechStacks(e.target.value.split(","));
                }
              }}
              errorMessage={errors.techStacks} 
          />

          
          <Inputbox
            label="College Name"
            placeholder="Enter college name"
            value={collegeName}
            onChange={(e) => {
                if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                  setCollegeName(e.target.value);
                }
              }}
              errorMessage={errors.collegeName}
            />

          <div className="pt-4">
            <Heading label="Internships" />
            {internships.map((internship, index) => (
              <div key={index}>
                <Inputbox
                  label="Company Name"
                  placeholder="Enter company name"
                  value={internship.companyName}
                  onChange={(e) => {
                  if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                    handleInputChange(index, "companyName", e.target.value, setInternships);
                  }
                }}
                errorMessage={errors[`internshipCompany${index}`]}
                />

                <Inputbox
                  label="Role"
                  placeholder="Enter role"
                  value={internship.role}
                  onChange={(e) => {
                    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                      handleInputChange(index, "role", e.target.value, setInternships);
                    }
                  }}
                  errorMessage={errors[`internshipRole${index}`]}
                />
                    
                <Inputbox
                  label="Description"
                  placeholder="Enter description"
                  value={internship.description}
                  onChange={(e) =>{
                    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                      handleInputChange(index, "description", e.target.value, setInternships);
                    }
                  }}
                  errorMessage={errors[`internshipDescription${index}`]} 
                />
              </div>
            ))}
            <Button label="Add Internship" onClick={handleAddInternship} />
          </div>

         
          <div className="pt-4">
            <label className="text-left text-gray-700">Are you currently graduated?</label>
            <input
              type="checkbox"
              checked={isGraduated}
              onChange={(e) => setIsGraduated(e.target.checked)}
            />
          </div>


          {isGraduated && (
            <div className="pt-4">
              <Heading label="Employment Details" />
              {employmentDetails.map((employment, index) => (
                <div key={index}>
                  <Inputbox
                    label="Company Name"
                    placeholder="Enter company name"
                    value={employment.companyName}
                    onChange={(e) => {
                        if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                          handleInputChange(index, "companyName", e.target.value, setEmploymentDetails);
                        }
                      }}
                      errorMessage={errors[`employmentCompany${index}`]}
                    />

                  <Inputbox
                    label="Role"
                    placeholder="Enter role"
                    value={employment.role}
                    onChange={(e) => {
                        if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                          handleInputChange(index, "role", e.target.value, setEmploymentDetails);
                        }
                      }}
                      errorMessage={errors[`employmentRole${index}`]}
                    />

                  <Inputbox
                    label="Description"
                    placeholder="Enter description"
                    value={employment.description}
                    onChange={(e) => {
                        if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                          handleInputChange(index, "description", e.target.value, setEmploymentDetails);
                        }
                      }}
                      errorMessage={errors[`employmentDescription${index}`]}
                    />
                </div>
              ))}

              <Button label="Add Employment" onClick={handleAddEmployment} />
            </div>
          )}

          <div className="pt-4">
            <Button label="Create Profile" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Userprofile;






