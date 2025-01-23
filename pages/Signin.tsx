import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignin = async () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError(""); 
    }

    if (!isValid) return;

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed", error);
      setEmailError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-6 shadow-lg border border-black">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />

          <Inputbox
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
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
              if (!e.target.value.trim()) {
                setPasswordError("Password is required");
              } else {
                setPasswordError(""); 
              }
            }}
            errorMessage={passwordError}
          />

          <div className="pt-4">
            <Button onClick={handleSignin} label="Sign in" />
          </div>

          <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
        </div>
      </div>
    </div>
  );
};
export default Signin;


