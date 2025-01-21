import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Userprofile from "./pages/Userprofile";
import Suggestedprojects from "./pages/Suggestedprojects";
import Createproject from "./pages/Createproject";
import Allprojects from "./pages/Allprojects";
import Logout from "./pages/Logout";
import './App.css';
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/Userprofile" element={<Userprofile/>}></Route>
        <Route path="/Createproject" element={<Createproject/>}></Route>
        <Route path="/Suggestedprojects" element={<Suggestedprojects/>}></Route>
        <Route path="/Allprojects" element={<Allprojects/>}></Route>
        <Route path="/Logout" element={<Logout/>}></Route>
      </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App

