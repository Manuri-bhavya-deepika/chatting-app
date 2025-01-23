import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!isValid) return;

    try {
      const response = await axios.post("http://localhost:5174/api/v1/user/signup", {
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-6 shadow-lg">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />

          <Inputbox
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) =>{
              const emailValue = e.target.value;
              if (!emailValue.includes("@")) {
                setEmailError("Email must contain '@'");
              } else if (!validateEmail(emailValue)) {
                setEmailError("Invalid email format");
              } else {
                setEmailError(""); 
              }
              setEmail(emailValue);
            }}
            errorMessage={emailError}
          />

        
          <Inputbox
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="pt-4">
            <Button onClick={handleSignup} label="Sign up" />
          </div>

          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
