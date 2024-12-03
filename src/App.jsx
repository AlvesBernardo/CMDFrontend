import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./screens/SignIn/SignIn.jsx";
import Dashboard from "./screens/Dashboard/Dashboard.jsx";
import SignUp from "./screens/SignUp/SignUp.jsx";
import Questionairy from "./screens/Questionary/Questionary.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Questionairy />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
