import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./screens/SignIn/SignIn.jsx";
import Dashboard from "./screens/Dashboard/Dashboard.jsx";
import SignUp from "./screens/SignUp/SignUp.jsx";
import Questionnaire from "./screens/Questionnaire/Questionnaire.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
