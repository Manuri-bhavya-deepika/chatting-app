import { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 min-h-[720px] flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-lg border border-black">
          <Heading label="Sign up"></Heading>
          <SubHeading label="Enter your information to create an account"></SubHeading>
          <Inputbox label="Email" placeholder="deepumanuri@gmail.com" value={email} onChange={e=>{setEmail(e.target.value);}}></Inputbox>
          <Inputbox label="Password" placeholder="12345" value={password} onChange={e=>{setPassword(e.target.value)}}></Inputbox>
          <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:5174/api/v1/user/signup", {
              email,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label="Sign up" />
          </div>
          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" ></BottomWarning>
        </div>
      </div>
     </div>
  )
}

export default Signup